// Escenario: cosas para el pan (desayuno u once).
(function (root) {
  var QC = root.QC = root.QC || {};
  (QC.SCENARIOS = QC.SCENARIOS || []).push({
    id: "pan",
    name: "Cosas para el pan",
    icon: "breadBasket",
    color: "butter",
    tagline: "Desayuno, once o las dos",
    // Por persona y por comida: 120 g de pan, 40 g de fiambre y 40 g de queso
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
            { product: "pan_amasado", pool: "pan" },
            { product: "colizas", pool: "pan" },
            { product: "frica", pool: "pan" },
            { product: "croissant", pool: "pan" }
          ] },
          { name: "Envasado", options: [
            { product: "pan_molde", pool: "pan" },
            { product: "pan_integral", pool: "pan" },
            { product: "pan_pita", pool: "pan" },
            { product: "tostadas", pool: "pan" }
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
            { product: "pechuga_pavo", pool: "fiambre" },
            { product: "salame", pool: "fiambre" },
            { product: "mortadela", pool: "fiambre" },
            { product: "pate", perPerson: 0.15 }
          ] },
          { name: "Quesos", options: [
            { product: "queso_gauda", pool: "queso", typical: true },
            { product: "queso_mantecoso", pool: "queso" },
            { product: "queso_chanco", pool: "queso" },
            { product: "quesillo", pool: "queso" },
            { product: "queso_cheddar", pool: "queso", weight: 0.5 },
            { product: "queso_crema", perPerson: 0.1 }
          ] },
          { name: "Del refri y la verdulería", options: [
            { product: "palta", perPerson: 0.06, typical: true },
            { product: "tomate", perPerson: 0.06 },
            { product: "huevos", perPerson: 1 },
            { product: "mantequilla", perPerson: 0.05, typical: true },
            { product: "margarina", perPerson: 0.05 }
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
            { product: "crema_avellanas", perPerson: 0.08 },
            { product: "mantequilla_mani", perPerson: 0.06 },
            { product: "membrillo", perPerson: 0.08 }
          ] }
        ]
      },
      {
        id: "extras_desayuno", type: "pick",
        when: { step: "comida", any: ["desayuno", "ambos"] },
        title: "Para completar el desayuno",
        help: "Aparece porque elegiste desayuno.",
        groups: [
          { name: "Lácteos y cereales", options: [
            { product: "yogur", perPerson: 1 },
            { product: "cereal", perPerson: 0.1 },
            { product: "granola", perPerson: 0.08 },
            { product: "avena", perPerson: 0.05 }
          ] },
          { name: "Fruta", options: [
            { product: "platano", perPerson: 0.15 },
            { product: "manzana", perPerson: 0.15 },
            { product: "frutillas", perPerson: 0.2 }
          ] }
        ]
      },
      {
        id: "tomar", type: "pick",
        title: "¿Para tomar?",
        groups: [
          { name: "Caliente", options: [
            { product: "te", perPerson: 0.08, typical: true },
            { product: "te_verde", perPerson: 0.06 },
            { product: "te_hierbas", perPerson: 0.06 },
            { product: "cafe", perPerson: 0.02 },
            { product: "cafe_molido", perPerson: 0.02 },
            { product: "cacao", perPerson: 0.05 }
          ] },
          { name: "Leche y jugo", options: [
            { product: "leche", perPerson: 0.2 },
            { product: "leche_descremada", perPerson: 0.2 },
            { product: "leche_sin_lactosa", perPerson: 0.2 },
            { product: "leche_vegetal", perPerson: 0.2 },
            { product: "jugo", perPerson: 0.2 }
          ] },
          { name: "Azúcar y endulzante", options: [
            { product: "azucar", fixed: 1, typical: true },
            { product: "endulzante_liquido", fixed: 1 },
            { product: "stevia", fixed: 1 },
            { product: "sucralosa", fixed: 1 }
          ] }
        ]
      }
    ]
  });
})(typeof window !== "undefined" ? window : globalThis);
