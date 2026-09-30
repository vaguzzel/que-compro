// Lider (Walmart Chile): GraphQL de super.lider.cl. Best-effort: tiene protección anti-bot.
// Se intenta primero una query mínima y, si el servidor la rechaza, el HTML de búsqueda (__NEXT_DATA__).
import { request, throttle, UA } from "../http.mjs";
import { extractNext } from "./tottus.mjs";

const ENDPOINT = "https://super.lider.cl/orchestra/graphql";
const QUERY = `query Search($query: String, $page: Int, $ps: Int, $prg: Prg!) {
  search(query: $query, page: $page, ps: $ps, prg: $prg) {
    searchResult { itemStacks { itemsV2 { ... on Product {
      name brand canonicalUrl
      priceInfo { currentPrice { price priceString } listPrice { price } wasPrice { price } unitPrice { priceString } }
    } } } }
  }
}`;

function headers() {
  const cid = crypto.randomUUID();
  return {
    "content-type": "application/json", accept: "application/json",
    "x-o-platform": "rweb", "x-o-bu": "LIDER-CL", "x-o-mart": "B2C", "x-o-segment": "oaoh", "x-o-vertical": "OD",
    "x-apollo-operation-name": "Search", "x-o-ccm": "server", wm_mp: "true", "accept-language": "es-CL",
    "wm_qos.correlation_id": cid, "x-o-correlation-id": cid,
    "user-agent": UA, origin: "https://super.lider.cl", referer: "https://super.lider.cl/"
  };
}

export function parseLiderItems(items) {
  return (items || []).map((p) => {
    const pi = p.priceInfo || {};
    const price = +(pi.currentPrice?.price) || 0;
    const list = +(pi.listPrice?.price || pi.wasPrice?.price) || price;
    return {
      name: p.name || "", brand: p.brand || "",
      price, listPrice: Math.max(list, price),
      ppum: pi.unitPrice?.priceString ? { text: pi.unitPrice.priceString } : null,
      url: p.canonicalUrl ? "https://super.lider.cl" + p.canonicalUrl : "",
      available: true
    };
  }).filter((x) => x.price > 0);
}

function itemsFromSearch(sr) {
  const stacks = sr?.itemStacks || [];
  return stacks.flatMap((s) => s.itemsV2 || s.items || []);
}

export function lider() {
  const wait = throttle(1500);
  let mode = null; // "graphql" | "html"
  return {
    id: "lider", name: "Lider",
    async search(q) {
      const errors = [];
      if (mode !== "html") {
        const res = await request(ENDPOINT, { method: "POST", headers: headers(), wait, body: { query: QUERY, variables: { query: q, page: 1, ps: 40, prg: "desktop" } } });
        if (res.status === 200) {
          const j = res.json();
          const items = itemsFromSearch(j?.data?.search?.searchResult);
          if (items.length || mode === "graphql") { mode = "graphql"; return { items: parseLiderItems(items), raw: res.text.slice(0, 1500) }; }
          errors.push("graphql: " + JSON.stringify(j.errors || j).slice(0, 300));
        } else errors.push(`graphql HTTP ${res.status}: ${res.text.slice(0, 200)}`);
      }
      const res = await request("https://super.lider.cl/search?q=" + encodeURIComponent(q), { headers: { "user-agent": UA, accept: "text/html", "accept-language": "es-CL" }, wait });
      if (res.status === 200) {
        const next = extractNext(res.text);
        const sr = next?.props?.pageProps?.initialData?.searchResult;
        if (sr) { mode = "html"; return { items: parseLiderItems(itemsFromSearch(sr)), raw: JSON.stringify(itemsFromSearch(sr).slice(0, 1)).slice(0, 1500) }; }
        errors.push("html sin searchResult");
      } else errors.push(`html HTTP ${res.status}`);
      throw new Error("Lider " + errors.join(" | "));
    }
  };
}
