// Normalización: lleva cada producto encontrado en un súper a la unidad del catálogo
// (precio por kg, por litro o por envase) y decide si corresponde al producto buscado.

// "Entraña" → "entrana"
export function fold(s) {
  return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9.,%/ ]+/g, " ").replace(/\s+/g, " ").trim();
}

const STOP = new Set(["de", "del", "la", "el", "los", "las", "con", "para", "en", "y", "al", "a", "x"]);

// Reglas de búsqueda de un producto del catálogo (con valores por defecto)
export function rulesFor(id, p) {
  const q = p.q || p.name;
  const must = (p.must || fold(q).split(" ").filter((w) => w.length > 2 && !STOP.has(w)).slice(0, 2)).map((m) => (Array.isArray(m) ? m : [m]).map(fold));
  const not = (p.not || []).map(fold);
  // Por defecto: 1 kg, 1 L o "el envase tal como se vende" (sin dividir por su contenido)
  let pack = p.pack;
  if (!pack) pack = p.unit === "kg" ? { g: 1000 } : p.unit === "L" ? { ml: 1000 } : { pkg: 1 };
  return { id, q, must, not, pack, tol: p.tol || [0.55, 1.8], perMeasure: p.unit === "kg" || p.unit === "L" };
}

// Palabra completa (o prefijo de palabra si termina en *)
function hasWord(text, w) {
  if (w.endsWith("*")) return new RegExp("(^| )" + escapeRe(w.slice(0, -1))).test(text);
  return new RegExp("(^| )" + escapeRe(w) + "( |$)").test(text);
}
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function matches(item, rules) {
  const t = fold(item.name + " " + (item.brand || ""));
  const name = fold(item.name);
  if (!rules.must.every((alts) => alts.some((w) => hasWord(name, w)))) return false;
  if (rules.not.some((w) => hasWord(t, w))) return false;
  return true;
}

const UNIT = {
  kg: ["g", 1000], kilo: ["g", 1000], kilos: ["g", 1000], kgs: ["g", 1000],
  g: ["g", 1], gr: ["g", 1], grs: ["g", 1], gramos: ["g", 1], grm: ["g", 1],
  l: ["ml", 1000], lt: ["ml", 1000], lts: ["ml", 1000], litro: ["ml", 1000], litros: ["ml", 1000],
  ml: ["ml", 1], cc: ["ml", 1], cm3: ["ml", 1],
  un: ["un", 1], u: ["un", 1], unidad: ["un", 1], unidades: ["un", 1], uni: ["un", 1], und: ["un", 1]
};
const num = (s) => parseFloat(String(s).replace(",", "."));

// Precio por unidad de medida: "$7.290 x Kg", "$897 x litro", "$35.675 x kg", "$1.367 x lt", "$450 x 100 g"
export function parsePpum(ppum) {
  if (!ppum) return null;
  if (ppum.price && ppum.unit) {
    const u = UNIT[fold(ppum.unit)];
    return u ? { price: +ppum.price, kind: u[0], per: u[1] } : null;
  }
  const t = fold(ppum.text);
  const m = /\$?\s*([\d.]+)\s*(?:x|\/|por)\s*(\d+(?:[.,]\d+)?)?\s*([a-z0-9]+)/.exec(t);
  if (!m) return null;
  const u = UNIT[m[3]];
  if (!u) return null;
  return { price: +m[1].replace(/\./g, ""), kind: u[0], per: u[1] * (m[2] ? num(m[2]) : 1) };
}

// Contenido desde el nombre: "Cerveza lata 470 cc pack 6" → { count:6, size:{ ml:470 } }
export function parseContent(name) {
  const t = fold(name).replace(/(\d),(\d)/g, "$1.$2");
  let count = 1, size = null;
  const sizeRe = /(\d+(?:\.\d+)?)\s*(kgs?|kilos?|grs?|gramos|grm|g|lts?|litros?|l|ml|cc|cm3)(?![a-z])/g;
  let m, sizes = [];
  while ((m = sizeRe.exec(t))) sizes.push(m);
  if (sizes.length) {
    const last = sizes[sizes.length - 1];
    const u = UNIT[last[2]];
    size = { [u[0]]: num(last[1]) * u[1] };
  }
  const c =
    /(\d+)\s*x\s*\d/.exec(t) || // "6 x 350 cc"
    /pack\s*(?:de\s*)?(\d+)/.exec(t) ||
    /(?:^| )x\s*(\d+)(?:\s*(?:un|u|unid\w*))?(?: |$)/.exec(t) || // "x6"
    /(\d+)\s*(?:un|u|uni|und|unid|unidades|latas|botellas|sobres|bolsitas|rollos|piezas|porciones)(?![a-z])/.exec(t);
  if (c) count = Math.max(1, parseInt(c[1], 10));
  return { count, size };
}

// Precio del ítem expresado en la unidad del catálogo (o null si no se puede comparar)
//   rules.pack: { g }, { ml } o { un, g? } (g sirve para convertir panes que se venden a granel por kg)
export function normalize(item, rules) {
  const pack = rules.pack;
  const ppum = parsePpum(item.ppum);
  const content = parseContent(item.name + " " + (item.content || ""));
  const perKg = item.perKg || (item.priceText && /\/\s*kg/i.test(item.priceText));
  const out = (price, list) => ({ price: Math.round(price), list: Math.round(Math.max(list, price)) });
  const ratio = item.listPrice && item.price ? item.listPrice / item.price : 1;

  if (pack.g || pack.ml) {
    const kind = pack.g ? "g" : "ml", want = pack.g || pack.ml;
    if (!pack.un) {
      // Unidad por peso/volumen (kg, L o un envase de X g/ml)
      let unitPrice = null; // precio por 1 g o 1 ml
      if (perKg && kind === "g") unitPrice = item.price / 1000;
      else if (ppum && ppum.kind === kind) unitPrice = ppum.price / ppum.per;
      else if (content.size && content.size[kind]) unitPrice = item.price / (content.size[kind] * content.count);
      if (unitPrice == null) return null;
      // Para envases (no granel) se exige un tamaño parecido al del catálogo
      if (!rules.perMeasure) {
        const s = content.size && content.size[kind];
        if (s) {
          const r = s / want;
          if (r < rules.tol[0] || r > rules.tol[1]) return null;
        }
      }
      return out(unitPrice * want, unitPrice * want * ratio);
    }
  }
  // Envase tal cual (bolsa, frasco, paquete…): el precio del ítem sin dividir
  if (pack.pkg) return perKg ? null : out(item.price, item.listPrice);
  // Unidades contables (con peso opcional por pieza para lo que se vende a granel)
  const n = pack.un || 1;
  if (perKg) return pack.g ? out((item.price * pack.g) / 1000 * n, (item.price * pack.g) / 1000 * n * ratio) : null;
  if (pack.ml || pack.g) {
    const kind = pack.ml ? "ml" : "g";
    const s = content.size && content.size[kind];
    if (s) {
      const r = s / pack[kind];
      if (r < rules.tol[0] || r > rules.tol[1]) return null;
    }
  }
  return out((item.price / content.count) * n, (item.listPrice / content.count) * n);
}

// mín / media / máx de una lista de observaciones { price, list }
export function stats(obs) {
  const prices = obs.map((o) => o.price).sort((a, b) => a - b);
  if (!prices.length) return null;
  const med = median(prices);
  const kept = obs.filter((o) => o.price <= med * 3 && o.price >= med / 3);
  const p = kept.map((o) => o.price).sort((a, b) => a - b);
  const l = kept.map((o) => o.list).sort((a, b) => a - b);
  const r10 = (x) => Math.round(x / 10) * 10;
  const min = r10(p[0]), avg = r10(median(p)), max = r10(Math.max(l[l.length - 1], p[p.length - 1]));
  return { min, avg: Math.max(min, avg), max: Math.max(avg, max), n: kept.length };
}

function median(a) {
  const m = a.length >> 1;
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
}
