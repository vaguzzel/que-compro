// Despensa, salsas, desayuno y endulzantes
(function (root) {
  var QC = root.QC;
  function d(name, cat, unit, min, avg, max, icon, extra) {
    var p = { name: name, cat: cat, unit: unit, step: 1, min: min, avg: avg, max: max, icon: icon };
    for (var k in extra) p[k] = extra[k];
    return p;
  }
  QC.addProducts({
    /* ---------- Despensa y salsas ---------- */
    arroz: d("Arroz", "despensa", "kg", 1190, 1690, 2290, "rice", { q: "arroz grado 1", must: ["arroz"], not: ["leche", "integral", "galleta", "sushi", "harina", "preparado"] }),
    aceite: d("Aceite vegetal", "despensa", "botella de 1 L", 1990, 2790, 3790, "oil", { plural: "botellas de 1 L", q: "aceite vegetal 1 litro", must: ["aceite"], not: ["oliva", "spray", "coco", "motor", "bebe"], pack: { ml: 1000 } }),
    aceite_oliva: d("Aceite de oliva", "despensa", "botella de 500 ml", 3990, 5490, 7990, "oil", { plural: "botellas de 500 ml", q: "aceite de oliva extra virgen", must: ["aceite", "oliva"], not: ["spray"], pack: { ml: 500 } }),
    sal_parrillera: d("Sal de mar parrillera", "despensa", "paquete", 990, 1490, 2290, "salt", { hint: "De ≈ 1 kg", q: "sal parrillera", must: ["sal", ["parrillera", "gruesa", "costal"]], pack: { g: 1000 } }),
    merken: d("Merkén", "despensa", "sobre", 690, 1190, 1790, "pepper", { hint: "Sobre de ≈ 30 g", q: "merken", pack: { g: 30 } }),
    oregano: d("Orégano", "despensa", "sobre", 390, 690, 1090, "herb", { hint: "Sobre de ≈ 15 g", q: "oregano", pack: { g: 15 } }),
    vinagre: d("Vinagre", "despensa", "botella", 690, 1090, 1690, "oil", { hint: "De ≈ 500 ml", q: "vinagre", not: ["balsamico", "manzana"], pack: { ml: 500 } }),
    mayonesa: d("Mayonesa", "despensa", "frasco", 1790, 2490, 3290, "jar", { hint: "De ≈ 400 g", q: "mayonesa", not: ["light", "vegana", "ajo", "palta", "sachet"], pack: { g: 400 } }),
    ketchup: d("Ketchup", "despensa", "envase", 1490, 1990, 2790, "sauce", { hint: "De ≈ 400 g", q: "ketchup", not: ["sachet"], pack: { g: 400 } }),
    mostaza: d("Mostaza", "despensa", "envase", 990, 1490, 2190, "sauce", { hint: "De ≈ 250 g", q: "mostaza", not: ["dijon", "miel", "sachet", "grano"], pack: { g: 250 } }),
    salsa_americana: d("Salsa americana", "despensa", "frasco", 1490, 1990, 2690, "jar", { hint: "De ≈ 300 g", q: "salsa americana", must: ["americana"], pack: { g: 300 } }),
    aji: d("Ají pebre", "despensa", "frasco", 990, 1490, 2190, "pepper", { hint: "De ≈ 200 g", q: "aji pebre", must: ["aji"], not: ["verde entero", "polvo", "merken", "papas"], pack: { g: 200 } }),
    chimichurri: d("Chimichurri", "despensa", "frasco", 1490, 1990, 2690, "herb", { hint: "De ≈ 200 g", q: "chimichurri", pack: { g: 200 } }),
    salsa_queso: d("Salsa de queso (para nachos)", "despensa", "frasco", 1990, 2690, 3490, "jar", { hint: "De ≈ 300 g", q: "salsa queso cheddar", must: ["salsa", ["queso", "cheddar"]], pack: { g: 300 } }),
    aceitunas: d("Aceitunas", "despensa", "frasco", 1490, 2290, 3290, "olive", { hint: "De ≈ 250 g drenado", q: "aceitunas", must: [["aceituna", "aceitunas"]], not: ["pasta", "aceite"], pack: { g: 250 } }),
    pepinillos: d("Pepinillos", "despensa", "frasco", 1490, 1990, 2690, "jar", { hint: "De ≈ 300 g", q: "pepinillos", must: [["pepinillo", "pepinillos"]], pack: { g: 300 } }),
    palmitos: d("Palmitos", "despensa", "tarro", 1990, 2790, 3790, "jar", { hint: "De ≈ 400 g", q: "palmitos", pack: { g: 400 } }),
    arvejas: d("Arvejas", "despensa", "tarro", 890, 1290, 1790, "jar", { hint: "De ≈ 300 g", q: "arvejas", not: ["congeladas"], pack: { g: 300 } }),
    mote_huesillo: d("Mote con huesillo (listo)", "postres", "botella de 1 L", 1990, 2690, 3490, "jar", { plural: "botellas de 1 L", q: "mote con huesillo", must: ["mote", "huesillo"], pack: { ml: 1000 } }),
    papel_aluminio: d("Papel aluminio", "bazar", "rollo", 1290, 1890, 2790, "foil", { q: "papel aluminio", must: ["aluminio"], not: ["bandeja", "molde"] }),

    /* ---------- Para untar ---------- */
    mermelada: d("Mermelada", "desayuno", "frasco", 1290, 1990, 2890, "jam", { hint: "De ≈ 250 g", q: "mermelada", not: ["light", "higo", "diet", "sachet"], pack: { g: 250 } }),
    mermelada_higo: d("Mermelada de higo", "desayuno", "frasco", 1990, 2990, 4290, "jam", { hint: "De ≈ 250 g", q: "mermelada higo", must: ["mermelada", "higo"], pack: { g: 250 } }),
    manjar: d("Manjar", "desayuno", "pote", 1490, 2190, 2990, "jar", { hint: "De ≈ 400 g", q: "manjar", not: ["galleta", "helado", "relleno", "alfajor", "tubo"], pack: { g: 400 } }),
    miel: d("Miel", "desayuno", "frasco", 3990, 5490, 7990, "honey", { hint: "De ≈ 500 g", q: "miel de abeja", must: ["miel"], not: ["mostaza", "cereal", "galleta", "cerveza"], pack: { g: 500 } }),
    crema_avellanas: d("Crema de avellanas", "desayuno", "frasco", 2990, 4290, 5990, "jar", { hint: "De ≈ 350 g", q: "crema de avellanas", must: ["avellana*"], not: ["galleta", "croissant", "relleno"], pack: { g: 350 } }),
    mantequilla_mani: d("Mantequilla de maní", "desayuno", "frasco", 2490, 3490, 4990, "jar", { hint: "De ≈ 340 g", q: "mantequilla de mani", must: ["mantequilla", "mani"], pack: { g: 340 } }),
    membrillo: d("Dulce de membrillo", "desayuno", "unidad", 1290, 1790, 2490, "jam", { plural: "unidades", hint: "De ≈ 400 g", q: "dulce de membrillo", must: ["membrillo"], pack: { g: 400 } }),

    /* ---------- Para tomar ---------- */
    te: d("Té negro", "desayuno", "caja", 790, 1290, 1990, "tea", { hint: "Caja de 20 bolsitas", q: "te negro 20 bolsitas", must: [["te", "tea"]], not: ["verde", "helado", "hierba", "hierbas", "manzanilla", "menta", "rooibos", "chai"], pack: { un: 20 } }),
    te_verde: d("Té verde", "desayuno", "caja", 1190, 1790, 2690, "tea", { hint: "Caja de 20 bolsitas", q: "te verde", must: [["te", "tea"], "verde"], pack: { un: 20 } }),
    te_hierbas: d("Infusión de hierbas", "desayuno", "caja", 990, 1490, 2290, "tea", { hint: "Caja de 20 bolsitas", q: "infusion hierbas", must: [["infusion", "hierbas", "manzanilla", "menta"]], not: ["verde"], pack: { un: 20 } }),
    cafe: d("Café instantáneo", "desayuno", "frasco", 3990, 5990, 8990, "coffee", { hint: "De ≈ 170 g", q: "cafe instantaneo", must: ["cafe", ["instantaneo", "soluble"]], not: ["capsula", "capsulas", "cappuccino", "mokaccino", "sobre"], pack: { g: 170 } }),
    cafe_molido: d("Café molido", "desayuno", "paquete", 3990, 5990, 8990, "coffee", { hint: "De ≈ 250 g", q: "cafe molido", must: ["cafe", "molido"], not: ["capsula"], pack: { g: 250 } }),
    cacao: d("Cacao en polvo para leche", "desayuno", "tarro", 2490, 3490, 4790, "chocolate", { hint: "De ≈ 400 g (tipo Milo o Nesquik)", q: "cacao polvo leche", must: [["cacao", "chocolate", "milo", "nesquik"]], not: ["amargo", "barra", "galleta"], pack: { g: 400 } }),
    azucar: d("Azúcar", "desayuno", "kg", 1090, 1490, 1990, "sugar", { q: "azucar blanca 1 kg", must: ["azucar"], not: ["flor", "rubia", "morena", "sin", "light", "glass"] }),
    endulzante_liquido: d("Endulzante líquido", "desayuno", "frasco", 1290, 1990, 2990, "sugar", { hint: "De ≈ 270 ml", q: "endulzante liquido", must: ["endulzante", "liquido"], pack: { ml: 270 } }),
    stevia: d("Stevia en sobres", "desayuno", "caja", 1990, 2990, 4290, "sugar", { hint: "Caja de ≈ 100 sobres", q: "stevia sobres", must: ["stevia"], not: ["liquido", "liquida", "planta"], pack: { un: 100 } }),
    sucralosa: d("Sucralosa en sobres", "desayuno", "caja", 1990, 2790, 3990, "sugar", { hint: "Caja de ≈ 100 sobres", q: "sucralosa sobres", must: ["sucralosa"], not: ["liquida", "liquido"], pack: { un: 100 } }),

    /* ---------- Desayuno ---------- */
    cereal: d("Cereal", "desayuno", "caja", 2490, 3490, 4990, "cereal", { hint: "De ≈ 400 g", q: "cereal", must: ["cereal"], not: ["barra", "barras"], pack: { g: 400 } }),
    granola: d("Granola", "desayuno", "bolsa", 2490, 3490, 4990, "cereal", { hint: "De ≈ 400 g", q: "granola", not: ["barra", "barras"], pack: { g: 400 } }),
    avena: d("Avena", "desayuno", "bolsa", 1290, 1790, 2490, "cereal", { hint: "De ≈ 800 g", q: "avena", must: ["avena"], not: ["bebida", "leche", "barra", "galleta"], pack: { g: 800 } })
  });
})(typeof window !== "undefined" ? window : globalThis);
