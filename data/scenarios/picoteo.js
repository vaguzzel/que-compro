// Escenario: picoteo o cumpleaños.
(function (root) {
  var QC = root.QC = root.QC || {};
  (QC.SCENARIOS = QC.SCENARIOS || []).push({
    id: "picoteo",
    name: "Picoteo o cumpleaños",
    icon: "party",
    color: "lavender",
    tagline: "Papitas, torta, globos y bebida para todos",
    pools: {},
    steps: [
      { id: "personas", type: "people", title: "¿Cuántos vienen?", help: "Los niños cuentan como media porción." },
      {
        id: "salado", type: "pick",
        title: "Para picotear (salado)",
        groups: [
          { name: "Snacks", options: [
            { product: "papas_fritas", perPerson: 0.15, typical: true },
            { product: "papas_onduladas", perPerson: 0.15 },
            { product: "ramitas", perPerson: 0.15, typical: true },
            { product: "suflitos", perPerson: 0.15 },
            { product: "cabritas", perPerson: 0.2 },
            { product: "mani", perPerson: 0.08, typical: true },
            { product: "frutos_secos", perPerson: 0.06 },
            { product: "galletas_saladas", perPerson: 0.2 }
          ] },
          { name: "Con salsa", options: [
            { id: "nachos_queso", name: "Nachos con salsa de queso", icon: "chips", items: [
              { product: "nachos", perPerson: 0.15 },
              { product: "salsa_queso", fixed: 1, every: 8 }
            ] },
            { id: "nachos_guaca", name: "Nachos con guacamole", icon: "avocado", items: [
              { product: "nachos", perPerson: 0.15 },
              { product: "guacamole", fixed: 1, every: 6 }
            ] },
            { id: "palitos_hummus", name: "Hummus con palitos", icon: "carrot", items: [
              { product: "hummus", fixed: 1, every: 8 },
              { product: "zanahoria", perPerson: 0.05 },
              { product: "apio", fixed: 1, every: 10 }
            ] }
          ] },
          { name: "Algo más contundente", options: [
            { product: "vienesas_coctel", perPerson: 0.15 },
            { product: "empanaditas", perPerson: 0.15 },
            { product: "mini_pizzas", perPerson: 0.12 },
            { product: "papas_congeladas", perPerson: 0.1 },
            { id: "brochetas_caprese", name: "Brochetas caprese", icon: "tomato", items: [
              { product: "tomate_cherry", perPerson: 0.15 },
              { product: "mozzarella", perPerson: 0.03 }
            ] },
            { id: "tablita", name: "Tablita de queso y jamón", icon: "cheese", items: [
              { product: "queso_gauda", perPerson: 0.04 },
              { product: "jamon_pierna", perPerson: 0.03 },
              { product: "aceitunas", fixed: 1, every: 8 }
            ] }
          ] }
        ]
      },
      {
        id: "dulce", type: "pick",
        title: "Lo dulce",
        groups: [
          { name: "Tortas y queques", options: [
            { product: "torta", perPerson: 1 / 15, typical: true },
            { product: "kuchen", perPerson: 1 / 9 },
            { product: "muffins", perPerson: 0.1 },
            { product: "brownies", perPerson: 0.12 }
          ] },
          { name: "Dulces y galletas", options: [
            { product: "galletas_dulces", perPerson: 0.2 },
            { product: "chocolates", perPerson: 0.08 },
            { product: "gomitas", perPerson: 0.1 },
            { product: "alfajores", perPerson: 0.15 },
            { product: "helado", perPerson: 0.15 }
          ] }
        ]
      },
      {
        id: "bebestibles", type: "pick",
        title: "¿Qué van a tomar?",
        help: "Lo que lleva alcohol se calcula solo para los adultos.",
        groups: [
          { name: "Sin alcohol", options: [
            { product: "bebida", perPerson: 0.25, typical: true },
            { product: "bebida_15", perPerson: 0.4 },
            { product: "bebida_lata", perPerson: 1.5 },
            { product: "jugo", perPerson: 0.25, typical: true },
            { product: "agua", perPerson: 0.2 }
          ] },
          { name: "Con alcohol", options: [
            { product: "cerveza", perPerson: 2, adultsOnly: true },
            { product: "vino", perPerson: 0.25, adultsOnly: true },
            { product: "espumante", perPerson: 0.15, adultsOnly: true }
          ] },
          { name: "Para enfriar", options: [
            { product: "hielo", fixed: 1, every: 8, typical: true }
          ] }
        ]
      },
      {
        id: "mesa", type: "pick",
        title: "Para la mesa y el cumpleaños",
        groups: [
          { name: "Mesa", options: [
            { id: "platos_vasos", name: "Platos y vasos", icon: "tableware", typical: true, items: [
              { product: "platos", fixed: 1, every: 10 },
              { product: "vasos", fixed: 1, every: 8 }
            ] },
            { product: "servilletas", fixed: 1, every: 15, typical: true },
            { product: "cubiertos", fixed: 1, every: 15 },
            { product: "mantel", fixed: 1, every: 12 },
            { product: "bolsas_basura", fixed: 1 }
          ] },
          { name: "Cumpleaños", options: [
            { product: "velas", fixed: 1 },
            { product: "vela_numero", fixed: 2 },
            { product: "globos", fixed: 1, every: 15 },
            { product: "gorritos", fixed: 1, every: 6 }
          ] }
        ]
      }
    ]
  });
})(typeof window !== "undefined" ? window : globalThis);
