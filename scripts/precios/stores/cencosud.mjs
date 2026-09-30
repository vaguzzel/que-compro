// Jumbo y Santa Isabel (Cencosud): mismo BFF, POST /catalog/plp con apikey pública del sitio.
// Respuesta: products[].items[0] = { name, price, listPrice, ppumPrice, ppumMeasurementUnit, … }
import { request, throttle, UA } from "../http.mjs";

const CONFIG = {
  jumbo: { name: "Jumbo", domain: "https://www.jumbo.cl", bff: "https://bff.jumbo.cl", apikey: "be-reg-groceries-jumbo-catalog-w54byfvkmju5", store: "jumboclj512" },
  santaisabel: { name: "Santa Isabel", domain: "https://www.santaisabel.cl", bff: "https://bff.santaisabel.cl", apikey: "be-reg-groceries-sisa-catalog-wdhhq5a2fken", store: "pedrofontova" }
};

export function parseCencosud(json, cfg) {
  return (json.products || []).map((p) => {
    const it = (p.items || [])[0] || {};
    return {
      name: it.name || p.name || "",
      brand: p.brand || "",
      price: +it.price || 0,
      listPrice: +it.listPrice || +it.price || 0,
      ppum: it.ppumPrice ? { price: +it.ppumPrice, unit: it.ppumMeasurementUnit || "" } : null,
      measure: it.measurementUnit ? { unit: it.measurementUnit, multiplier: +it.unitMultiplier || 1 } : null,
      url: p.slug ? `${cfg.domain}/${p.slug}/p` : "",
      available: it.available !== false
    };
  }).filter((x) => x.price > 0);
}

export function cencosud(id) {
  const cfg = CONFIG[id];
  const wait = throttle(1000);
  const headers = { "content-type": "application/json", accept: "application/json", apikey: cfg.apikey, origin: cfg.domain, referer: cfg.domain + "/", "user-agent": UA };
  return {
    id, name: cfg.name,
    async search(q, { limit = 30 } = {}) {
      const body = {
        store: cfg.store, collections: [], fullText: q, brands: [], hideUnavailableItems: true,
        from: 0, to: limit - 1, orderBy: "", selectedFacets: [], promotionalCards: false, sponsoredProducts: false
      };
      const res = await request(cfg.bff + "/catalog/plp", { method: "POST", headers, body, wait });
      if (res.status !== 200) throw new Error(`${cfg.name} HTTP ${res.status}: ${res.text.slice(0, 160)}`);
      return { items: parseCencosud(res.json(), cfg), raw: res.text };
    }
  };
}
