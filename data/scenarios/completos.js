// Escenario: completos. Cada tipo de completo se reparte el total de completos y trae sus
// ingredientes "por completo" (per): 1 pan, 1 vienesa (1/20 de paquete), 50 g de palta…
(function (root) {
  var QC = root.QC = root.QC || {};
  var PAN = { product: "pan_completo", per: 1 }, VIENESA = { product: "vienesas", per: 1 / 20 };
  var MAYO = { product: "mayonesa", per: 1 / 25 }; // ≈ 16 g por completo
  (QC.SCENARIOS = QC.SCENARIOS || []).push({
    id: "completos",
    name: "Completos",
    icon: "bun",
    color: "mint",
    tagline: "Italianos, dinámicos o as, con todo",
    // 1 completo por persona (× cuántos por persona)
    pools: { completo: { perPerson: 1 } },
    steps: [
      {
        id: "cuantos", type: "choice",
        title: "¿Cuántos completos por persona?",
        help: "Los niños cuentan como medio.",
        options: [
          { id: "uno", name: "Uno", icon: "bun", factor: 1 },
          { id: "dos", name: "Dos", icon: "bun", factor: 2, typical: true },
          { id: "tres", name: "Tres (buen diente)", icon: "bun", factor: 3 }
        ]
      },
      { id: "personas", type: "people", title: "¿Cuántos van a comer?" },
      {
        id: "tipos", type: "pick", min: 1,
        title: "¿Qué completos?",
        help: "Si eliges varios, reparto los completos entre ellos. Cada uno trae sus ingredientes.",
        groups: [
          { name: "Completos", options: [
            { id: "italiano", name: "Italiano", icon: "avocado", pool: "completo", typical: true, items: [
              PAN, VIENESA, { product: "palta", per: 0.05 }, { product: "tomate", per: 0.04 }, MAYO
            ] },
            { id: "dinamico", name: "Dinámico", icon: "bun", pool: "completo", items: [
              PAN, VIENESA, { product: "palta", per: 0.04 }, { product: "tomate", per: 0.03 }, MAYO,
              { product: "salsa_americana", per: 1 / 20 }, { product: "salsa_verde", per: 1 / 15 }
            ] },
            { id: "completo_clasico", name: "Completo (chucrut y americana)", icon: "cabbage", pool: "completo", items: [
              PAN, VIENESA, { product: "chucrut", per: 1 / 15 }, { product: "tomate", per: 0.03 },
              { product: "salsa_americana", per: 1 / 20 }, MAYO
            ] },
            { id: "as_churrasco", name: "As de churrasco", icon: "steak", pool: "completo", items: [
              PAN, { product: "churrasco", per: 0.08 }, { product: "palta", per: 0.04 }, { product: "tomate", per: 0.03 }, MAYO
            ] },
            { id: "as_lomito", name: "As de lomito", icon: "ham", pool: "completo", items: [
              PAN, { product: "lomito_cerdo", per: 0.08 }, { product: "palta", per: 0.04 }, { product: "tomate", per: 0.03 }, MAYO
            ] }
          ] }
        ]
      },
      {
        id: "salsas", type: "pick",
        title: "Salsas y extras",
        groups: [
          { name: "Salsas", options: [
            { product: "ketchup", perPerson: 0.04, typical: true },
            { product: "mostaza", perPerson: 0.03, typical: true },
            { product: "aji", perPerson: 0.03 },
            { product: "mayonesa", perPerson: 0.03, name: "Mayonesa extra" }
          ] },
          { name: "Para acompañar", options: [
            { product: "papas_congeladas", perPerson: 0.1 },
            { product: "papas_fritas", perPerson: 0.1 },
            { product: "queso_cheddar", perPerson: 0.08 }
          ] }
        ]
      },
      {
        id: "bebestibles", type: "pick",
        title: "¿Qué van a tomar?",
        groups: [
          { name: "Bebestibles", options: [
            { product: "bebida", perPerson: 0.25, typical: true },
            { product: "bebida_lata", perPerson: 1 },
            { product: "jugo", perPerson: 0.25 },
            { product: "agua", perPerson: 0.25 },
            { product: "cerveza", perPerson: 2, adultsOnly: true },
            { product: "hielo", fixed: 1, every: 8 }
          ] }
        ]
      },
      {
        id: "mesa", type: "pick",
        title: "Para la mesa",
        groups: [
          { name: "Mesa", options: [
            { product: "servilletas", fixed: 1, every: 10, typical: true },
            { product: "toalla_papel", fixed: 1 },
            { product: "platos", fixed: 1, every: 10 },
            { product: "vasos", fixed: 1, every: 8 }
          ] }
        ]
      }
    ]
  });
})(typeof window !== "undefined" ? window : globalThis);
