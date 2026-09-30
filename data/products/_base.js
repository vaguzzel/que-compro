// Base del catálogo: pasillos y fecha de los precios de respaldo.
//
// Cada producto (en los demás archivos de esta carpeta):
//   name, cat (pasillo), unit (unidad de compra y de precio), plural, step (lo mínimo
//   que se puede comprar), size (kg que aporta 1 unidad a un pool), icon, hint,
//   min/avg/max  precio de RESPALDO por unidad; data/prices.js los reemplaza por los
//                precios reales que encuentra el scraper cada semana.
//   Reglas para el scraper (scripts/precios):
//   q     texto que se busca en cada súper (por defecto, el nombre)
//   must  palabras que deben estar en el nombre (por defecto, las 2 primeras de q);
//         un arreglo interno son alternativas: [["vienesa", "vienesas"]]
//   not   palabras que descartan un resultado
//   pack  a qué equivale 1 unidad del catálogo: { g }, { ml } o { un, g? }
//         (por defecto: 1 kg, 1 L o 1 unidad)
(function (root) {
  var QC = root.QC = root.QC || {};
  QC.PRICES_UPDATED = "2026-09";
  QC.PRODUCTS = QC.PRODUCTS || {};

  // Orden en que aparecen los pasillos en la lista de compras
  QC.AISLES = [
    { id: "carniceria", name: "Carnicería", icon: "steak" },
    { id: "pescaderia", name: "Pescadería", icon: "fish" },
    { id: "fiambreria", name: "Fiambrería y quesos", icon: "cheese" },
    { id: "panaderia", name: "Panadería", icon: "marraqueta" },
    { id: "verduleria", name: "Frutas y verduras", icon: "tomato" },
    { id: "lacteos", name: "Lácteos y huevos", icon: "milk" },
    { id: "congelados", name: "Congelados", icon: "ice" },
    { id: "despensa", name: "Despensa", icon: "jar" },
    { id: "desayuno", name: "Desayuno y endulzantes", icon: "coffee" },
    { id: "snacks", name: "Snacks, galletas y dulces", icon: "chips" },
    { id: "postres", name: "Postres", icon: "cake" },
    { id: "bebidas", name: "Bebidas, jugos y agua", icon: "soda" },
    { id: "botilleria", name: "Botillería", icon: "wine" },
    { id: "bazar", name: "Desechables, fuego y bazar", icon: "napkin" }
  ];

  // Agrega productos al catálogo (lo usan los demás archivos)
  QC.addProducts = function (list) {
    Object.keys(list).forEach(function (id) { QC.PRODUCTS[id] = list[id]; });
  };
})(typeof window !== "undefined" ? window : globalThis);
