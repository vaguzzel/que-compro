// Desechables, fuego y bazar
(function (root) {
  var QC = root.QC;
  function z(name, unit, min, avg, max, icon, extra) {
    var p = { name: name, cat: "bazar", unit: unit, step: 1, min: min, avg: avg, max: max, icon: icon };
    for (var k in extra) p[k] = extra[k];
    return p;
  }
  QC.addProducts({
    carbon: z("Carbón", "saco de 5 kg", 4990, 6490, 8490, "charcoal", { plural: "sacos de 5 kg", hint: "Uno por cada 8 personas", q: "carbon vegetal", must: ["carbon"], not: ["activado", "briquetas"], pack: { g: 5000 } }),
    briquetas: z("Briquetas", "bolsa de 4 kg", 4490, 5990, 7990, "charcoal", { plural: "bolsas de 4 kg", hint: "Duran más que el carbón", q: "briquetas", must: [["briqueta", "briquetas"]], pack: { g: 4000 } }),
    lena: z("Leña", "malla", 2990, 3990, 5490, "wood", { hint: "Malla de ≈ 10 kg", q: "leña", must: ["lena"], not: ["pizza"], pack: { g: 10000 } }),
    encendedor: z("Encendedor de carbón", "unidad", 990, 1590, 2490, "flame", { plural: "unidades", hint: "Líquido, gel o pastillas", q: "encendedor carbon", must: [["encendedor", "iniciador", "pastillas"]], not: ["cigarro", "cocina"] }),
    fosforos: z("Fósforos", "paquete", 490, 890, 1290, "matches", { hint: "Paquete de 10 cajas", q: "fosforos", must: [["fosforos", "fosforo"]], pack: { un: 1 } }),
    servilletas: z("Servilletas", "paquete", 690, 1090, 1590, "napkin", { hint: "Paquete de ≈ 100", q: "servilletas", must: ["servilleta*"], not: ["humedas"], pack: { un: 100 } }),
    toalla_papel: z("Toalla de papel", "paquete", 1990, 2790, 3990, "napkin", { hint: "Paquete de 3 rollos", q: "toalla de papel", must: ["toalla", "papel"], not: ["humeda"] }),
    platos: z("Platos desechables", "paquete", 1490, 2090, 2990, "tableware", { hint: "Paquete de ≈ 20", q: "platos desechables", must: [["plato", "platos"]], not: ["porcelana", "vidrio", "melamina", "hondo"], pack: { un: 20 } }),
    vasos: z("Vasos desechables", "paquete", 990, 1490, 2190, "cup", { hint: "Paquete de ≈ 25", q: "vasos desechables", must: [["vaso", "vasos"]], not: ["vidrio", "cristal", "termico"], pack: { un: 25 } }),
    cubiertos: z("Cubiertos desechables", "paquete", 1290, 1790, 2490, "cutlery", { hint: "Paquete de ≈ 24", q: "cubiertos desechables", must: [["cubiertos", "tenedores"]], not: ["acero", "set"], pack: { un: 24 } }),
    mantel: z("Mantel desechable", "unidad", 990, 1590, 2490, "napkin", { plural: "unidades", q: "mantel desechable", must: ["mantel"], not: ["tela", "hule"] }),
    bolsas_basura: z("Bolsas de basura", "rollo", 990, 1490, 2190, "trash", { hint: "Rollo de ≈ 10 bolsas grandes", q: "bolsas de basura", must: [["bolsa", "bolsas"], "basura"] }),
    velas: z("Velas de cumpleaños", "paquete", 590, 1090, 1990, "cake", { q: "velas cumpleaños", must: [["vela", "velas"]], not: ["aromatica", "numero"] }),
    vela_numero: z("Vela con número", "unidad", 990, 1490, 2490, "cake", { plural: "unidades", q: "vela numero", must: ["vela", "numero"] }),
    globos: z("Globos", "bolsa", 990, 1590, 2490, "balloon", { hint: "Bolsa de ≈ 25", q: "globos", must: [["globo", "globos"]], not: ["metalico", "helio"], pack: { un: 25 } }),
    gorritos: z("Gorritos de cumpleaños", "paquete", 990, 1590, 2490, "party", { hint: "Paquete de ≈ 6", q: "gorros cumpleaños", must: [["gorro", "gorros", "gorritos"]], pack: { un: 6 } })
  });
})(typeof window !== "undefined" ? window : globalThis);
