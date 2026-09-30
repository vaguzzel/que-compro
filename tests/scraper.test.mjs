// Tests de la normalización del scraper, con nombres y precios reales vistos en los súper.
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readdirSync, readFileSync } from "node:fs";
import { rulesFor, matches, normalize, stats, parseContent, parsePpum } from "../scripts/precios/normalize.mjs";
import { parseTottusApi } from "../scripts/precios/stores/tottus.mjs";
import { parseJumboHtml } from "../scripts/precios/stores/jumbo.mjs";

const require = createRequire(import.meta.url);
for (const f of readdirSync(new URL("../data/products", import.meta.url)).filter((f) => f.endsWith(".js")).sort()) require("../data/products/" + f);
const P = globalThis.QC.PRODUCTS;
const R = (id) => rulesFor(id, P[id]);
const norm = (id, item) => (matches(item, R(id)) ? normalize(item, R(id)) : null);

test("lee tamaños y cantidades desde el nombre", () => {
  assert.deepEqual(parseContent("Cerveza Cristal lata 470 cc pack 6"), { count: 6, size: { ml: 470 }, countFound: true });
  assert.deepEqual(parseContent("Pack Cerveza Heineken Lager Botella 5° 24 x 330 ml"), { count: 24, size: { ml: 330 }, countFound: true });
  assert.deepEqual(parseContent("Bebida Limón Botella, 1,5 L").size, { ml: 1500 });
  assert.deepEqual(parseContent("Entraña vacuno Blue Ribbon al vacío 1.1 Kg").size, { g: 1100 });
  assert.equal(parseContent("Té Negro Royal Ceylon Caja, 100 Un").count, 100);
  assert.equal(parseContent("Té Verde").countFound, false);
});

test("lee el precio por unidad de medida", () => {
  assert.deepEqual(parsePpum({ text: "$7.290 x Kg" }), { price: 7290, kind: "g", per: 1000 });
  assert.deepEqual(parsePpum({ text: "$897 x litro" }), { price: 897, kind: "ml", per: 1000 });
  assert.deepEqual(parsePpum({ text: "$450 x 100 g" }), { price: 450, kind: "g", per: 100 });
});

test("croissant: por unidad, y los que se venden a granel por kg se pasan a unidad", () => {
  assert.equal(norm("croissant", { name: "Croissant 1 un.", price: 890, listPrice: 890 }).price, 890);
  assert.equal(norm("croissant", { name: "Croissant Belgian Bite 4 un", price: 4990, listPrice: 4990 }).price, 1248);
  assert.equal(norm("croissant", { name: "Pan Croissant Artesano 3 Un", price: 6490, listPrice: 6490, priceText: "$6.490/kg" }).price, 454);
  assert.equal(norm("croissant", { name: "Croissant Relleno Pistacho", price: 2990, listPrice: 2990 }), null);
  assert.equal(norm("croissant", { name: "Medialuna Laf 4 un", price: 1950, listPrice: 1950 }), null);
});

test("carne por kg usando el precio por kg del súper", () => {
  assert.equal(norm("entrana", { name: "Entraña vacuno Friboi Black Angus al vacío 1.0 Kg", price: 26990, listPrice: 26990, ppum: { text: "$26.990 x Kg" } }).price, 26990);
  assert.equal(norm("entrana", { name: "Entraña de cerdo Super Cerdo 800 g", price: 8990, listPrice: 9990 }), null);
});

test("envases: se exige un tamaño parecido y se escala", () => {
  assert.equal(norm("bebida", { name: "Bebida Limón Botella, 1,5 L", price: 2050, listPrice: 2050, ppum: { text: "$1.367 x lt" } }), null);
  assert.deepEqual(norm("bebida", { name: "Bebida Limón Botella, 3 L", price: 2390, listPrice: 3090, ppum: { text: "$797 x lt" } }), { price: 2391, list: 3091 });
});

test("no calzan mascotas, cosméticos ni productos 'sabor a'", () => {
  assert.equal(norm("costillar_cordero", { name: "Snack Perro Adulto Tiritas de Cordero Bolsa, 400 g", price: 9890, listPrice: 9890 }), null);
  assert.equal(norm("lena", { name: "Desodorante Spray Old Spice Leña Hombre, 150 ml", price: 3990, listPrice: 3990 }), null);
  assert.equal(norm("sandia", { name: "Shampoo Sandía", price: 4690, listPrice: 4690 }), null);
  assert.equal(norm("uvas", { name: "Regaliz Tubos Sabor Uva Dulce, 80 g", price: 1290, listPrice: 1290 }), null);
  assert.equal(norm("tomate", { name: "Tomate cocktail colores 500 g", price: 3325, listPrice: 3325 }), null);
  assert.equal(norm("cebolla", { name: "Cebolla crispy apanada Winkler Specia 100 g", price: 1690, listPrice: 1690 }), null);
  assert.ok(norm("tomate", { name: "Tomate malla 1 Kg", price: 1990, listPrice: 1990, ppum: { text: "$1.990 x Kg" } }));
});

test("no se multiplica por un pack que el nombre no indica", () => {
  assert.equal(norm("te_verde", { name: "Te verde premium", price: 6650, listPrice: 6650 }), null);
  assert.equal(norm("te", { name: "Té Negro Royal Ceylon Caja, 100 Un", price: 5990, listPrice: 5990 }).price, 1198);
});

test("estadística: descarta valores absurdos y ordena mín ≤ media ≤ máx", () => {
  const s = stats([{ price: 890, list: 890 }, { price: 729, list: 729 }, { price: 1248, list: 1248 }, { price: 45000, list: 45000 }]);
  assert.equal(s.n, 3);
  assert.equal(s.min, 730);
  assert.equal(s.avg, 890);
  assert.equal(s.max, 1250);
});

test("adaptadores: Tottus (API) y Jumbo (HTML)", () => {
  const tottus = parseTottusApi({ data: { results: [{ displayName: "Croissant 95 g", brand: "TOTTUS", url: "u", measurements: { format: "95 GR", unit: "UN" }, prices: [{ type: "internetPrice", price: ["690"], pum: { label: "KG", price: ["7.263"] } }] }] } });
  assert.equal(tottus[0].price, 690);
  assert.equal(tottus[0].perKg, false);
  assert.deepEqual(tottus[0].ppum, { text: "$7.263 x KG" });
  const html = '<div class="ppum-price-container"><span class="x">$890 x un</span></div><a data-gtm-product-click="{&quot;name&quot;:&quot;Croissant 1 un.&quot;,&quot;price&quot;:890,&quot;brand&quot;:&quot;Cuisine &amp; Co&quot;}">' +
    '"@type":"ListItem","position":1,"url":"https://www.jumbo.cl/croissant-un-1997881/p","name":"Croissant 1 un."';
  const jumbo = parseJumboHtml(html);
  assert.equal(jumbo[0].name, "Croissant 1 un.");
  assert.equal(jumbo[0].price, 890);
  assert.equal(jumbo[0].brand, "Cuisine & Co");
  assert.deepEqual(jumbo[0].ppum, { text: "$890 x un" });
  assert.equal(jumbo[0].url, "https://www.jumbo.cl/croissant-un-1997881/p");
});

test("index.html carga todos los archivos del catálogo y los escenarios", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  for (const f of readdirSync(new URL("../data/products", import.meta.url))) assert.ok(html.includes(`data/products/${f}`), f);
  for (const f of readdirSync(new URL("../data/scenarios", import.meta.url))) assert.ok(html.includes(`data/scenarios/${f}`), f);
  assert.ok(html.indexOf("data/prices.js") > html.indexOf("data/products/verduleria.js"), "prices.js va después del catálogo");
});
