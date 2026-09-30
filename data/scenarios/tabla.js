// Escenario: tabla de quesos y fiambres.
(function (root) {
  var QC = root.QC = root.QC || {};
  function q(product, typical) { return { product: product, pool: "queso", typical: !!typical }; }
  function f(product, typical) { return { product: product, pool: "fiambre", typical: !!typical }; }
  (QC.SCENARIOS = QC.SCENARIOS || []).push({
    id: "tabla",
    name: "Tabla de quesos",
    icon: "cheese",
    color: "butter",
    tagline: "Quesos, fiambres, galletas y vino",
    // Como picoteo (no como comida principal): 80 g de queso y 50 g de fiambre por persona
    pools: { queso: { perPerson: 0.08 }, fiambre: { perPerson: 0.05 } },
    steps: [
      { id: "personas", type: "people", title: "¿Para cuántas personas?", help: "Calculo la tabla como picoteo. Si es la comida principal, suma un par de personas." },
      {
        id: "quesos", type: "pick", min: 1,
        title: "¿Qué quesos?",
        help: "Lo ideal son 3 o 4 quesos distintos: uno suave, uno cremoso, uno maduro y uno intenso.",
        groups: [
          { name: "Suaves", options: [q("queso_gauda", true), q("queso_mantecoso"), q("queso_chanco")] },
          { name: "Cremosos", options: [q("queso_brie", true), q("queso_camembert"), q("queso_cabra")] },
          { name: "Intensos", options: [q("queso_parmesano", true), q("queso_azul")] }
        ]
      },
      {
        id: "fiambres", type: "pick",
        title: "¿Y fiambres?",
        groups: [
          { name: "Fiambres", options: [f("salame", true), f("jamon_serrano", true), f("prosciutto"), f("jamon_pierna"), f("pechuga_pavo")] }
        ]
      },
      {
        id: "base", type: "pick",
        title: "Galletas y pan",
        groups: [
          { name: "Para acompañar", options: [
            { product: "galletas_tabla", perPerson: 0.15, typical: true },
            { product: "baguette", perPerson: 0.2, typical: true },
            { product: "galletas_saladas", perPerson: 0.15 },
            { product: "tostadas", perPerson: 0.1 }
          ] }
        ]
      },
      {
        id: "extras", type: "pick",
        title: "Los extras que la hacen linda",
        groups: [
          { name: "Fruta", options: [
            { product: "uvas", perPerson: 0.08, typical: true },
            { product: "frutillas", perPerson: 0.1 },
            { product: "manzana", perPerson: 0.08 }
          ] },
          { name: "Dulce y salado", options: [
            { product: "frutos_secos", perPerson: 0.05, typical: true },
            { product: "aceitunas", fixed: 1, every: 6, typical: true },
            { product: "pepinillos", fixed: 1, every: 10 },
            { product: "tomate_cherry", perPerson: 0.15 },
            { product: "mermelada_higo", fixed: 1, every: 8, typical: true },
            { product: "miel", fixed: 1 },
            { product: "hummus", fixed: 1, every: 8 }
          ] }
        ]
      },
      {
        id: "tomar", type: "pick",
        title: "Para tomar",
        help: "El vino se calcula solo para los adultos.",
        groups: [
          { name: "Bebestibles", options: [
            { product: "vino", perPerson: 0.4, adultsOnly: true, typical: true },
            { product: "vino_blanco", perPerson: 0.3, adultsOnly: true },
            { product: "espumante", perPerson: 0.25, adultsOnly: true },
            { product: "agua", perPerson: 0.25 },
            { product: "agua_gas", perPerson: 0.2 },
            { product: "jugo", perPerson: 0.2 }
          ] }
        ]
      },
      {
        id: "mesa", type: "pick",
        title: "Para servir",
        groups: [
          { name: "Mesa", options: [
            { product: "servilletas", fixed: 1, every: 15, typical: true },
            { product: "platos", fixed: 1, every: 10 },
            { product: "vasos", fixed: 1, every: 8 },
            { product: "toalla_papel", fixed: 1 }
          ] }
        ]
      }
    ]
  });
})(typeof window !== "undefined" ? window : globalThis);
