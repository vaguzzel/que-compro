// Tottus (Falabella, Next.js): los resultados vienen en <script id="__NEXT_DATA__"> del HTML de búsqueda.
// props.pageProps.results[] = { displayName, brand, prices:[{ type, price:[...], unit? }], url }
import { request, throttle, UA } from "../http.mjs";

const NEXT = /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/;
const HEADERS = { "user-agent": UA, accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "accept-language": "es-CL,es;q=0.9" };

const num = (v) => +String(Array.isArray(v) ? v[0] : v ?? "").replace(/[^\d]/g, "") || 0;

export function parseTottus(next) {
  const results = next?.props?.pageProps?.results || [];
  return results.map((p) => {
    const prices = p.prices || [];
    const byType = (t) => prices.find((x) => x.type === t);
    const cur = byType("internetPrice") || byType("cmrPrice") || byType("eventPrice") || prices[0];
    const normal = byType("normalPrice");
    const price = num(cur?.price);
    return {
      name: p.displayName || "",
      brand: p.brand || "",
      price,
      listPrice: Math.max(num(normal?.price) || price, price),
      ppum: cur?.unit ? { text: `x ${cur.unit}` } : null,
      unitPriceText: p.unitPrice || p.pricePerUnit || null,
      url: p.url || "",
      available: true
    };
  }).filter((x) => x.price > 0);
}

export function extractNext(html) {
  const m = NEXT.exec(html);
  return m ? JSON.parse(m[1]) : null;
}

// La búsqueda HTML queda detrás de Cloudflare; la API JSON del buscador responde:
//   GET /s/browse/v1/search/cl?Ntt=… → data.results[] = { displayName, brand, url,
//   measurements:{ format:"95 GR" }, prices:[{ type, price:["690"], pum:{ label:"KG", price:["7.263"] } }] }
export function parseTottusApi(json) {
  return (json?.data?.results || []).map((p) => {
    const prices = p.prices || [];
    const byType = (t) => prices.find((x) => x.type === t);
    const cur = byType("internetPrice") || byType("cmrPrice") || byType("eventPrice") || prices[0];
    const normal = byType("normalPrice");
    const price = num(cur?.price);
    const pum = cur?.pum;
    return {
      name: p.displayName || "", brand: p.brand || "",
      price, listPrice: Math.max(num(normal?.price) || price, price),
      ppum: pum && pum.price ? { text: `$${[].concat(pum.price)[0]} x ${pum.label}` } : null,
      content: p.measurements?.format || "",
      perKg: /^kg$/i.test(p.measurements?.unit || ""), // a granel: el precio es por kg
      url: p.url || "", available: true
    };
  }).filter((x) => x.price > 0);
}

export function tottus() {
  const wait = throttle(1200);
  return {
    id: "tottus", name: "Tottus",
    async search(q) {
      const url = "https://www.tottus.cl/s/browse/v1/search/cl?Ntt=" + encodeURIComponent(q) + "&page=1";
      const res = await request(url, { headers: { ...HEADERS, accept: "application/json" }, wait });
      if (res.status !== 200) throw new Error(`Tottus HTTP ${res.status}`);
      return { items: parseTottusApi(res.json()), raw: res.text.slice(0, 800) };
    }
  };
}
