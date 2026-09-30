// Panadería
(function (root) {
  var QC = root.QC;
  QC.addProducts({
    marraqueta: { name: "Marraqueta", cat: "panaderia", unit: "kg", step: 0.25, min: 1890, avg: 2490, max: 3290, icon: "marraqueta", hint: "≈ 10 unidades por kg", q: "marraqueta", not: ["integral", "congelada"] },
    hallulla: { name: "Hallulla", cat: "panaderia", unit: "kg", step: 0.25, min: 1890, avg: 2490, max: 3290, icon: "hallulla", hint: "≈ 10 unidades por kg", q: "hallulla", not: ["integral", "congelada"] },
    dobladita: { name: "Dobladita", cat: "panaderia", unit: "kg", step: 0.25, min: 2290, avg: 2890, max: 3690, icon: "hallulla", q: "dobladita" },
    pan_amasado: { name: "Pan amasado", cat: "panaderia", unit: "kg", step: 0.25, min: 2490, avg: 3190, max: 4290, icon: "hallulla", q: "pan amasado", must: ["amasado"] },
    colizas: { name: "Colizas", cat: "panaderia", unit: "kg", step: 0.25, min: 2290, avg: 2890, max: 3690, icon: "marraqueta", q: "coliza", must: [["coliza", "colizas"]] },
    frica: { name: "Pan frica", cat: "panaderia", unit: "kg", step: 0.25, min: 2190, avg: 2790, max: 3490, icon: "hallulla", hint: "El pan de hamburguesa", q: "pan frica", must: ["frica"] },
    pan_completo: { name: "Pan de completo", cat: "panaderia", unit: "pan", plural: "panes", step: 1, min: 180, avg: 290, max: 450, icon: "bun", hint: "Se venden sueltos o en bolsas de 6 a 10", q: "pan completo", must: ["completo"], not: ["integral", "combo", "arma"], pack: { un: 1, g: 60 } },
    pan_molde: { name: "Pan de molde blanco", cat: "panaderia", unit: "bolsa", step: 1, size: 0.6, min: 1990, avg: 2790, max: 3790, icon: "loaf", hint: "Bolsa de ≈ 600 g", q: "pan molde blanco", must: ["molde"], not: ["integral", "multigrano", "gluten", "hot dog", "hamburguesa", "borde", "bordes"], pack: { g: 600 } },
    pan_integral: { name: "Pan de molde integral", cat: "panaderia", unit: "bolsa", step: 1, size: 0.6, min: 2290, avg: 2990, max: 3990, icon: "loaf", hint: "Bolsa de ≈ 600 g", q: "pan molde integral", must: ["molde", "integral"], pack: { g: 600 } },
    pan_pita: { name: "Pan pita", cat: "panaderia", unit: "paquete", step: 1, size: 0.3, min: 1290, avg: 1790, max: 2490, icon: "hallulla", hint: "Paquete de ≈ 6 panes", q: "pan pita", must: [["pita", "arabe"]], pack: { g: 300 } },
    tostadas: { name: "Pan tostado", cat: "panaderia", unit: "paquete", step: 1, size: 0.2, min: 1290, avg: 1890, max: 2690, icon: "loaf", hint: "Paquete de ≈ 200 g", q: "pan tostado", must: [["tostado", "tostadas"]], not: ["crema", "rallado"], pack: { g: 200 } },
    croissant: { name: "Croissant", cat: "panaderia", unit: "croissant", plural: "croissants", step: 1, size: 0.07, min: 690, avg: 890, max: 1290, icon: "croissant", q: "croissant", not: ["relleno", "rellena", "mini", "sandwich", "jamon", "queso", "chocolate", "pistacho", "avellana", "manzana", "chicken"], pack: { un: 1, g: 70 } },
    baguette: { name: "Baguette", cat: "panaderia", unit: "baguette", step: 1, min: 990, avg: 1490, max: 2290, icon: "loaf", q: "baguette", not: ["ajo", "mini"], pack: { un: 1, g: 250 } },
    pan_ajo: { name: "Pan de ajo", cat: "panaderia", unit: "unidad", plural: "unidades", step: 1, min: 1490, avg: 2190, max: 2990, icon: "loaf", q: "pan de ajo", must: ["pan", "ajo"], not: ["tostado", "nudos", "knots", "queso", "salvado"] },
    panqueques: { name: "Panqueques", cat: "panaderia", unit: "paquete de 10", plural: "paquetes de 10", step: 1, min: 1990, avg: 2690, max: 3490, icon: "pancake", q: "panqueques", must: [["panqueque", "panqueques", "crepes"]], not: ["mezcla", "premezcla", "harina", "relleno", "torta", "pastel", "porciones", "personas"] },
    kuchen: { name: "Kuchen", cat: "postres", unit: "kuchen", step: 1, min: 5990, avg: 8490, max: 12990, icon: "cake", hint: "De 8 a 10 porciones", q: "kuchen", not: ["mezcla", "porcion", "molde", "pack"] },
    torta: { name: "Torta", cat: "postres", unit: "torta", step: 1, min: 12990, avg: 17990, max: 24990, icon: "cake", hint: "De 15 porciones", q: "torta 15 personas", must: ["torta"], not: ["porcion", "mezcla", "harina", "vela", "decoracion"] },
    muffins: { name: "Muffins", cat: "postres", unit: "paquete de 4", plural: "paquetes de 4", step: 1, min: 2490, avg: 3290, max: 4490, icon: "muffin", q: "muffin", must: [["muffin", "muffins", "queque"]], not: ["mezcla"] },
    brownies: { name: "Brownies", cat: "postres", unit: "caja", step: 1, min: 2990, avg: 3990, max: 5490, icon: "chocolate", hint: "Caja de ≈ 6 porciones", q: "brownie", must: [["brownie", "brownies"]], not: ["mezcla", "premezcla", "harina", "helado", "galleta", "queque"], pack: { g: 300 } }
  });
})(typeof window !== "undefined" ? window : globalThis);
