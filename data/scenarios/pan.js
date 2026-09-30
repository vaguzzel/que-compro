// Escenario: cosas para el pan (desayuno u once).
(function (root) {
  var QC = root.QC = root.QC || {};
  (QC.SCENARIOS = QC.SCENARIOS || []).push({
    id: "pan",
    name: "Cosas para el pan",
    icon: "breadBasket",
    color: "butter",
    tagline: "Desayuno, once o las dos",
    // Por persona y por comida: 120 g de pan, 40 g de jamón y 40 g de queso
    pools: {
      pan: { perPerson: 0.12 },
      fiambre: { perPerson: 0.04 },
      queso: { perPerson: 0.04 }
    },
    steps: [
      {
        id: "comida", type: "choice",
        title: "¿Para qué es?",
        help: "Si es para las dos comidas, calculo el doble.",
        options: [
          { id: "desayuno", name: "Desayuno", icon: "coffee", factor: 1 },
          { id: "once", name: "Once", icon: "tea", factor: 1, typical: true },
          { id: "ambos", name: "Desayuno y once", icon: "sparkle", factor: 2 }
        ]
      },
      { id: "personas", type: "people", title: "¿Para cuántas personas?", help: "Los niños cuentan como media porción." },
      {
        id: "panes", type: "pick", min: 1,
        title: "¿Qué pan?",
        help: "Calculo 120 g de pan por persona (una marraqueta y un poco más) y lo reparto entre los que elijas.",
        groups: [
          { name: "De panadería", options: [
            { product: "marraqueta", pool: "pan", typical: true },
            { product: "hallulla", pool: "pan", typical: true },
            { product: "dobladita", pool: "pan" },
            { product: "frica", pool: "pan" },
            { product: "croissant", pool: "pan" }
          ] },
          { name: "De molde", options: [
            { product: "pan_molde", pool: "pan" },
            { product: "pan_integral", pool: "pan" }
          ] }
        ]
      },
      {
        id: "salado", type: "pick",
        title: "¿Qué le echan? (salado)",
        groups: [
          { name: "Fiambrería", options: [
            { product: "jamon_pierna", pool: "fiambre", typical: true },
            { product: "jamon_pavo", pool: "fiambre" },
            { product: "jamon_acaramelado", pool: "fiambre" },
            { product: "pate", perPerson: 0.15 }
          ] },
          { name: "Quesos", options: [
            { product: "queso_gauda", pool: "queso", typical: true },
            { product: "queso_mantecoso", pool: "queso" },
            { product: "quesillo", pool: "queso" }
          ] },
          { name: "Del refri y la verdulería", options: [
            { product: "palta", perPerson: 0.06, typical: true },
            { product: "tomate", perPerson: 0.06 },
            { product: "huevos", perPerson: 1 },
            { product: "mantequilla", perPerson: 0.05, typical: true }
          ] }
        ]
      },
      {
        id: "dulce", type: "pick",
        title: "¿Y algo dulce?",
        groups: [
          { name: "Para untar", options: [
            { product: "manjar", perPerson: 0.08, typical: true },
            { product: "mermelada", perPerson: 0.08 },
            { product: "miel", fixed: 1 },
            { product: "crema_avellanas", perPerson: 0.08 }
          ] }
        ]
      },
      {
        id: "tomar", type: "pick",
        title: "¿Para tomar?",
        groups: [
          { name: "Caliente", options: [
            { product: "te", perPerson: 0.08, typical: true },
            { product: "cafe", perPerson: 0.02 },
            { product: "azucar", fixed: 1, typical: true }
          ] },
          { name: "Frío", options: [
            { product: "leche", perPerson: 0.2 },
            { product: "jugo", perPerson: 0.2 }
          ] }
        ]
      }
    ]
  });
})(typeof window !== "undefined" ? window : globalThis);
