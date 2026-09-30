// Dibujos de los animales con sus zonas de corte, en el mismo estilo que los íconos.
// QC.diagram("vacuno", "entrana") → <svg> con la zona de la entraña resaltada en rosado.
(function (root) {
  var QC = root.QC = root.QC || {};
  var C = "#3B2218", PINK = "#F7A1C4", BUT = "#FFE9A8", CREAM = "#FFF8F3", W = "#FFFFFF", TAN = "#F5D3A6";

  function a(fill, sw) {
    return ' fill="' + (fill || "none") + '" stroke="' + C + '" stroke-width="' + (sw || 2.6) + '" stroke-linejoin="round" stroke-linecap="round"';
  }
  function poly(points) { return "M" + points.join("L") + "z"; }

  // Cada animal: cuerpo (donde se recortan las zonas), dibujo de fondo y de encima, y zonas.
  var A = {
    vacuno: {
      name: "Vaca",
      body: "M60 30 Q122 18 182 28 Q198 32 197 56 L195 86 Q192 98 178 98 L70 98 Q52 98 49 84 L45 52 Q46 34 60 30z",
      under:
        // patas
        '<rect x="60" y="86" width="15" height="34" rx="6"' + a(CREAM) + '/><rect x="82" y="86" width="15" height="32" rx="6"' + a(CREAM) + "/>" +
        '<rect x="152" y="86" width="15" height="32" rx="6"' + a(CREAM) + "/>" +
        '<path d="M60 112h15M82 110h15M152 110h15"' + a(null, 2.2) + "/>" +
        // cola
        '<path d="M195 40c10 4 12 18 8 34"' + a(null, 2.6) + '/><path d="M199 72c3-1 7 2 6 7-2 4-7 3-8 0z"' + a(TAN, 2.2) + "/>",
      over:
        // cabeza
        '<path d="M16 22c-6-2-10 2-8 7l9 2z"' + a(BUT, 2.2) + '/><path d="M44 22c6-2 10 2 8 7l-9 2z"' + a(BUT, 2.2) + "/>" +
        '<ellipse cx="11" cy="37" rx="7" ry="4.5" transform="rotate(-25 11 37)"' + a(CREAM, 2.2) + '/><ellipse cx="50" cy="37" rx="7" ry="4.5" transform="rotate(25 50 37)"' + a(CREAM, 2.2) + "/>" +
        '<path d="M14 32c0-8 7-13 16-13s16 5 16 13v14c0 9-7 15-16 15S14 55 14 46z"' + a(CREAM) + "/>" +
        '<ellipse cx="30" cy="52" rx="13" ry="8.5"' + a(PINK, 2.2) + '/><ellipse cx="25" cy="52" rx="1.8" ry="2.4" fill="' + C + '"/><ellipse cx="35" cy="52" rx="1.8" ry="2.4" fill="' + C + '"/>' +
        '<circle cx="23" cy="36" r="2.3" fill="' + C + '"/><circle cx="37" cy="36" r="2.3" fill="' + C + '"/>' +
        '<ellipse cx="19" cy="43" rx="2.6" ry="1.5" fill="' + PINK + '" opacity=".7"/><ellipse cx="41" cy="43" rx="2.6" ry="1.5" fill="' + PINK + '" opacity=".7"/>' +
        // pata trasera (garrón) encima del cuerpo
        "",
      zones: {
        cuello: poly(["40 10", "72 10", "72 55", "40 60"]),
        sobrecostilla: poly(["72 10", "94 10", "94 48", "72 52"]),
        lomo_vetado: poly(["94 10", "124 10", "124 44", "94 46"]),
        lomo_liso: poly(["124 10", "154 10", "154 42", "124 44"]),
        filete: poly(["126 44", "154 42", "152 51", "127 52"]),
        cadera: poly(["154 10", "205 10", "205 54", "152 51"]),
        pierna: poly(["152 51", "205 54", "205 105", "150 105"]),
        paleta: poly(["40 60", "72 55", "94 48", "94 72", "62 80", "40 76"]),
        pecho: poly(["40 76", "62 80", "94 72", "94 105", "40 105"]),
        plateada: poly(["94 46", "124 44", "118 60", "94 62"]),
        costillas: poly(["94 62", "118 60", "116 84", "94 86"]),
        entrana: poly(["124 44", "127 52", "124 90", "116 90", "118 60"]),
        vacio: poly(["127 52", "152 51", "150 105", "124 105", "124 90"]),
        malaya: poly(["94 86", "116 84", "124 90", "124 105", "94 105"])
      },
      // zonas que no están dentro del cuerpo (se dibujan sueltas)
      extra: { garron: '<rect x="174" y="86" width="15" height="34" rx="6"/>' },
      extraBase: '<rect x="174" y="86" width="15" height="34" rx="6"' + a(CREAM) + '/><path d="M174 112h15"' + a(null, 2.2) + "/>",
      labels: {
        cuello: "Cuello", sobrecostilla: "Sobrecostilla", lomo_vetado: "Lomo vetado", lomo_liso: "Lomo liso", filete: "Filete",
        cadera: "Cadera", pierna: "Pierna", paleta: "Paleta", pecho: "Pecho", plateada: "Plateada", costillas: "Costillas",
        entrana: "Diafragma", vacio: "Vacío (flanco)", malaya: "Malaya", garron: "Garrón trasero"
      }
    },
    cerdo: {
      name: "Cerdo",
      body: "M62 34 Q120 20 176 32 Q198 38 198 62 Q198 90 176 96 L74 96 Q52 94 48 72 Q46 42 62 34z",
      under:
        '<rect x="66" y="86" width="15" height="28" rx="6"' + a(PINK) + '/><rect x="86" y="86" width="15" height="26" rx="6"' + a(PINK) + "/>" +
        '<rect x="152" y="86" width="15" height="26" rx="6"' + a(PINK) + '/><rect x="172" y="86" width="15" height="28" rx="6"' + a(PINK) + "/>" +
        '<path d="M197 50c8-4 10 4 5 6s-4 8 3 6"' + a(null, 2.4) + "/>",
      over:
        '<path d="M20 26l-6-12 14 6zM44 26l6-12-14 6z"' + a(PINK, 2.2) + "/>" +
        '<path d="M12 44c0-12 9-20 20-20s20 8 20 20-9 20-20 20-20-8-20-20z"' + a("#FBC6D8") + "/>" +
        '<ellipse cx="32" cy="50" rx="10" ry="7"' + a(PINK, 2.2) + '/><ellipse cx="28.5" cy="50" rx="1.6" ry="2.2" fill="' + C + '"/><ellipse cx="35.5" cy="50" rx="1.6" ry="2.2" fill="' + C + '"/>' +
        '<circle cx="24" cy="38" r="2.3" fill="' + C + '"/><circle cx="40" cy="38" r="2.3" fill="' + C + '"/>',
      zones: {
        paleta: poly(["44 20", "90 20", "90 100", "44 100"]),
        lomo: poly(["90 20", "150 20", "150 50", "90 50"]),
        costillar: poly(["90 50", "150 50", "150 74", "90 74"]),
        panceta: poly(["90 74", "150 74", "150 100", "90 100"]),
        pierna: poly(["150 20", "205 20", "205 100", "150 100"])
      },
      labels: { paleta: "Paleta", lomo: "Lomo", costillar: "Costillar", panceta: "Panceta y malaya", pierna: "Pierna" }
    },
    cordero: {
      name: "Cordero",
      body: "M62 34 Q120 22 176 32 Q198 38 197 62 Q196 88 176 94 L74 94 Q52 92 48 72 Q46 42 62 34z",
      under:
        '<rect x="66" y="84" width="12" height="32" rx="5"' + a(TAN) + '/><rect x="86" y="84" width="12" height="30" rx="5"' + a(TAN) + "/>" +
        '<rect x="154" y="84" width="12" height="30" rx="5"' + a(TAN) + '/><rect x="174" y="84" width="12" height="32" rx="5"' + a(TAN) + "/>" +
        '<circle cx="199" cy="48" r="6"' + a(CREAM, 2.2) + "/>",
      over:
        '<ellipse cx="12" cy="36" rx="8" ry="4.5" transform="rotate(-20 12 36)"' + a(TAN, 2.2) + '/><ellipse cx="50" cy="36" rx="8" ry="4.5" transform="rotate(20 50 36)"' + a(TAN, 2.2) + "/>" +
        '<path d="M16 38c0-10 6-16 15-16s15 6 15 16v8c0 9-6 16-15 16s-15-7-15-16z"' + a(TAN) + "/>" +
        '<path d="M18 30c2-8 8-10 13-10s11 2 13 10c-3-2-6-2-8 0-2-3-8-3-10 0-2-2-5-2-8 0z"' + a(CREAM, 2.2) + "/>" +
        '<circle cx="25" cy="40" r="2.2" fill="' + C + '"/><circle cx="37" cy="40" r="2.2" fill="' + C + '"/><path d="M28 52c2 2 4 2 6 0"' + a(null, 2) + "/>",
      zones: {
        paleta: poly(["44 20", "92 20", "92 100", "44 100"]),
        lomo: poly(["92 20", "150 20", "150 52", "92 52"]),
        costillar: poly(["92 52", "150 52", "150 100", "92 100"]),
        pierna: poly(["150 20", "205 20", "205 100", "150 100"])
      },
      labels: { paleta: "Paleta", lomo: "Lomo", costillar: "Costillar", pierna: "Pierna" }
    },
    pollo: {
      name: "Pollo",
      body: "M60 40 Q70 20 104 22 Q150 24 170 44 Q186 60 178 80 Q168 100 128 102 L96 102 Q62 100 56 76 Q52 56 60 40z",
      under:
        '<path d="M166 40c10-12 22-14 30-8-4 2-6 6-4 10-6-4-14-2-20 6"' + a("#FBC6D8", 2.4) + "/>" +
        '<path d="M108 100v18M122 100v18M100 118h16M114 118h16"' + a(null, 2.8).replace(C, "#E7A84A") + "/>",
      over:
        '<path d="M38 18c2-8 10-10 14-4 4-6 12-4 12 2"' + a(PINK, 2.2) + "/>" +
        '<circle cx="46" cy="36" r="17"' + a(CREAM) + "/>" +
        '<path d="M28 38 18 42l10 4z"' + a(BUT, 2.2) + '/><path d="M34 46c-2 6 2 10 6 8"' + a(PINK, 2) + "/>" +
        '<circle cx="42" cy="32" r="2.4" fill="' + C + '"/>',
      zones: {
        pechuga: poly(["50 20", "110 20", "108 70", "96 104", "50 104"]),
        ala: "M92 52 Q120 40 146 50 Q150 66 128 74 Q104 76 92 64z",
        trutro: poly(["108 70", "190 60", "190 104", "96 104"])
      },
      labels: { pechuga: "Pechuga", ala: "Ala", trutro: "Trutro", todo: "Pollo entero" }
    },
    pescado: {
      name: "Pescado",
      body: "M30 60 Q70 22 130 26 Q170 30 188 60 Q170 90 130 94 Q70 98 30 60z",
      under: '<path d="M186 60 214 38v44z"' + a("#BFE0F7") + "/>" +
        '<path d="M100 28c10-14 30-16 40-4"' + a("#BFE0F7", 2.4) + "/>",
      over: '<circle cx="58" cy="54" r="4" fill="' + C + '"/><circle cx="59.5" cy="52.5" r="1.3" fill="' + W + '"/>' +
        '<path d="M78 40c8 12 8 28 0 40"' + a(null, 2.2) + '/><path d="M40 66c4 3 8 3 12 1"' + a(null, 2) + "/>",
      zones: { filete: "M80 36 Q130 26 176 56 L176 64 Q130 94 80 84z" },
      labels: { filete: "Filete (costado)" }
    }
  };

  // QC.diagram(animal, zona) → SVG. Con zona "todo" se resalta el cuerpo completo.
  QC.diagram = function (animal, zone) {
    var d = A[animal];
    if (!d) return "";
    var id = "clip-" + animal + "-" + (zone || "x");
    var zones = Object.keys(d.zones).map(function (z) {
      var on = zone === z || zone === "todo";
      return '<path d="' + d.zones[z] + '" fill="' + (on ? PINK : "#FFF8F3") + '" stroke="' + C + '" stroke-width="' + (on ? 2.4 : 1.4) + '"' + (on ? "" : ' stroke-dasharray="3 4" stroke-opacity=".55"') + ' stroke-linejoin="round"/>';
    }).join("");
    var extra = "";
    if (d.extraBase) extra = d.extraBase;
    if (d.extra && d.extra[zone]) extra += d.extra[zone].replace("/>", ' fill="' + PINK + '" stroke="' + C + '" stroke-width="2.6"/>');
    var label = zone && d.labels[zone] ? d.labels[zone] : "";
    return '<svg class="diagram" viewBox="0 0 220 125" role="img" aria-label="' + d.name + (label ? ": zona " + label.toLowerCase() : "") + '">' +
      '<defs><clipPath id="' + id + '"><path d="' + d.body + '"/></clipPath></defs>' +
      d.under + extra +
      '<path d="' + d.body + '" fill="' + CREAM + '"/>' +
      '<g clip-path="url(#' + id + ')">' + zones + "</g>" +
      '<path d="' + d.body + '"' + a(null, 2.8) + "/>" +
      d.over + "</svg>";
  };

  QC.diagramLabel = function (animal, zone) {
    var d = A[animal];
    return d && zone && d.labels[zone] ? d.labels[zone] : "";
  };
  QC.diagramZones = function (animal) {
    var d = A[animal];
    return d ? Object.keys(d.zones).concat(Object.keys(d.extra || {})).concat(animal === "pollo" ? ["todo"] : []) : [];
  };
})(typeof window !== "undefined" ? window : globalThis);
