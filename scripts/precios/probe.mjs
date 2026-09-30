// Diagnóstico: busca unas pocas palabras en cada súper y muestra la forma cruda de la respuesta.
//   node scripts/precios/probe.mjs croissant "entraña"
import { allStores } from "./stores/index.mjs";

const queries = process.argv.slice(2).length ? process.argv.slice(2) : ["croissant", "entraña", "bebida 3 litros"];
for (const store of allStores()) {
  for (const q of queries) {
    try {
      const { items, raw } = await store.search(q);
      console.log(`\n### ${store.name} · "${q}" → ${items.length} productos`);
      for (const it of items.slice(0, 6)) console.log(`  - ${it.name} | ${it.brand} | $${it.price} (lista $${it.listPrice}) | ppum ${JSON.stringify(it.ppum)} | measure ${JSON.stringify(it.measure || null)}`);
      if (q === queries[0]) console.log("  RAW:", String(raw).slice(0, 1800));
    } catch (e) {
      console.log(`\n### ${store.name} · "${q}" → ERROR ${e.message}`);
    }
  }
}
