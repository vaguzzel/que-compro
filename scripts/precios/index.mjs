// Actualiza los precios del catálogo con lo que publican los supermercados.
//   node scripts/precios/index.mjs            → escribe data/prices.js y data/prices-report.md
//   node scripts/precios/index.mjs --dry      → solo muestra el resumen (no escribe)
//   node scripts/precios/index.mjs --only=croissant,entrana
import { readdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { allStores } from "./stores/index.mjs";
import { rulesFor, matches, normalize, stats } from "./normalize.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, v] = a.replace(/^--/, "").split("="); return [k, v ?? true]; }));
const PER_STORE = 8;        // cuántos productos coincidentes se consideran por súper
const MIN_OBS = 2;          // observaciones mínimas para reemplazar el precio curado
const MIN_COVERAGE = 0.6;   // si calza menos que esto, no se escribe nada

// Catálogo: los mismos scripts clásicos que usa la página
const require = createRequire(import.meta.url);
const productsDir = join(ROOT, "data", "products");
for (const f of readdirSync(productsDir).filter((f) => f.endsWith(".js")).sort()) require(join(productsDir, f));
const QC = globalThis.QC;
let ids = Object.keys(QC.PRODUCTS).filter((id) => QC.PRODUCTS[id].scrape !== false);
if (args.only) ids = ids.filter((id) => args.only.split(",").includes(id));
const rules = Object.fromEntries(ids.map((id) => [id, rulesFor(id, QC.PRODUCTS[id])]));

const stores = allStores();
const obs = Object.fromEntries(ids.map((id) => [id, []]));
const storeStats = {};

async function runStore(store) {
  const cache = new Map();
  let consecutiveErrors = 0, ok = 0, fail = 0;
  for (const id of ids) {
    if (consecutiveErrors >= 6) { fail++; continue; } // el súper nos está bloqueando: se deja de insistir
    const r = rules[id];
    try {
      if (!cache.has(r.q)) cache.set(r.q, (await store.search(r.q)).items);
      consecutiveErrors = 0;
      ok++;
      const hits = cache.get(r.q).filter((it) => matches(it, r)).slice(0, PER_STORE);
      for (const it of hits) {
        const n = normalize(it, r);
        if (n) obs[id].push({ store: store.name, name: it.name, url: it.url, ...n });
      }
    } catch (e) {
      consecutiveErrors++;
      fail++;
      if (consecutiveErrors <= 2) console.warn(`[${store.name}] ${r.q}: ${e.message.slice(0, 160)}`);
    }
  }
  storeStats[store.name] = { ok, fail, blocked: consecutiveErrors >= 6 };
  console.log(`${store.name}: ${ok} búsquedas OK, ${fail} con error${consecutiveErrors >= 6 ? " (bloqueado)" : ""}`);
}

const t0 = Date.now();
await Promise.all(stores.map(runStore));

const today = new Date(Date.now() - 4 * 3600e3).toISOString().slice(0, 10); // hora de Chile aprox.
const live = {}, report = [];
let covered = 0;
for (const id of ids) {
  const p = QC.PRODUCTS[id];
  const s = stats(obs[id]);
  const usable = s && s.n >= MIN_OBS;
  if (usable) { live[id] = [s.min, s.avg, s.max, s.n]; covered++; }
  report.push({ id, p, s, usable, obs: obs[id] });
}
const coverage = covered / ids.length;

// ---- Reporte legible para revisar que los precios tengan sentido ----
const fmt = (n) => "$" + Math.round(n).toLocaleString("es-CL");
const lines = [
  `# Precios reales: ${today}`,
  "",
  `Generado por \`scripts/precios/index.mjs\`. ${covered} de ${ids.length} productos (${Math.round(coverage * 100)} %) con al menos ${MIN_OBS} precios encontrados; el resto conserva el precio curado del catálogo.`,
  "",
  "| Súper | Búsquedas OK | Con error |",
  "|---|---|---|",
  ...Object.entries(storeStats).map(([n, s]) => `| ${n} | ${s.ok} | ${s.fail}${s.blocked ? " (bloqueado)" : ""} |`),
  ""
];
for (const r of report) {
  const unit = r.p.unit;
  lines.push(`## ${r.p.name} \`${r.id}\` · por ${unit}`);
  if (r.usable) lines.push(`**${fmt(r.s.min)} · ${fmt(r.s.avg)} · ${fmt(r.s.max)}** (mín · media · máx, ${r.s.n} precios)`);
  else lines.push(`_Referencial_: se mantiene ${fmt(r.p.min)} · ${fmt(r.p.avg)} · ${fmt(r.p.max)} (${r.obs.length} precio${r.obs.length === 1 ? "" : "s"} encontrado${r.obs.length === 1 ? "" : "s"})`);
  for (const o of r.obs.slice(0, 12)) lines.push(`- ${o.store}: ${o.url ? `[${o.name}](${o.url})` : o.name} → ${fmt(o.price)}${o.list > o.price ? ` (normal ${fmt(o.list)})` : ""}`);
  lines.push("");
}
const md = lines.join("\n");

const js = `// Generado por scripts/precios/index.mjs el ${today}. No editar a mano:
// lo reescribe el GitHub Action "Precios reales" cada semana.
// Formato: id: [mín, media, máx, cantidad de precios encontrados]
(function (root) {
  var QC = root.QC = root.QC || {};
  var LIVE = ${JSON.stringify(live).replace(/\],"/g, '],\n    "').replace(/^\{/, "{\n    ").replace(/\}$/, "\n  }")};
  QC.PRICES_UPDATED = "${today}";
  QC.PRICES_LIVE = ${covered};
  Object.keys(LIVE).forEach(function (id) {
    var p = QC.PRODUCTS && QC.PRODUCTS[id], v = LIVE[id];
    if (p) { p.min = v[0]; p.avg = v[1]; p.max = v[2]; p.live = v[3]; }
  });
})(typeof window !== "undefined" ? window : globalThis);
`;

console.log(`\nCobertura: ${covered}/${ids.length} (${Math.round(coverage * 100)} %) en ${Math.round((Date.now() - t0) / 1000)} s`);
for (const r of report.slice(0, 400)) {
  const tag = r.usable ? `${fmt(r.s.min)} · ${fmt(r.s.avg)} · ${fmt(r.s.max)} (${r.s.n})` : `referencial (${r.obs.length})`;
  console.log(`  ${r.id.padEnd(22)} ${tag}`);
}

if (args.dry) {
  console.log("\n--dry: no se escribieron archivos.");
} else if (coverage < MIN_COVERAGE && !args.only) {
  console.error(`\nCobertura ${Math.round(coverage * 100)} % < ${MIN_COVERAGE * 100} %: no se actualizan los precios.`);
  process.exit(1);
} else {
  writeFileSync(join(ROOT, "data", "prices.js"), js);
  writeFileSync(join(ROOT, "data", "prices-report.md"), md);
  console.log("\nEscritos data/prices.js y data/prices-report.md");
}
