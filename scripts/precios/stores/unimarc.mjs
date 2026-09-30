// Unimarc (SMU): BFF propio detrás de Akamai; exige el set completo de headers de navegador.
// Respuesta: availableProducts[] = { price:{ price, listPrice, ppum }, item:{ nameComplete, slug, brand } }
import { request, throttle, UA } from "../http.mjs";

const API = "https://bff-unimarc-ecommerce.unimarc.cl/catalog/product/search";
const DOMAIN = "https://www.unimarc.cl";
const HEADERS = {
  "content-type": "application/json",
  accept: "application/json, text/plain, */*",
  "accept-language": "es-CL",
  channel: "UNIMARC", source: "web", version: "1.0.0",
  origin: DOMAIN, referer: DOMAIN + "/",
  "user-agent": UA,
  "sec-ch-ua": '"Not:A-Brand";v="99", "Chromium";v="131"',
  "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-site"
};

// ppum viene como texto, p. ej. "$12.990 x kg"
export function parseUnimarc(json) {
  return (json.availableProducts || []).map((p) => {
    const pr = p.price || {}, it = p.item || {};
    const price = +String(pr.price ?? "").replace(/\D/g, "") || 0;
    const list = +String(pr.listPrice ?? pr.priceWithoutDiscount ?? "").replace(/\D/g, "") || price;
    return {
      name: it.nameComplete || it.name || "",
      brand: it.brand || "",
      price, listPrice: Math.max(list, price),
      ppum: pr.ppum ? { text: String(pr.ppum) } : null,
      measure: it.measurementUnit ? { unit: it.measurementUnit, multiplier: +it.unitMultiplier || 1 } : null,
      url: it.slug ? DOMAIN + (it.slug.startsWith("/") ? "" : "/") + it.slug : "",
      available: true
    };
  }).filter((x) => x.price > 0);
}

export function unimarc() {
  const wait = throttle(1200);
  let variant = null; // se recuerda qué forma del payload funcionó
  const VARIANTS = [
    (q, n) => ({ from: "0", to: String(n - 1), orderBy: "", searching: q, promotionsOnly: false, userTriggered: true }),
    (q, n) => ({ from: "0", to: String(n - 1), orderBy: "", searching: q }),
    (q, n) => ({ categories: "", clusterId: "", clusterNames: "", from: "0", to: String(n - 1), orderBy: "", promotionsOnly: false, searching: q })
  ];
  return {
    id: "unimarc", name: "Unimarc",
    async search(q, { limit = 30 } = {}) {
      const order = variant == null ? VARIANTS.map((_, i) => i) : [variant];
      let last = "";
      for (const i of order) {
        const res = await request(API, { method: "POST", headers: HEADERS, body: VARIANTS[i](q, limit), wait });
        if (res.status !== 200) { last = `HTTP ${res.status}: ${res.text.slice(0, 160)}`; continue; }
        const items = parseUnimarc(res.json());
        if (items.length || variant != null) { variant = i; return { items, raw: res.text }; }
        last = "0 resultados con variante " + i;
      }
      throw new Error("Unimarc " + last);
    }
  };
}
