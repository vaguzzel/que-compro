// Fiambrería, quesos y lácteos
(function (root) {
  var QC = root.QC;
  function fi(name, min, avg, max, icon, extra) {
    var p = { name: name, cat: "fiambreria", unit: "kg", step: 0.25, min: min, avg: avg, max: max, icon: icon };
    for (var k in extra) p[k] = extra[k];
    return p;
  }
  QC.addProducts({
    /* ---------- Fiambres (por kg, se piden por cuarto) ---------- */
    jamon_pierna: fi("Jamón de pierna", 7990, 10490, 13990, "ham", { hint: "Pide por cuarto (250 g)", q: "jamon pierna", must: ["jamon", "pierna"], not: ["serrano", "acaramelado"] }),
    jamon_pavo: fi("Jamón de pavo", 6990, 8990, 11990, "ham", { q: "jamon pavo", must: ["jamon", "pavo"], not: ["pechuga", "acaramelado", "ahumado"] }),
    jamon_acaramelado: fi("Jamón acaramelado", 8990, 11490, 14990, "ham", { q: "jamon acaramelado", must: ["jamon", "acaramelado"] }),
    pechuga_pavo: fi("Pechuga de pavo", 9990, 12990, 16990, "ham", { q: "pechuga pavo laminada", must: ["pechuga", "pavo"], not: ["cruda", "entera"] }),
    jamon_serrano: fi("Jamón serrano", 24990, 34990, 49990, "ham", { hint: "Viene en sobres de 100 g", q: "jamon serrano", must: ["serrano"] }),
    prosciutto: fi("Prosciutto", 29990, 39990, 59990, "ham", { hint: "Viene en sobres de 80 a 100 g", q: "prosciutto", must: [["prosciutto", "crudo"]] }),
    salame: fi("Salame", 12990, 16990, 22990, "ham", { q: "salame", must: [["salame", "salami"]] }),
    mortadela: fi("Mortadela", 4990, 6990, 8990, "ham", { q: "mortadela" }),
    tocino: fi("Tocino laminado", 9990, 13990, 17990, "bacon", { q: "tocino laminado", must: ["tocino"], not: ["bits", "trozos", "cubos"] }),
    pate: { name: "Paté", cat: "fiambreria", unit: "pote", step: 1, min: 690, avg: 990, max: 1490, icon: "jar", hint: "De 100 a 125 g", q: "pate", must: ["pate"], pack: { g: 110 } },

    /* ---------- Quesos ---------- */
    queso_gauda: fi("Queso gauda", 8990, 11490, 14990, "cheese", { q: "queso gauda", must: ["gauda"], not: ["rallado"] }),
    queso_mantecoso: fi("Queso mantecoso", 8490, 10990, 13990, "cheese", { q: "queso mantecoso", must: ["mantecoso"] }),
    queso_chanco: fi("Queso chanco", 8490, 10990, 13990, "cheese", { q: "queso chanco", must: ["chanco"] }),
    queso_cheddar: { name: "Queso cheddar laminado", cat: "fiambreria", unit: "paquete", step: 1, min: 1990, avg: 2790, max: 3790, icon: "cheese", hint: "≈ 10 láminas (180 a 200 g)", q: "queso cheddar laminado", must: ["cheddar"], not: ["salsa", "rallado"], pack: { g: 190 } },
    queso_crema: { name: "Queso crema", cat: "lacteos", unit: "pote", step: 1, min: 1690, avg: 2290, max: 2990, icon: "jar", hint: "De ≈ 200 g", q: "queso crema", must: ["queso", "crema"], pack: { g: 200 } },
    quesillo: { name: "Quesillo", cat: "lacteos", unit: "quesillo", step: 1, size: 0.25, min: 1590, avg: 2090, max: 2790, icon: "cheese", hint: "De 250 g", q: "quesillo", pack: { g: 250 } },
    queso_brie: { name: "Queso brie", cat: "fiambreria", unit: "unidad", plural: "unidades", step: 1, size: 0.125, min: 3490, avg: 4490, max: 5990, icon: "cheese", hint: "De ≈ 125 g", q: "queso brie", must: ["brie"], pack: { g: 125 } },
    queso_camembert: { name: "Queso camembert", cat: "fiambreria", unit: "unidad", plural: "unidades", step: 1, size: 0.125, min: 3490, avg: 4490, max: 5990, icon: "cheese", hint: "De ≈ 125 g", q: "queso camembert", must: ["camembert"], pack: { g: 125 } },
    queso_cabra: { name: "Queso de cabra", cat: "fiambreria", unit: "unidad", plural: "unidades", step: 1, size: 0.15, min: 3290, avg: 4290, max: 5990, icon: "cheese", hint: "De ≈ 150 g", q: "queso de cabra", must: ["cabra"], pack: { g: 150 } },
    queso_azul: { name: "Queso azul", cat: "fiambreria", unit: "unidad", plural: "unidades", step: 1, size: 0.15, min: 2990, avg: 3990, max: 5490, icon: "cheese", hint: "De ≈ 150 g", q: "queso azul", must: [["azul", "roquefort"]], pack: { g: 150 } },
    queso_parmesano: { name: "Queso parmesano (trozo)", cat: "fiambreria", unit: "trozo", step: 1, size: 0.2, min: 3990, avg: 5490, max: 7990, icon: "cheese", hint: "De ≈ 200 g", q: "queso parmesano", must: [["parmesano", "reggianito", "grana"]], not: ["rallado"], pack: { g: 200 } },
    mozzarella: { name: "Queso mozzarella", cat: "fiambreria", unit: "kg", step: 0.25, min: 7990, avg: 9990, max: 12990, icon: "cheese", q: "queso mozzarella", must: ["mozzarella"], not: ["bocconcini", "palitos", "rallado", "apanados", "granulado", "granulada", "hebras", "burrata", "bufala", "ciliegine", "ovoline", "fresca", "laminado"] }
  });
})(typeof window !== "undefined" ? window : globalThis);
