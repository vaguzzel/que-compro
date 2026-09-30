// Escenario: picoteo o cumpleaños.
(function (root) {
  var QC = root.QC = root.QC || {};
  (QC.SCENARIOS = QC.SCENARIOS || []).push({
    id: "picoteo",
    name: "Picoteo o cumpleaños",
    icon: "party",
    color: "lavender",
    tagline: "Papitas, torta y bebida para todos",
    pools: {},
    steps: [
      { id: "personas", type: "people", title: "¿Cuántos vienen?", help: "Los niños cuentan como media porción." },
      {
        id: "salado", type: "pick",
        title: "Para picotear",
        groups: [
          { name: "Salado", options: [
            { product: "papas_fritas", perPerson: 0.15, typical: true },
            { product: "mani", perPerson: 0.08, typical: true },
            { product: "ramitas", perPerson: 0.15, typical: true },
            { product: "galletas_saladas", perPerson: 0.2 }
          ] }
        ]
      },
      {
        id: "dulce", type: "pick",
        title: "Lo dulce",
        groups: [
          { name: "Dulce", options: [
            { product: "torta", perPerson: 1 / 15, typical: true },
            { product: "galletas_dulces", perPerson: 0.2 },
            { product: "helado", perPerson: 0.15 }
          ] }
        ]
      },
      {
        id: "bebestibles", type: "pick",
        title: "¿Qué van a tomar?",
        help: "La cerveza se calcula solo para los adultos.",
        groups: [
          { name: "Sin alcohol", options: [
            { product: "bebida", perPerson: 0.25, typical: true },
            { product: "jugo", perPerson: 0.25, typical: true },
            { product: "agua", perPerson: 0.2 }
          ] },
          { name: "Con alcohol", options: [
            { product: "cerveza", perPerson: 2, adultsOnly: true }
          ] },
          { name: "Para enfriar", options: [
            { product: "hielo", fixed: 1, every: 8, typical: true }
          ] }
        ]
      },
      {
        id: "mesa", type: "pick",
        title: "Para la mesa",
        groups: [
          { name: "Mesa", options: [
            { id: "platos_vasos", name: "Platos y vasos", icon: "tableware", typical: true, items: [
              { product: "platos", fixed: 1, every: 10 },
              { product: "vasos", fixed: 1, every: 8 }
            ] },
            { product: "servilletas", fixed: 1, every: 15, typical: true },
            { product: "velas", fixed: 1 }
          ] }
        ]
      }
    ]
  });
})(typeof window !== "undefined" ? window : globalThis);
