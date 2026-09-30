// Diagnóstico temporal (ronda 2): Jumbo HTML, Santa Isabel apis y forma de la API de Tottus.
import { UA } from "./http.mjs";
const BROWSER = { "user-agent": UA, "accept-language": "es-CL,es;q=0.9", "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"', "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": '"Windows"' };
const get = async (url, headers = {}) => { const r = await fetch(url, { headers: { ...BROWSER, ...headers }, signal: AbortSignal.timeout(30000) }); return { status: r.status, text: await r.text() }; };
const around = (t, needle, n = 700) => { const i = t.indexOf(needle); return i < 0 ? "(no aparece " + needle + ")" : t.slice(Math.max(0, i - 200), i + n).replace(/\s+/g, " "); };

try {
  const j = await get("https://www.jumbo.cl/busqueda?ft=croissant", { accept: "text/html" });
  console.log("\n### JUMBO html", j.status, j.text.length);
  console.log("has __NEXT_DATA__:", j.text.includes("__NEXT_DATA__"), "| __next_f:", (j.text.match(/__next_f\.push/g) || []).length);
  for (const k of ['"listPrice"', '"price"', "ppum", '"sellingPrice"', "Croissant"]) console.log(`\n-- ${k}:`, around(j.text, k));
  const scripts = [...j.text.matchAll(/https?:\/\/[a-z0-9.-]*(?:jumbo|cencosud|smdigital)[a-z0-9./_-]*/gi)].map((m) => m[0]);
  console.log("\n-- hosts:", [...new Set(scripts.map((u) => u.split("/").slice(0, 3).join("/")))].join(" "));
} catch (e) { console.log("JUMBO err", e.message); }

try {
  const s = await get("https://www.santaisabel.cl/busqueda?ft=croissant", { accept: "text/html" });
  console.log("\n### SISA html", s.status);
  console.log("-- scripts:", [...s.text.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]).join(" "));
  console.log("-- apis:", around(s.text, "apis.santaisabel.cl", 300));
  const js = [...s.text.matchAll(/<script[^>]+src="([^"]+app[^"]*\.js)"/g)].map((m) => m[1])[0];
  if (js) {
    const b = await get(js.startsWith("http") ? js : "https://www.santaisabel.cl" + js);
    console.log("-- bundle", js, b.status, b.text.length);
    for (const k of ["x-api-key", "apis.santaisabel.cl", "catalog/api", "/search/"]) console.log(`   ${k}:`, around(b.text, k, 300));
  }
} catch (e) { console.log("SISA err", e.message); }

for (const u of [
  "https://apis.santaisabel.cl:8443/catalog/api/v2/pedrofontova/search/croissant?page=1",
  "https://apis.santaisabel.cl:8443/catalog/api/v1/pedrofontova/search/croissant?page=1"
]) {
  try { const r = await get(u, { accept: "application/json", "x-api-key": "5CIqbUOvJhdpZp4bIE5jpiuFY3kLdq2z", origin: "https://www.santaisabel.cl", referer: "https://www.santaisabel.cl/" }); console.log("\n### ", u, r.status, r.text.slice(0, 600)); } catch (e) { console.log("\n### ", u, "ERR", e.message); }
}

try {
  const t = await get("https://www.tottus.cl/s/browse/v1/search/cl?Ntt=croissant&page=1", { accept: "application/json" });
  const j = JSON.parse(t.text);
  console.log("\n### TOTTUS api keys:", Object.keys(j.data || {}).join(","), "| results:", (j.data?.results || []).length);
  console.log(JSON.stringify(j.data?.results?.[0]).slice(0, 2500));
} catch (e) { console.log("TOTTUS err", e.message); }
