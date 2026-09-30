// Escenario: carrete o previa. Solo adultos; la duración multiplica tragos y picoteo.
(function (root) {
  var QC = root.QC = root.QC || {};
  (QC.SCENARIOS = QC.SCENARIOS || []).push({
    id: "carrete",
    name: "Carrete o previa",
    icon: "champagne",
    color: "blue",
    tagline: "Tragos, hielo y algo para picar",
    pools: {},
    steps: [
      {
        id: "duracion", type: "choice",
        title: "¿Cuánto dura?",
        options: [
          { id: "previa", name: "Previa (2 a 3 horas)", icon: "beer", factor: 1, typical: true },
          { id: "carrete", name: "Carrete largo (toda la noche)", icon: "sparkle", factor: 1.8 }
        ]
      },
      { id: "personas", type: "people", kids: false, title: "¿Cuántos van?", help: "Calculo para adultos: toma con responsabilidad y ten agua a mano." },
      {
        id: "tragos", type: "pick", min: 1,
        title: "¿Qué se toma?",
        help: "Cantidades pensadas para una previa normal: una piscola ≈ 60 ml de pisco.",
        groups: [
          { name: "Tragos", options: [
            { id: "piscola", name: "Piscola", icon: "spirits", typical: true, items: [
              { product: "pisco", perPerson: 0.25, adultsOnly: true },
              { product: "bebida", perPerson: 0.3, adultsOnly: true },
              { product: "limon", perPerson: 0.02, adultsOnly: true }
            ] },
            { id: "roncola", name: "Ron con cola", icon: "spirits", items: [
              { product: "ron", perPerson: 0.2, adultsOnly: true },
              { product: "bebida", perPerson: 0.3, adultsOnly: true },
              { product: "limon", perPerson: 0.02, adultsOnly: true }
            ] },
            { product: "pisco_sour", perPerson: 0.25, adultsOnly: true }
          ] },
          { name: "Cerveza y vino", options: [
            { product: "cerveza", perPerson: 4, adultsOnly: true, typical: true },
            { product: "cerveza_botella", perPerson: 4, adultsOnly: true },
            { product: "vino", perPerson: 0.35, adultsOnly: true },
            { product: "vino_blanco", perPerson: 0.3, adultsOnly: true },
            { product: "espumante", perPerson: 0.25, adultsOnly: true }
          ] }
        ]
      },
      {
        id: "mezclar", type: "pick",
        title: "Hielo, agua y para mezclar",
        help: "El hielo nunca sobra.",
        groups: [
          { name: "Imprescindibles", options: [
            { product: "hielo", fixed: 1, every: 4, typical: true },
            { product: "agua", perPerson: 0.4, typical: true },
            { product: "bebida_15", perPerson: 0.3 },
            { product: "jugo", perPerson: 0.2 }
          ] }
        ]
      },
      {
        id: "picoteo", type: "pick",
        title: "Algo para picar",
        groups: [
          { name: "Picoteo", options: [
            { product: "papas_fritas", perPerson: 0.15, typical: true },
            { product: "ramitas", perPerson: 0.12 },
            { product: "mani", perPerson: 0.08, typical: true },
            { product: "cabritas", perPerson: 0.15 },
            { id: "nachos_queso", name: "Nachos con salsa de queso", icon: "chips", items: [
              { product: "nachos", perPerson: 0.15 },
              { product: "salsa_queso", fixed: 1, every: 8 }
            ] },
            { product: "vienesas_coctel", perPerson: 0.15 },
            { product: "empanaditas", perPerson: 0.15 }
          ] }
        ]
      },
      {
        id: "mesa", type: "pick",
        title: "Vasos y orden",
        groups: [
          { name: "Mesa", options: [
            { product: "vasos", fixed: 1, every: 5, typical: true },
            { product: "servilletas", fixed: 1, every: 15 },
            { product: "bolsas_basura", fixed: 1, every: 10, typical: true },
            { product: "toalla_papel", fixed: 1 }
          ] }
        ]
      }
    ]
  });
})(typeof window !== "undefined" ? window : globalThis);
