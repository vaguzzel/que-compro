// Escenario: asado. Formato de pasos y reglas explicado en README.md.
(function (root) {
  var QC = root.QC = root.QC || {};
  (QC.SCENARIOS = QC.SCENARIOS || []).push({
    id: "asado",
    name: "Asado",
    icon: "grill",
    color: "pink",
    tagline: "Carne, choripanes y todo lo del quincho",
    // 400 g de carne cruda por persona, repartidos entre los cortes elegidos
    pools: { carne: { perPerson: 0.4 } },
    steps: [
      { id: "personas", type: "people", title: "¿Cuántos van al asado?", help: "Los niños cuentan como media porción." },
      {
        id: "carnes", type: "pick", min: 1,
        title: "¿Qué se tira a la parrilla?",
        help: "Calculo 400 g de carne por persona y los reparto entre lo que elijas. Los embutidos cuentan como media parte.",
        groups: [
          { name: "Vacuno", options: [
            { product: "lomo_vetado", pool: "carne" },
            { product: "entrana", pool: "carne" },
            { product: "asado_tira", pool: "carne", typical: true },
            { product: "punta_paleta", pool: "carne", typical: true },
            { product: "plateada", pool: "carne" },
            { product: "sobrecostilla", pool: "carne" },
            { product: "tapapecho", pool: "carne" }
          ] },
          { name: "Cerdo", options: [
            { product: "costillar", pool: "carne" },
            { product: "pulpa_cerdo", pool: "carne" },
            { product: "chuleta", pool: "carne" }
          ] },
          { name: "Pollo", options: [
            { product: "trutro", pool: "carne" },
            { product: "alitas", pool: "carne" }
          ] },
          { name: "Embutidos", options: [
            { product: "longaniza", pool: "carne", weight: 0.5, typical: true },
            { product: "chorizo", pool: "carne", weight: 0.5 },
            { product: "prietas", pool: "carne", weight: 0.5 }
          ] },
          { name: "Veggie", options: [
            { product: "choclo", perPerson: 0.5 },
            { product: "champinones", perPerson: 0.06 },
            { product: "zapallo_italiano", perPerson: 0.1 },
            { product: "hamburguesa_veggie", perPerson: 0.125 }
          ] }
        ]
      },
      {
        id: "acompanamientos", type: "pick",
        title: "¿Con qué lo acompañan?",
        groups: [
          { name: "Pan", options: [
            { product: "marraqueta", name: "Pan (marraqueta)", perPerson: 0.1, typical: true }
          ] },
          { name: "Ensaladas", options: [
            { id: "ensalada_chilena", name: "Ensalada chilena", icon: "tomato", typical: true, items: [
              { product: "tomate", perPerson: 0.12 },
              { product: "cebolla", perPerson: 0.04 }
            ] },
            { product: "lechuga", perPerson: 0.2 },
            { id: "papas_mayo", name: "Papas mayo", icon: "potato", items: [
              { product: "papa", perPerson: 0.15 },
              { product: "mayonesa", fixed: 1, every: 8 }
            ] },
            { product: "arroz", perPerson: 0.07 }
          ] },
          { name: "Salsas", options: [
            { id: "pebre", name: "Pebre", icon: "herb", typical: true, items: [
              { product: "tomate", perPerson: 0.04 },
              { product: "cebolla", perPerson: 0.02 },
              { product: "cilantro", fixed: 1, every: 10 }
            ] }
          ] }
        ]
      },
      {
        id: "bebestibles", type: "pick",
        title: "¿Qué van a tomar?",
        help: "La cerveza y el vino se calculan solo para los adultos.",
        groups: [
          { name: "Sin alcohol", options: [
            { product: "bebida", perPerson: 0.25, typical: true },
            { product: "jugo", perPerson: 0.3 },
            { product: "agua", perPerson: 0.3 }
          ] },
          { name: "Con alcohol", options: [
            { product: "cerveza", perPerson: 3, adultsOnly: true, typical: true },
            { product: "vino", perPerson: 0.34, adultsOnly: true, typical: true }
          ] },
          { name: "Para enfriar", options: [
            { product: "hielo", fixed: 1, every: 6, typical: true }
          ] }
        ]
      },
      {
        id: "fuego", type: "pick",
        title: "Para el fuego y la mesa",
        groups: [
          { name: "Fuego", options: [
            { product: "carbon", fixed: 1, every: 8, typical: true },
            { product: "encendedor", fixed: 1, typical: true }
          ] },
          { name: "Mesa", options: [
            { product: "servilletas", fixed: 1, every: 15, typical: true },
            { id: "platos_vasos", name: "Platos y vasos", icon: "tableware", typical: true, items: [
              { product: "platos", fixed: 1, every: 10 },
              { product: "vasos", fixed: 1, every: 8 }
            ] }
          ] }
        ]
      },
      {
        id: "postre", type: "pick",
        title: "¿Y de postre?",
        help: "Opcional: si no quieren postre, sigue no más.",
        groups: [
          { name: "Postre", options: [
            { product: "helado", perPerson: 0.15 },
            { product: "torta", perPerson: 1 / 15 },
            { product: "fruta", perPerson: 0.2 }
          ] }
        ]
      }
    ]
  });
})(typeof window !== "undefined" ? window : globalThis);
