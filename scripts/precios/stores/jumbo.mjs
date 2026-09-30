// Jumbo: su API (bff.jumbo.cl) bloquea a los servidores de GitHub, pero la página de búsqueda
// trae los productos renderizados: nombre, precio y URL en el JSON-LD (ItemList) y, en cada
// tarjeta, el precio por unidad de medida ("$890 x un", "$21.990 x kg") junto al
// atributo data-gtm-product-click con { name, price, brand }.
import { request, throttle, UA } from "../http.mjs";

const HEADERS = { "user-agent": UA, accept: "text/html,application/xhtml+xml", "accept-language": "es-CL,es;q=0.9", "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"', "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": '"Windows"' };

const decode = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

export function parseJumboHtml(html) {
  const items = [];
  const re = /data-gtm-product-click="([^"]+)"/g;
  let m, prevEnd = 0;
  while ((m = re.exec(html))) {
    let data;
    try { data = JSON.parse(decode(m[1])); } catch { prevEnd = re.lastIndex; continue; }
    const segment = html.slice(prevEnd, m.index);
    const pp = [...segment.matchAll(/ppum-price-container[^>]*>\s*<span[^>]*>([^<]+)<\/span>/g)].pop();
    // precio tachado (normal) si la tarjeta muestra oferta
    const crossed = [...segment.matchAll(/line-through[^>]*>\s*\$(?:<!-- -->)?([\d.]+)/g)].pop();
    prevEnd = re.lastIndex;
    const price = +data.price || 0;
    if (!price || !data.name) continue;
    items.push({
      name: data.name, brand: data.brand || "",
      price, listPrice: Math.max(price, crossed ? +crossed[1].replace(/\./g, "") : price),
      ppum: pp ? { text: decode(pp[1]) } : null,
      url: "", available: true
    });
  }
  // URLs desde el JSON-LD (mismo orden)
  const ld = [...html.matchAll(/"@type":"ListItem","position":\d+,"url":"([^"]+)","name":"([^"]+)"/g)];
  items.forEach((it) => { const hit = ld.find((l) => decode(l[2]) === it.name); if (hit) it.url = hit[1]; });
  return items;
}

export function jumbo() {
  const wait = throttle(1500);
  return {
    id: "jumbo", name: "Jumbo",
    async search(q) {
      const res = await request("https://www.jumbo.cl/busqueda?ft=" + encodeURIComponent(q), { headers: HEADERS, wait, timeout: 45000 });
      if (res.status !== 200) throw new Error(`Jumbo HTTP ${res.status}`);
      const items = parseJumboHtml(res.text);
      return { items, raw: `${res.text.length} bytes, ${items.length} tarjetas` };
    }
  };
}
