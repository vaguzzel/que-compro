// Frutas y verduras
(function (root) {
  var QC = root.QC;
  function v(name, unit, step, min, avg, max, icon, extra) {
    // En frutas y verduras el nombre debe empezar con la palabra buscada ("Tomate malla 1 kg"),
    // así no calzan "gomitas sabor uva" ni "shampoo sandía"
    var p = { name: name, cat: "verduleria", unit: unit, step: step, min: min, avg: avg, max: max, icon: icon, start: true };
    for (var k in extra) p[k] = extra[k];
    return p;
  }
  var PROC = ["salsa", "jugo", "pasta", "deshidratado", "conserva", "congelado", "congelada", "chips", "polvo", "sabor", "ensalada",
    "picada", "picado", "cubos", "juliana", "mix", "crema", "sopa", "pastel", "dip", "compota", "frito", "frita", "organico", "organica"];
  QC.addProducts({
    tomate: v("Tomate", "kg", 0.5, 990, 1590, 2490, "tomato", { q: "tomate", minSize: 500, not: PROC.concat(["cherry", "cocktail", "romanita", "grape", "triturado", "pure", "passata"]) }),
    tomate_cherry: v("Tomate cherry", "bandeja", 1, 1290, 1790, 2490, "tomato", { hint: "Bandeja de ≈ 250 g", q: "tomate cherry", must: ["cherry"], not: PROC, pack: { g: 250 } }),
    cebolla: v("Cebolla", "kg", 0.5, 690, 1090, 1590, "onion", { q: "cebolla", minSize: 500, not: PROC.concat(["morada", "escabechera", "perla", "crispy", "caramelizada"]) }),
    cebolla_morada: v("Cebolla morada", "kg", 0.5, 990, 1490, 1990, "onion", { q: "cebolla morada", must: ["cebolla", "morada"], not: PROC }),
    ajo: v("Ajo", "cabeza", 1, 290, 490, 790, "garlic", { q: "ajo", must: ["ajo"], not: PROC.concat(["pan", "sal", "molido", "pasta"]), pack: { un: 1, g: 50 } }),
    cilantro: v("Cilantro", "atado", 1, 390, 690, 990, "herb", { q: "cilantro", not: PROC.concat(["seco", "semilla", "frasco", "badia", "baby"]) }),
    perejil: v("Perejil", "atado", 1, 390, 690, 990, "herb", { q: "perejil", not: ["seco", "deshidratado"] }),
    lechuga: v("Lechuga", "lechuga", 1, 690, 1090, 1590, "lettuce", { q: "lechuga", not: ["mix", "bolsa", "ensalada"] }),
    repollo: v("Repollo", "repollo", 1, 990, 1490, 2190, "cabbage", { q: "repollo", not: PROC.concat(["morado", "rojo", "chucrut", "precocido"]) }),
    zanahoria: v("Zanahoria", "kg", 0.5, 690, 1090, 1590, "carrot", { q: "zanahoria", minSize: 500, not: PROC.concat(["baby", "rallada"]) }),
    apio: v("Apio", "unidad", 1, 990, 1490, 2190, "herb", { plural: "unidades", q: "apio", not: ["sal", "seco"] }),
    pimenton: v("Pimentón", "kg", 0.5, 1490, 2290, 3490, "pepper", { q: "pimenton rojo", must: ["pimenton"], not: PROC.concat(["dulce", "ahumado", "molido", "merken", "specia", "frasco", "mermelada"]) }),
    berenjena: v("Berenjena", "kg", 0.5, 1290, 1990, 2790, "eggplant", { q: "berenjena", not: PROC }),
    zapallo_italiano: v("Zapallo italiano", "kg", 0.5, 1290, 1890, 2690, "zucchini", { q: "zapallo italiano", must: ["zapallo", "italiano"], not: PROC }),
    champinones: v("Champiñones", "bandeja", 1, 1190, 1590, 2290, "mushroom", { hint: "Bandeja de ≈ 250 g", q: "champiñon", must: [["champinon", "champinones"]], not: PROC.concat(["lata", "laminado en"]), pack: { g: 250 } }),
    choclo: v("Choclo", "choclo", 1, 450, 690, 990, "corn", { q: "choclo", not: PROC.concat(["grano", "desgranado", "lata", "pastelera", "humita", "tetra", "trozos", "trozado", "tierno", "pincho"]), pack: { un: 1, g: 250 } }),
    papa: v("Papas", "kg", 1, 890, 1390, 1990, "potato", { hint: "Mallas de 1 a 2 kg", q: "papa", must: [["papa", "papas"]], not: PROC.concat(["fritas", "prefritas", "hash", "duquesa"]) }),
    palta: v("Palta", "kg", 0.5, 3990, 5990, 8990, "avocado", { hint: "≈ 4 o 5 paltas por kg", q: "palta hass", must: ["palta"], not: PROC.concat(["guacamole", "crema"]) }),
    limon: v("Limón", "kg", 0.5, 1290, 1990, 2990, "lemon", { q: "limon", not: PROC.concat(["soda", "bebida", "helado", "sucedaneo", "jalea", "galleta"]) }),
    frutillas: v("Frutillas", "bandeja", 1, 1990, 2790, 3990, "strawberry", { hint: "Bandeja de ≈ 500 g", q: "frutilla", must: [["frutilla", "frutillas"]], not: PROC.concat(["mermelada", "yogur", "helado", "leche"]), pack: { g: 500 } }),
    platano: v("Plátano", "kg", 0.5, 990, 1390, 1990, "banana", { q: "platano", not: PROC.concat(["chiquitin", "queque", "yoghurt", "yogur"]) }),
    manzana: v("Manzana", "kg", 0.5, 990, 1490, 2190, "apple", { q: "manzana", not: PROC.concat(["compota", "vinagre", "nectar"]) }),
    uvas: v("Uvas", "kg", 0.5, 1990, 2990, 4490, "grapes", { q: "uva", must: [["uva", "uvas"]], not: PROC.concat(["pasa", "pasas", "vino", "tubos", "regaliz", "gomitas"]) }),
    sandia: v("Sandía", "sandía", 1, 2990, 4490, 6990, "watermelon", { hint: "Entera, de 6 a 8 kg", q: "sandia", not: PROC.concat(["trozo", "cubos", "picada"]), pack: { un: 1, g: 7000 } }),
    melon: v("Melón", "melón", 1, 1990, 2990, 3990, "melon", { q: "melon", not: PROC.concat(["tuna", "trozo", "cubos"]), pack: { un: 1, g: 1600 } }),
  });
})(typeof window !== "undefined" ? window : globalThis);
