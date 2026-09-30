// Bebidas, jugos, agua, hielo y botillería
(function (root) {
  var QC = root.QC;
  function b(name, cat, unit, plural, min, avg, max, icon, extra) {
    var p = { name: name, cat: cat, unit: unit, plural: plural, step: 1, min: min, avg: avg, max: max, icon: icon };
    for (var k in extra) p[k] = extra[k];
    return p;
  }
  var NO_SODA = ["jugo", "nectar", "agua", "energetica", "isotonica", "polvo", "cesta", "canasto", "vegetal", "avena", "almendra"];
  QC.addProducts({
    /* ---------- Sin alcohol ---------- */
    bebida: b("Bebida", "bebidas", "botella de 3 L", "botellas de 3 L", 2090, 2690, 3490, "soda", { q: "bebida 3 litros", must: ["bebida"], not: NO_SODA, pack: { ml: 3000 } }),
    bebida_15: b("Bebida 1,5 L", "bebidas", "botella de 1,5 L", "botellas de 1,5 L", 1390, 1890, 2490, "soda", { q: "bebida 1.5 litros", must: ["bebida"], not: NO_SODA, pack: { ml: 1500 }, tol: [0.8, 1.35] }),
    bebida_lata: b("Bebida en lata", "bebidas", "lata", "latas", 590, 890, 1190, "soda", { hint: "Latas de 350 ml", q: "bebida lata 350", must: ["bebida", "lata"], not: NO_SODA, pack: { un: 1, ml: 350 } }),
    jugo: b("Jugo", "bebidas", "caja de 1,5 L", "cajas de 1,5 L", 1190, 1690, 2390, "juice", { q: "jugo 1.5 litros", must: [["jugo", "nectar"]], not: ["polvo", "sobre", "natural", "exprimido", "limon", "fresco", "guallarauco", "citric"], pack: { ml: 1500 }, tol: [0.6, 1.4] }),
    jugo_natural: b("Jugo natural de naranja", "bebidas", "botella de 1 L", "botellas de 1 L", 2490, 3290, 4290, "juice", { q: "jugo naranja natural", must: ["jugo", "naranja", ["natural", "exprimido"]], pack: { ml: 1000 } }),
    agua: b("Agua mineral sin gas", "bebidas", "botella de 1,6 L", "botellas de 1,6 L", 590, 890, 1290, "water", { q: "agua mineral sin gas 1.6", must: ["agua"], not: ["con gas", "gasificada", "saborizada", "tonica", "coco", "perfume", "micelar"], pack: { ml: 1600 } }),
    agua_gas: b("Agua mineral con gas", "bebidas", "botella de 1,6 L", "botellas de 1,6 L", 590, 890, 1290, "water", { q: "agua mineral con gas 1.6", must: ["agua", ["gas", "gasificada"]], not: ["sin gas", "saborizada", "tonica"], pack: { ml: 1600 } }),
    hielo: b("Hielo", "bebidas", "bolsa de 2 kg", "bolsas de 2 kg", 990, 1490, 1990, "ice", { q: "hielo bolsa", must: ["hielo"], not: ["cubetera", "molde", "picadora"], pack: { g: 2000 } }),

    /* ---------- Botillería ---------- */
    cerveza: b("Cerveza en lata", "botilleria", "lata", "latas", 690, 1090, 1590, "beer", { step: 6, hint: "Latas de 470 cc, en packs de 6", q: "cerveza lata 470", must: ["cerveza"], not: ["sin alcohol", "0.0", "0,0"], pack: { un: 1, ml: 470 } }),
    cerveza_botella: b("Cerveza en botella", "botilleria", "botella", "botellas", 790, 1290, 1990, "beer", { step: 6, hint: "Botellas de 330 cc, en packs de 6", q: "cerveza botella 330", must: ["cerveza", "botella"], not: ["sin alcohol", "retornable 1"], pack: { un: 1, ml: 330 } }),
    vino: b("Vino tinto", "botilleria", "botella", "botellas", 2990, 5490, 9990, "wine", { hint: "Botella de 750 cc", q: "vino tinto 750", must: ["vino", "tinto"], not: ["caja", "bag", "2 litros", "blanco"], pack: { ml: 750 } }),
    vino_blanco: b("Vino blanco", "botilleria", "botella", "botellas", 2990, 5490, 9990, "wine", { hint: "Botella de 750 cc", q: "vino blanco 750", must: ["vino", "blanco"], not: ["caja", "carton", "bag", "tinto"], pack: { ml: 750 } }),
    espumante: b("Espumante", "botilleria", "botella", "botellas", 3990, 6990, 12990, "champagne", { hint: "Botella de 750 cc", q: "espumante", must: [["espumante", "champagne", "brut"]], not: ["sin alcohol"], pack: { ml: 750 } }),
    pisco: b("Pisco 35°", "botilleria", "botella de 750 cc", "botellas de 750 cc", 5990, 7990, 11990, "spirits", { q: "pisco 35 750", must: ["pisco"], not: ["sour", "cola", "lata", "limon"], pack: { ml: 750 } }),
    ron: b("Ron", "botilleria", "botella de 750 cc", "botellas de 750 cc", 6990, 9490, 14990, "spirits", { q: "ron 750", must: ["ron"], not: ["cola", "lata", "pasas", "coco", "malibu", "sabor"], pack: { ml: 750 } }),
    pisco_sour: b("Pisco sour listo", "botilleria", "botella de 1 L", "botellas de 1 L", 4490, 5990, 8490, "spirits", { q: "pisco sour", must: ["pisco", "sour"], not: ["lata", "mix", "polvo"], pack: { ml: 1000 } })
  });
})(typeof window !== "undefined" ? window : globalThis);
