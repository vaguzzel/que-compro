// Diagnóstico temporal: prueba variantes de headers/endpoints para los súper que responden 403.
import { UA } from "./http.mjs";
const BROWSER = {
  "user-agent": UA, "accept-language": "es-CL,es;q=0.9,en;q=0.8",
  "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24", "Google Chrome";v="131"',
  "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": '"Windows"'
};
const J = (domain, key) => ({ ...BROWSER, "content-type": "application/json", accept: "application/json, text/plain, */*", apikey: key, "x-api-key": key, origin: domain, referer: domain + "/", "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-site" });
const plp = (store, q) => ({ store, collections: [], fullText: q, brands: [], hideUnavailableItems: false, from: 0, to: 11, orderBy: "", selectedFacets: [], promotionalCards: false, sponsoredProducts: false });
const JK = "be-reg-groceries-jumbo-catalog-w54byfvkmju5", SK = "be-reg-groceries-sisa-catalog-wdhhq5a2fken";
const tests = [
  ["jumbo plp browser", "https://bff.jumbo.cl/catalog/plp", { method: "POST", headers: J("https://www.jumbo.cl", JK), body: JSON.stringify(plp("jumboclj512", "croissant")) }],
  ["jumbo search GET", "https://bff.jumbo.cl/catalog/search?term=croissant", { headers: J("https://www.jumbo.cl", JK) }],
  ["jumbo home html", "https://www.jumbo.cl/busqueda?ft=croissant", { headers: { ...BROWSER, accept: "text/html" } }],
  ["jumbo old api", "https://apijumboweb.smdigital.cl/catalog/api/v1/search/croissant?page=1", { headers: { ...BROWSER, "x-api-key": "IuimuMneIKJd3tapno2Ag1c1WcAES97j" } }],
  ["jumbo sm-web-api", "https://sm-web-api.ecomm.cencosud.com/catalog/api/v4/products/search/croissant?page=1&sc=11", { headers: { ...BROWSER, apikey: "WlVnnB7c1BblmgUPOfg" } }],
  ["sisa plp browser", "https://bff.santaisabel.cl/catalog/plp", { method: "POST", headers: J("https://www.santaisabel.cl", SK), body: JSON.stringify(plp("pedrofontova", "croissant")) }],
  ["sisa html", "https://www.santaisabel.cl/busqueda?ft=croissant", { headers: { ...BROWSER, accept: "text/html" } }],
  ["tottus html browser", "https://www.tottus.cl/tottus-cl/buscar?Ntt=croissant", { headers: { ...BROWSER, accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8", "sec-fetch-dest": "document", "sec-fetch-mode": "navigate", "sec-fetch-site": "none", "sec-fetch-user": "?1", "upgrade-insecure-requests": "1" } }],
  ["tottus api", "https://www.tottus.cl/s/browse/v1/search/cl?Ntt=croissant&page=1", { headers: { ...BROWSER, accept: "application/json" } }],
  ["tottus lista", "https://www.tottus.cl/tottus-cl/lista/CATG10196/Promociones", { headers: { ...BROWSER, accept: "text/html" } }],
  ["lider html", "https://super.lider.cl/search?q=croissant", { headers: { ...BROWSER, accept: "text/html" } }],
  ["acuenta", "https://www.acuenta.cl/search?name=croissant", { headers: { ...BROWSER, accept: "text/html" } }]
];
for (const [label, url, opts] of tests) {
  try {
    const r = await fetch(url, { ...opts, redirect: "follow", signal: AbortSignal.timeout(25000) });
    const t = await r.text();
    console.log(`\n### ${label} → ${r.status} (${t.length} bytes) server=${r.headers.get("server")}`);
    console.log("   " + t.slice(0, 400).replace(/\s+/g, " "));
  } catch (e) { console.log(`\n### ${label} → ERROR ${e.message}`); }
  await new Promise((r) => setTimeout(r, 800));
}
