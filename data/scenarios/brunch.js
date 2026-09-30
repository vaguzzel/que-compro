// Escenario: desayuno o brunch.
(function (root) {
  var QC = root.QC = root.QC || {};
  (QC.SCENARIOS = QC.SCENARIOS || []).push({
    id: "brunch",
    name: "Desayuno o brunch",
    icon: "pancake",
    color: "pink",
    tagline: "Huevos, panqueques, fruta y café",
    // 100 g de pan por persona
    pools: { pan: { perPerson: 0.1 } },
    steps: [
      { id: "personas", type: "people", title: "¿Cuántos se sientan a la mesa?", help: "Los niños cuentan como media porción." },
      {
        id: "panes", type: "pick",
        title: "Panes",
        groups: [
          { name: "Panes", options: [
            { product: "marraqueta", pool: "pan", typical: true },
            { product: "hallulla", pool: "pan" },
            { product: "croissant", pool: "pan", typical: true },
            { product: "pan_molde", pool: "pan" },
            { product: "pan_integral", pool: "pan" },
            { product: "baguette", pool: "pan" }
          ] }
        ]
      },
      {
        id: "salado", type: "pick",
        title: "Lo salado",
        groups: [
          { name: "Huevos y compañía", options: [
            { product: "huevos", perPerson: 2, typical: true },
            { product: "tocino", perPerson: 0.04, typical: true },
            { product: "palta", perPerson: 0.07, typical: true },
            { product: "tomate", perPerson: 0.05 },
            { product: "champinones", perPerson: 0.15 }
          ] },
          { name: "Para el pan", options: [
            { product: "jamon_pierna", perPerson: 0.04 },
            { product: "queso_gauda", perPerson: 0.04 },
            { product: "queso_crema", perPerson: 0.1 },
            { product: "mantequilla", perPerson: 0.05, typical: true }
          ] }
        ]
      },
      {
        id: "dulce", type: "pick",
        title: "Lo dulce",
        groups: [
          { name: "Dulce", options: [
            { id: "panqueques_manjar", name: "Panqueques con manjar", icon: "pancake", typical: true, items: [
              { product: "panqueques", perPerson: 0.2 },
              { product: "manjar", perPerson: 0.06 }
            ] },
            { product: "muffins", perPerson: 0.25 },
            { product: "kuchen", perPerson: 1 / 8 },
            { product: "mermelada", perPerson: 0.06 },
            { product: "miel", fixed: 1 },
            { product: "crema_avellanas", perPerson: 0.06 }
          ] },
          { name: "Yogur y cereales", options: [
            { product: "yogur", perPerson: 1, typical: true },
            { product: "yogur_griego", perPerson: 0.25 },
            { product: "granola", perPerson: 0.08, typical: true },
            { product: "cereal", perPerson: 0.1 }
          ] },
          { name: "Fruta", options: [
            { product: "frutillas", perPerson: 0.25, typical: true },
            { product: "platano", perPerson: 0.15 },
            { product: "manzana", perPerson: 0.15 },
            { product: "uvas", perPerson: 0.1 }
          ] }
        ]
      },
      {
        id: "tomar", type: "pick",
        title: "Para tomar",
        groups: [
          { name: "Caliente", options: [
            { product: "cafe_molido", perPerson: 0.04, typical: true },
            { product: "cafe", perPerson: 0.03 },
            { product: "te", perPerson: 0.1 },
            { product: "cacao", perPerson: 0.05 }
          ] },
          { name: "Frío", options: [
            { product: "jugo_natural", perPerson: 0.25, typical: true },
            { product: "jugo", perPerson: 0.2 },
            { product: "leche", perPerson: 0.25, typical: true },
            { product: "leche_vegetal", perPerson: 0.2 },
            { product: "agua", perPerson: 0.2 }
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
