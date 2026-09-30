// Escenario: asado. Formato de pasos y reglas explicado en README.md.
(function (root) {
  var QC = root.QC = root.QC || {};
  function cut(product, typical) { return { product: product, pool: "carne", typical: !!typical }; }
  function emb(product, typical) { return { product: product, pool: "carne", weight: 0.5, typical: !!typical }; }
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
        id: "carnes", type: "pick", min: 1, info: true,
        title: "¿Qué se tira a la parrilla?",
        help: "Calculo 400 g de carne por persona y los reparto entre lo que elijas; los embutidos cuentan como media parte. Toca ⓘ para saber qué es cada corte.",
        groups: [
          { name: "Vacuno", options: [
            cut("lomo_vetado"), cut("lomo_liso"), cut("filete"), cut("entrana"), cut("punta_ganso"), cut("punta_picana"),
            cut("asado_tira", true), cut("punta_paleta", true), cut("plateada"), cut("sobrecostilla"), cut("tapapecho"),
            cut("palanca"), cut("tapabarriga"), cut("malaya"), cut("asado_carnicero")
          ] },
          { name: "Cerdo", options: [cut("costillar"), cut("pulpa_cerdo"), cut("chuleta"), cut("malaya_cerdo"), cut("lomo_cerdo"), cut("panceta")] },
          { name: "Pollo", options: [cut("trutro"), cut("trutro_corto"), cut("alitas"), cut("pechuga"), cut("pollo_entero")] },
          { name: "Cordero", options: [cut("pierna_cordero"), cut("costillar_cordero")] },
          { name: "Pescados y mariscos", options: [cut("salmon"), cut("reineta"), cut("camarones")] },
          { name: "Embutidos", options: [emb("longaniza", true), emb("chorizo"), emb("choricillo"), emb("prietas")] },
          { name: "Veggie y a la parrilla", options: [
            { product: "choclo", perPerson: 0.5 },
            { product: "champinones", perPerson: 0.25 },
            { product: "zapallo_italiano", perPerson: 0.1 },
            { product: "pimenton", perPerson: 0.08 },
            { product: "berenjena", perPerson: 0.08 },
            { product: "queso_asar", perPerson: 0.05 },
            { product: "hamburguesa_veggie", perPerson: 0.125 }
          ] }
        ]
      },
      {
        id: "acompanamientos", type: "pick",
        title: "¿Con qué lo acompañan?",
        groups: [
          { name: "Pan", options: [
            { product: "marraqueta", name: "Pan (marraqueta)", perPerson: 0.1, typical: true },
            { product: "pan_amasado", perPerson: 0.1 },
            { product: "pan_ajo", fixed: 1, every: 5 }
          ] },
          { name: "Ensaladas", options: [
            { id: "ensalada_chilena", name: "Ensalada chilena", icon: "tomato", typical: true, items: [
              { product: "tomate", perPerson: 0.12 },
              { product: "cebolla", perPerson: 0.04 }
            ] },
            { product: "lechuga", perPerson: 0.2 },
            { id: "tomate_palta", name: "Tomate con palta", icon: "avocado", items: [
              { product: "tomate", perPerson: 0.1 },
              { product: "palta", perPerson: 0.06 }
            ] },
            { id: "ensalada_repollo", name: "Repollo con zanahoria", icon: "cabbage", items: [
              { product: "repollo", fixed: 1, every: 8 },
              { product: "zanahoria", perPerson: 0.04 }
            ] },
            { id: "ensalada_rusa", name: "Ensalada rusa", icon: "potato", items: [
              { product: "papa", perPerson: 0.1 },
              { product: "zanahoria", perPerson: 0.03 },
              { product: "arvejas", fixed: 1, every: 6 },
              { product: "mayonesa", fixed: 1, every: 8 }
            ] },
            { id: "papas_mayo", name: "Papas mayo", icon: "potato", items: [
              { product: "papa", perPerson: 0.15 },
              { product: "mayonesa", fixed: 1, every: 8 }
            ] },
            { product: "palmitos", fixed: 1, every: 5 },
            { product: "apio", fixed: 1, every: 8 },
            { product: "arroz", perPerson: 0.07 },
            { id: "papas_doradas", name: "Papas doradas", icon: "potato", items: [
              { product: "papa", perPerson: 0.2 },
              { product: "aceite", fixed: 1 }
            ] }
          ] },
          { name: "Salsas", options: [
            { id: "pebre", name: "Pebre casero", icon: "herb", typical: true, items: [
              { product: "tomate", perPerson: 0.04 },
              { product: "cebolla", perPerson: 0.02 },
              { product: "cilantro", fixed: 1, every: 10 },
              { product: "aji", fixed: 1, every: 15 }
            ] },
            { product: "chimichurri", fixed: 1, every: 10 },
            { product: "mayonesa", fixed: 1, every: 10 },
            { product: "ketchup", fixed: 1, every: 12 },
            { product: "mostaza", fixed: 1, every: 15 },
            { product: "aji", fixed: 1, every: 12 },
            { product: "merken", fixed: 1 }
          ] },
          { name: "Para condimentar", options: [
            { product: "sal_parrillera", fixed: 1, typical: true },
            { product: "limon", perPerson: 0.03 },
            { product: "aceite_oliva", fixed: 1 },
            { product: "oregano", fixed: 1 }
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
            { product: "jugo", perPerson: 0.3 },
            { product: "agua", perPerson: 0.3 },
            { product: "agua_gas", perPerson: 0.15 }
          ] },
          { name: "Con alcohol", options: [
            { product: "cerveza", perPerson: 3, adultsOnly: true, typical: true },
            { product: "cerveza_botella", perPerson: 3, adultsOnly: true },
            { product: "vino", perPerson: 0.34, adultsOnly: true, typical: true },
            { product: "vino_blanco", perPerson: 0.25, adultsOnly: true },
            { product: "espumante", perPerson: 0.2, adultsOnly: true },
            { id: "piscola", name: "Piscola", icon: "spirits", items: [
              { product: "pisco", perPerson: 0.2, adultsOnly: true },
              { product: "bebida", perPerson: 0.2, adultsOnly: true }
            ] }
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
            { product: "carbon", fixed: 1, every: 5, typical: true },
            { product: "briquetas", fixed: 1, every: 8 },
            { product: "lena", fixed: 1, every: 10 },
            { product: "encendedor", fixed: 1, typical: true },
            { product: "fosforos", fixed: 1 },
            { product: "papel_aluminio", fixed: 1 }
          ] },
          { name: "Mesa", options: [
            { product: "servilletas", fixed: 1, every: 15, typical: true },
            { id: "platos_vasos", name: "Platos y vasos", icon: "tableware", typical: true, items: [
              { product: "platos", fixed: 1, every: 10 },
              { product: "vasos", fixed: 1, every: 8 }
            ] },
            { product: "cubiertos", fixed: 1, every: 12 },
            { product: "mantel", fixed: 1, every: 10 },
            { product: "toalla_papel", fixed: 1 },
            { product: "bolsas_basura", fixed: 1 }
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
            { product: "kuchen", perPerson: 1 / 9 },
            { product: "sandia", fixed: 1, every: 10 },
            { product: "melon", fixed: 1, every: 6 },
            { id: "frutillas_crema", name: "Frutillas con crema", icon: "strawberry", items: [
              { product: "frutillas", perPerson: 0.25 },
              { product: "crema", perPerson: 0.25 }
            ] },
            { product: "mote_huesillo", perPerson: 0.3 }
          ] }
        ]
      }
    ]
  });
})(typeof window !== "undefined" ? window : globalThis);
