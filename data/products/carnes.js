// Carnicería y pescadería. Precios de respaldo por kg (salvo que se indique otra unidad).
(function (root) {
  var QC = root.QC;
  function kg(name, min, avg, max, icon, extra) {
    var p = { name: name, cat: "carniceria", unit: "kg", step: 0.5, min: min, avg: avg, max: max, icon: icon };
    for (var k in extra) p[k] = extra[k];
    return p;
  }
  var VAC = ["cerdo", "pollo", "pavo", "cordero", "hamburguesa", "molida", "marinado", "marinada", "salsa"];
  QC.addProducts({
    /* ---------- Vacuno ---------- */
    lomo_vetado: kg("Lomo vetado", 14990, 18990, 26990, "steak", { q: "lomo vetado", not: VAC }),
    lomo_liso: kg("Lomo liso", 13990, 17490, 24990, "steak", { q: "lomo liso", not: VAC }),
    filete: kg("Filete", 19990, 24990, 34990, "steak", { q: "filete vacuno", must: ["filete"], not: VAC.concat(["pescado", "salmon", "reineta", "merluza", "atun"]) }),
    entrana: kg("Entraña", 17990, 22990, 32990, "steak", { hint: "Se hace rápido: 2 o 3 piezas por kg", q: "entraña", must: ["entrana"], not: VAC.concat(["entranita"]) }),
    punta_ganso: kg("Punta de ganso (picaña)", 13990, 16990, 22990, "steak", { q: "punta de ganso", must: ["punta", "ganso"], not: VAC }),
    punta_picana: kg("Punta picana", 12990, 15990, 20990, "steak", { q: "punta picana", must: ["punta", "picana"], not: VAC }),
    asado_tira: kg("Asado de tira", 8990, 11490, 15990, "ribs", { hint: "Tiene hueso: rinde un poco menos", q: "asado de tira", must: ["asado", "tira"], not: VAC }),
    punta_paleta: kg("Punta paleta", 10990, 13490, 17990, "steak", { q: "punta paleta", must: ["punta", "paleta"], not: VAC }),
    plateada: kg("Plateada", 9990, 12490, 15990, "steak", { q: "plateada vacuno", must: ["plateada"], not: VAC }),
    sobrecostilla: kg("Sobrecostilla", 8490, 10490, 13490, "steak", { q: "sobrecostilla", not: VAC }),
    tapapecho: kg("Tapapecho", 8990, 10990, 13990, "steak", { hint: "Cocción lenta", q: "tapapecho", not: VAC }),
    palanca: kg("Palanca", 11990, 14490, 18990, "steak", { q: "palanca vacuno", must: ["palanca"], not: VAC }),
    tapabarriga: kg("Tapabarriga", 10990, 13490, 16990, "steak", { q: "tapabarriga", not: VAC }),
    malaya: kg("Malaya de vacuno", 8990, 10990, 13990, "steak", { q: "malaya vacuno", must: ["malaya"], not: VAC }),
    huachalomo: kg("Huachalomo", 8990, 10990, 13490, "steak", { q: "huachalomo", not: VAC }),
    asado_carnicero: kg("Asado carnicero", 8990, 10990, 13990, "steak", { q: "asado carnicero", must: ["asado", "carnicero"], not: VAC }),
    choclillo: kg("Choclillo", 8990, 10490, 12990, "steak", { q: "choclillo", not: VAC }),
    abastero: kg("Abastero", 7990, 9490, 11990, "steak", { q: "abastero", not: VAC }),
    churrasco: kg("Carne para churrasco", 9990, 12990, 16990, "steak", { hint: "Posta o lomo en láminas finas", q: "churrasco vacuno", must: ["churrasco"], not: ["pollo", "cerdo", "pan", "congelado"] }),

    /* ---------- Cerdo ---------- */
    costillar: kg("Costillar de cerdo", 5990, 7490, 9490, "ribs", { q: "costillar cerdo", must: ["costillar"], not: ["vacuno", "cordero", "ahumado", "bbq"] }),
    pulpa_cerdo: kg("Pulpa de cerdo", 5490, 6490, 7990, "steak", { q: "pulpa cerdo", must: ["pulpa", "cerdo"] }),
    chuleta: kg("Chuleta de cerdo", 4990, 5990, 7490, "steak", { q: "chuleta cerdo", must: ["chuleta"], not: ["cordero", "vacuno", "ahumada"] }),
    malaya_cerdo: kg("Malaya de cerdo", 5490, 6990, 8490, "steak", { q: "malaya cerdo", must: ["malaya", "cerdo"] }),
    lomo_cerdo: kg("Lomo de cerdo", 5990, 7490, 9490, "steak", { q: "lomo de cerdo", must: ["lomo", "cerdo"], not: ["ahumado", "lomito", "tocino"] }),
    lomito_cerdo: kg("Lomito de cerdo (para as)", 7990, 9990, 12990, "ham", { hint: "Cocido y laminado, para el as y el barros luco", q: "lomito cerdo", must: [["lomito", "lomitos"]], not: ["pollo", "pavo"] }),
    panceta: kg("Panceta de cerdo", 6990, 8490, 10990, "ribs", { q: "panceta cerdo", must: ["panceta"], not: ["ahumada", "tocino", "laminada"] }),

    /* ---------- Pollo ---------- */
    trutro: kg("Trutro entero de pollo", 2990, 3790, 4990, "chickenLeg", { q: "trutro entero pollo", must: ["trutro"], not: ["pavo", "apanado", "cocido", "deshuesado", "corto"] }),
    trutro_corto: kg("Trutro corto de pollo", 2990, 3990, 5290, "chickenLeg", { q: "trutro corto pollo", must: ["trutro", "corto"], not: ["pavo", "apanado"] }),
    alitas: kg("Alitas de pollo", 3490, 4490, 5990, "chickenLeg", { q: "alitas pollo", must: [["alitas", "alas"]], not: ["pavo", "apanadas", "bbq", "crocante", "crocantes", "golden", "mix"] }),
    pechuga: kg("Pechuga de pollo deshuesada", 5490, 6990, 8990, "chickenLeg", { q: "pechuga pollo deshuesada", must: ["pechuga"], not: ["pavo", "apanada", "cocida", "laminada", "nuggets"] }),
    pollo_entero: kg("Pollo entero", 2490, 2990, 3990, "chickenLeg", { q: "pollo entero", must: ["pollo", "entero"], not: ["asado", "rostizado", "trutro"] }),

    /* ---------- Cordero ---------- */
    pierna_cordero: kg("Pierna de cordero", 11990, 15990, 24990, "steak", { q: "pierna cordero", must: ["pierna", "cordero"] }),
    costillar_cordero: kg("Costillar de cordero", 10990, 13990, 18990, "ribs", { q: "costillar cordero", must: ["cordero"], not: ["pierna", "paleta", "brocheta", "alimento", "snack"] }),

    /* ---------- Embutidos ---------- */
    longaniza: kg("Longaniza", 5990, 7990, 10990, "sausage", { hint: "≈ 8 a 10 unidades por kg", q: "longaniza", not: ["pollo", "vegana", "veggie", "cocktail", "coctel"] }),
    chorizo: kg("Chorizo parrillero", 5490, 7490, 9990, "sausage", { q: "chorizo parrillero", must: ["chorizo"], not: ["pollo", "vegano", "espanol", "cantimpalo", "laminado", "rebanado"] }),
    choricillo: kg("Choricillo", 5990, 7990, 10990, "sausage", { hint: "Chorizo chico, ideal para picar", q: "choricillo", must: [["choricillo", "choricillos"]] }),
    prietas: kg("Prietas", 4990, 6490, 8490, "sausage", { hint: "Morcilla chilena", q: "prietas", must: [["prieta", "prietas"]] }),
    vienesas: { name: "Vienesas", cat: "carniceria", unit: "paquete de 20", plural: "paquetes de 20", step: 1, min: 2490, avg: 3490, max: 5490, icon: "sausage", hint: "Para completos: 1 o 2 por completo", q: "vienesas 20 unidades", must: [["vienesa", "vienesas", "salchicha", "salchichas"]], not: ["coctel", "cocktail", "mini", "pollo", "vegana", "veggie", "sachet"], pack: { un: 20 } },
    vienesas_coctel: { name: "Vienesas de cóctel", cat: "carniceria", unit: "paquete", step: 1, min: 1990, avg: 2690, max: 3990, icon: "sausage", hint: "Paquete de ≈ 250 g", q: "vienesas coctel", must: [["coctel", "cocktail"]], pack: { g: 250 } },
    hamburguesa_veggie: { name: "Hamburguesa veggie", cat: "congelados", unit: "caja de 4", plural: "cajas de 4", step: 1, min: 3490, avg: 4490, max: 5990, icon: "steak", hint: "Media por persona", q: "hamburguesa vegetal", must: ["hamburguesa", ["vegetal", "veggie", "vegana", "plant", "vegetariana"]], pack: { g: 400 }, tol: [0.2, 2.2] },
    queso_asar: { name: "Provoleta (queso para asar)", cat: "fiambreria", unit: "provoleta", plural: "provoletas", step: 1, min: 3990, avg: 4990, max: 5990, icon: "cheese", hint: "De ≈ 130 g, para 3 personas", q: "queso provoleta", must: ["provoleta"], not: ["rallado"], pack: { g: 130 }, tol: [0.4, 2.5] },

    /* ---------- Pescadería ---------- */
    salmon: { name: "Salmón (filete)", cat: "pescaderia", unit: "kg", step: 0.5, min: 10990, avg: 13990, max: 17990, icon: "fish", q: "salmon filete", must: ["salmon"], not: ["ahumado", "lata", "hamburguesa", "apanado"] },
    reineta: { name: "Reineta (filete)", cat: "pescaderia", unit: "kg", step: 0.5, min: 8990, avg: 11490, max: 14990, icon: "fish", q: "reineta filete", must: ["reineta"], not: ["apanada"] },
    camarones: { name: "Camarones", cat: "pescaderia", unit: "kg", step: 0.5, min: 9990, avg: 13990, max: 19990, icon: "shrimp", hint: "Bolsas congeladas de 400 g a 1 kg", q: "camarones", must: [["camaron", "camarones"]], not: ["apanado", "sopa", "chips"] }
  });
})(typeof window !== "undefined" ? window : globalThis);
