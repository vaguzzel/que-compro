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

export function tottus() {
  const wait = throttle(1500);
  return {
    id: "tottus", name: "Tottus",
    async search(q) {
      const url = "https://www.tottus.cl/tottus-cl/buscar?Ntt=" + encodeURIComponent(q);
      const res = await request(url, { headers: HEADERS, wait, timeout: 40000 });
      if (res.status !== 200) throw new Error(`Tottus HTTP ${res.status}`);
      const next = extractNext(res.text);
      if (!next) throw new Error("Tottus sin __NEXT_DATA__");
      return { items: parseTottus(next), raw: JSON.stringify(next?.props?.pageProps?.results?.slice(0, 2) ?? null) };
    }
  };
}
