// Snacks, galletas, dulces y congelados para picoteo
(function (root) {
  var QC = root.QC;
  function s(name, unit, min, avg, max, icon, extra) {
    var p = { name: name, cat: "snacks", unit: unit, step: 1, min: min, avg: avg, max: max, icon: icon, tol: [0.4, 2.6] };
    for (var k in extra) p[k] = extra[k];
    return p;
  }
  QC.addProducts({
    papas_fritas: s("Papas fritas lisas", "bolsa", 1990, 2790, 3690, "chips", { hint: "Bolsa de ≈ 380 g", q: "papas fritas", must: ["papas", "fritas"], not: ["congeladas", "prefritas", "onduladas", "corte"], pack: { g: 380 } }),
    papas_onduladas: s("Papas fritas onduladas", "bolsa", 1990, 2790, 3690, "chips", { hint: "Bolsa de ≈ 250 g", q: "papas fritas onduladas", must: ["onduladas"], pack: { g: 250 } }),
    ramitas: s("Ramitas", "bolsa", 990, 1490, 2090, "chips", { hint: "Bolsa de ≈ 250 g", q: "ramitas", pack: { g: 250 } }),
    suflitos: s("Suflitos", "bolsa", 990, 1390, 1990, "chips", { hint: "Bolsa de ≈ 150 g", q: "suflitos", must: [["suflitos", "suflito", "suflés", "sufles"]], pack: { g: 150 } }),
    nachos: s("Nachos (tortilla chips)", "bolsa", 1490, 2190, 2990, "chips", { hint: "Bolsa de ≈ 250 g", q: "nachos tortilla", must: [["nachos", "tortilla", "doritos"]], pack: { g: 250 } }),
    cabritas: s("Cabritas", "bolsa", 790, 1190, 1790, "popcorn", { hint: "Bolsa lista de ≈ 100 g o para microondas", q: "cabritas", must: [["cabritas", "popcorn", "palomitas"]], pack: { g: 100 } }),
    mani: s("Maní salado", "bolsa", 1490, 2190, 2990, "peanut", { hint: "Bolsa de ≈ 400 g", q: "mani salado", must: ["mani"], not: ["mantequilla", "confitado", "chocolate", "japones"], pack: { g: 400 } }),
    frutos_secos: s("Mix de frutos secos", "bolsa", 2990, 4290, 5990, "peanut", { hint: "Bolsa de ≈ 400 g", q: "mix frutos secos", must: [["mix", "mezcla", "frutos"]], not: ["barra", "cereal"], pack: { g: 400 } }),
    galletas_saladas: s("Galletas saladas", "paquete", 690, 1090, 1590, "cookie", { hint: "Tipo agua o soda", q: "galletas soda", must: [["galleta", "galletas"], ["soda", "agua", "saladas", "saltin", "crackers"]], pack: { g: 200 } }),
    galletas_tabla: s("Galletas para tabla", "caja", 1790, 2690, 3790, "cookie", { hint: "Crackers o grissini, ≈ 200 g", q: "crackers", must: [["crackers", "grissini", "tostaditas", "galletas finas"]], pack: { g: 200 } }),
    galletas_dulces: s("Galletas dulces", "paquete", 790, 1290, 1890, "cookie", { q: "galletas dulces", must: [["galleta", "galletas"]], not: ["soda", "agua", "saladas", "crackers", "perro", "gato"], pack: { g: 150 } }),
    chocolates: s("Chocolates", "bolsa", 1990, 2990, 4490, "chocolate", { hint: "Bolsa surtida de ≈ 200 g", q: "chocolates surtidos", must: ["chocolate*"], not: ["leche en polvo", "galleta", "helado", "cacao", "bebida"], pack: { g: 200 } }),
    gomitas: s("Gomitas", "bolsa", 990, 1490, 2190, "candy", { hint: "Bolsa de ≈ 200 g", q: "gomitas", must: [["gomitas", "gomita", "gomas"]], pack: { g: 200 } }),
    alfajores: s("Alfajores", "caja", 1990, 2990, 4290, "cookie", { hint: "Caja de ≈ 6", q: "alfajores", must: [["alfajor", "alfajores"]] }),
    empanaditas: { name: "Empanaditas de queso (congeladas)", cat: "congelados", unit: "caja", step: 1, min: 2990, avg: 3990, max: 5490, icon: "empanada", hint: "Caja de ≈ 12 cóctel", q: "empanadas coctel queso", must: [["empanada", "empanadas", "empanaditas"], "queso"], not: ["masa", "tapas"] },
    mini_pizzas: { name: "Mini pizzas (congeladas)", cat: "congelados", unit: "caja", step: 1, min: 2990, avg: 3990, max: 5290, icon: "pizza", hint: "Caja de ≈ 8 a 12", q: "mini pizzas", must: ["pizza*"], not: ["masa", "salsa", "familiar", "horno"] },
    papas_congeladas: { name: "Papas prefritas congeladas", cat: "congelados", unit: "bolsa", step: 1, min: 1990, avg: 2790, max: 3790, icon: "potato", hint: "Bolsa de ≈ 1 kg", q: "papas prefritas congeladas", must: ["papas", ["prefritas", "congeladas", "fritas"]], not: ["chips", "lisas", "onduladas"], pack: { g: 1000 } },
    helado: { name: "Helado", cat: "postres", unit: "L", step: 1, min: 2490, avg: 3690, max: 5490, icon: "icecream", hint: "Potes de 1 L", q: "helado 1 litro", must: ["helado"], not: ["paleta", "cono", "barquillo", "mix", "polvo"] }
  });
})(typeof window !== "undefined" ? window : globalThis);
