// Lácteos, huevos y refrigerados
(function (root) {
  var QC = root.QC;
  QC.addProducts({
    huevos: { name: "Huevos", cat: "lacteos", unit: "huevo", step: 6, min: 180, avg: 250, max: 350, icon: "egg", hint: "Bandejas de 6, 12 o 30", q: "huevos", must: [["huevo", "huevos"]], not: ["chocolate", "pascua", "codorniz", "liquido"], pack: { un: 1 } },
    mantequilla: { name: "Mantequilla", cat: "lacteos", unit: "pan de 250 g", plural: "panes de 250 g", step: 1, min: 2490, avg: 3290, max: 4290, icon: "butter", q: "mantequilla 250 g", must: ["mantequilla"], not: ["mani", "galleta", "cacao"], pack: { g: 250 } },
    margarina: { name: "Margarina", cat: "lacteos", unit: "pote", step: 1, min: 1190, avg: 1690, max: 2290, icon: "butter", hint: "De ≈ 250 g", q: "margarina", pack: { g: 250 } },
    leche: { name: "Leche entera", cat: "lacteos", unit: "L", step: 1, min: 890, avg: 1190, max: 1590, icon: "milk", hint: "Cajas de 1 L", q: "leche entera 1 litro", must: ["leche", "entera"], not: ["polvo", "condensada", "evaporada", "chocolate", "frutilla", "vainilla", "sin lactosa"] },
    leche_descremada: { name: "Leche descremada", cat: "lacteos", unit: "L", step: 1, min: 890, avg: 1190, max: 1590, icon: "milk", hint: "Cajas de 1 L", q: "leche descremada 1 litro", must: ["leche", "descremada"], not: ["polvo", "chocolate", "sin lactosa"] },
    leche_sin_lactosa: { name: "Leche sin lactosa", cat: "lacteos", unit: "L", step: 1, min: 1090, avg: 1390, max: 1790, icon: "milk", hint: "Cajas de 1 L", q: "leche sin lactosa", must: ["leche", "lactosa"], not: ["polvo", "chocolate", "frutilla"] },
    leche_vegetal: { name: "Bebida vegetal (avena o almendra)", cat: "lacteos", unit: "L", step: 1, min: 1690, avg: 2290, max: 3290, icon: "milk", hint: "Cajas de 1 L", q: "bebida vegetal avena", must: [["avena", "almendra", "almendras"]], not: ["hojuelas", "galleta", "barra", "cereal"] },
    yogur: { name: "Yogur", cat: "lacteos", unit: "yogur", plural: "yogures", step: 1, min: 290, avg: 450, max: 690, icon: "yogurt", hint: "Pote de ≈ 120 g", q: "yogur", must: [["yogur", "yoghurt", "yogurt"]], not: ["griego", "1 kg", "litro", "bebible", "polvo"], pack: { un: 1, g: 120 } },
    yogur_griego: { name: "Yogur griego", cat: "lacteos", unit: "pote", step: 1, min: 1490, avg: 2090, max: 2990, icon: "yogurt", hint: "De ≈ 500 g", q: "yogur griego", must: [["yogur", "yoghurt", "yogurt"], "griego"], pack: { g: 500 } },
    crema: { name: "Crema de leche", cat: "lacteos", unit: "caja", step: 1, min: 990, avg: 1390, max: 1890, icon: "milk", hint: "De ≈ 200 ml", q: "crema de leche", must: ["crema", "leche"], not: ["polvo", "helado", "batida"], pack: { ml: 200 } },
    chucrut: { name: "Chucrut", cat: "despensa", unit: "frasco", step: 1, min: 1490, avg: 1990, max: 2690, icon: "cabbage", hint: "De ≈ 500 g", q: "chucrut", pack: { g: 500 } },
    salsa_verde: { name: "Salsa verde", cat: "lacteos", unit: "pote", step: 1, min: 990, avg: 1490, max: 2190, icon: "herb", hint: "Pote de ≈ 200 g (refrigerados)", q: "salsa verde", must: ["salsa", "verde"], pack: { g: 200 } },
    guacamole: { name: "Guacamole", cat: "lacteos", unit: "pote", step: 1, min: 1990, avg: 2690, max: 3490, icon: "avocado", hint: "Pote de ≈ 200 g", q: "guacamole", pack: { g: 200 } },
    hummus: { name: "Hummus", cat: "lacteos", unit: "pote", step: 1, min: 1990, avg: 2590, max: 3490, icon: "jar", hint: "Pote de ≈ 200 g", q: "hummus", pack: { g: 200 } }
  });
})(typeof window !== "undefined" ? window : globalThis);
