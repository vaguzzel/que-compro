// Íconos SVG con el mismo estilo que los de la página principal:
// relleno pastel, contorno café (#3B2218) redondeado y detalle blanco.
(function () {
  var FEP = window.FEP;
  var C = "#3B2218", PINK = "#F7A1C4", LAV = "#C9B6F2", MINT = "#BFE8D4", BUT = "#FFE9A8", BLUE = "#BFE0F7", W = "#FFFFFF";
  function a(fill, sw) {
    return ' fill="' + (fill || "none") + '" stroke="' + C + '" stroke-width="' + (sw || 2.4) + '" stroke-linejoin="round" stroke-linecap="round"';
  }
  var STAR = "M16 9.6l1.3 3 3.2.3-2.4 2.1.7 3.1-2.8-1.7-2.8 1.7.7-3.1-2.4-2.1 3.2-.3z";
  var HEART = "M16 17.6l-3.1-3a1.9 1.9 0 0 1 2.7-2.7l.4.4.4-.4a1.9 1.9 0 0 1 2.7 2.7z";

  function gear() {
    var pts = [], n = 8, ro = 13, ri = 10;
    for (var i = 0; i < n * 4; i++) {
      var ang = (i / (n * 4)) * Math.PI * 2 - Math.PI / 2, r = (i % 4 < 2) ? ro : ri;
      pts.push((16 + r * Math.cos(ang)).toFixed(2) + " " + (16 + r * Math.sin(ang)).toFixed(2));
    }
    return '<path d="M' + pts.join("L") + 'z"' + a(LAV) + '/><circle cx="16" cy="16" r="4"' + a(W, 2) + "/>";
  }

  var I = {
    flower: '<circle cx="16" cy="9" r="5"' + a(PINK) + '/><circle cx="22.7" cy="13.8" r="5"' + a(PINK) + '/><circle cx="20.1" cy="21.7" r="5"' + a(PINK) + '/>' +
      '<circle cx="11.9" cy="21.7" r="5"' + a(PINK) + '/><circle cx="9.3" cy="13.8" r="5"' + a(PINK) + '/><circle cx="16" cy="16" r="4.6"' + a(BUT) + "/>",
    book: '<path d="M16 9C12 6.5 7.5 6.5 4 8v17c3.5-1.5 8-1.5 12 1z"' + a(LAV) + '/><path d="M16 9c4-2.5 8.5-2.5 12-1v17c-3.5-1.5-8-1.5-12 1z"' + a(PINK) + "/>" +
      '<path d="M7.5 12.5c1.8-.5 3.5-.4 5 .3M7.5 16.5c1.8-.5 3.5-.4 5 .3M19.5 12.8c1.5-.7 3.2-.8 5-.3M19.5 16.8c1.5-.7 3.2-.8 5-.3"' + a(null, 1.5) + "/>",
    question: '<path d="M6 5.5h20a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H14l-6 5v-5H6a3 3 0 0 1-3-3v-11a3 3 0 0 1 3-3z"' + a(BUT) + "/>" +
      '<path d="M13.3 11.3a2.8 2.8 0 1 1 3.9 2.6c-.8.4-1.2.9-1.2 1.8v.5"' + a(null, 2.2) + '/><circle cx="16" cy="19.2" r="1.3" fill="' + C + '"/>',
    calc: '<rect x="7" y="4" width="18" height="24" rx="3.5"' + a(MINT) + '/><rect x="10" y="7.5" width="12" height="5" rx="1.5"' + a(W, 1.6) + "/>" +
      [[11.5, 17], [16, 17], [20.5, 17], [11.5, 22.5], [16, 22.5], [20.5, 22.5]].map(function (p) {
        return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.7"' + a(W, 1.3) + "/>";
      }).join(""),
    bulb: '<path d="M16 3.5a8.5 8.5 0 0 0-5 15.4c.9.7 1.5 1.8 1.5 2.9V23h7v-1.2c0-1.1.6-2.2 1.5-2.9A8.5 8.5 0 0 0 16 3.5z"' + a(BUT) + "/>" +
      '<rect x="12.5" y="23" width="7" height="5" rx="1.8"' + a(LAV) + '/><path d="M11.8 11.5a4.5 4.5 0 0 1 3.4-3.6"' + a(null, 1.8).replace(C, W) + "/>",
    cards: '<rect x="4" y="7" width="14" height="19" rx="2.8" transform="rotate(-12 11 16.5)"' + a(LAV) + "/>" +
      '<rect x="14" y="5.5" width="14" height="19" rx="2.8" transform="rotate(8 21 15)"' + a(PINK) + "/>" +
      '<path d="' + STAR + '" transform="translate(5 .6)"' + a(W, 1.2) + "/>",
    folder: '<path d="M4 10a2.5 2.5 0 0 1 2.5-2.5h6l2.5 3h10.5A2.5 2.5 0 0 1 28 13v11.5a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 4 24.5z"' + a(BUT) + "/>" +
      '<path d="' + HEART + '" transform="translate(0 2.5)"' + a(W, 1.4) + "/>",
    clipboard: '<rect x="6.5" y="6" width="19" height="22" rx="3"' + a(BLUE) + '/><rect x="11.5" y="3.5" width="9" height="5" rx="1.6"' + a(PINK, 2) + "/>" +
      '<path d="M10.5 15l2 2 3.5-3.5M10.5 22l2 2 3.5-3.5M19 16h3M19 23h3"' + a(null, 2) + "/>",
    alarm: '<path d="M5.4 10.6a4.5 4.5 0 0 1 6-6z"' + a(BUT, 2) + '/><path d="M26.6 10.6a4.5 4.5 0 0 0-6-6z"' + a(BUT, 2) + "/>" +
      '<circle cx="16" cy="17.5" r="10"' + a(PINK) + '/><circle cx="16" cy="17.5" r="6.8"' + a(W, 1.5) + '/><path d="M16 13.5v4.2l2.8 1.8"' + a(null, 2) + "/>",
    gear: gear(),
    dice: '<rect x="5.5" y="5.5" width="21" height="21" rx="5"' + a(LAV) + "/>" +
      [[11, 11], [16, 16], [21, 21], [21, 11], [11, 21]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.9" fill="' + W + '" stroke="' + C + '" stroke-width="1.2"/>'; }).join(""),
    sparkle: '<path d="M14 3.5c1 6.2 3.3 8.5 9.5 9.5-6.2 1-8.5 3.3-9.5 9.5-1-6.2-3.3-8.5-9.5-9.5 6.2-1 8.5-3.3 9.5-9.5z"' + a(BUT, 2.2) + "/>" +
      '<path d="M24 19c.5 3 1.5 4 4.5 4.5-3 .5-4 1.5-4.5 4.5-.5-3-1.5-4-4.5-4.5 3-.5 4-1.5 4.5-4.5z"' + a(PINK, 1.8) + "/>",
    sprout: '<path d="M16 28V16"' + a(null) + '/><path d="M16 19c-6 0-9.5-3.2-9.5-8.5 6 0 9.5 3.2 9.5 8.5z"' + a(MINT) + "/>" +
      '<path d="M16 16c0-5.3 3.5-8.5 9.5-8.5 0 5.3-3.5 8.5-9.5 8.5z"' + a(MINT) + "/>",
    flame: '<path d="M16 3.5c1.2 5.2 7.5 7.5 7.5 14.5a7.5 7.5 0 0 1-15 0c0-4 2.5-6.3 4.2-8.4.1 2.6 1 4 2.4 4.7C14.7 11 13.8 7.6 16 3.5z"' + a(PINK) + "/>" +
      '<path d="M16 17c2.2 2.2 3.3 3.4 3.3 5.3a3.3 3.3 0 0 1-6.6 0c0-1.9 1.4-3.2 3.3-5.3z"' + a(BUT, 1.8) + "/>",
    map: '<path d="M4 8.5l7-3 10 3 7-3v18l-7 3-10-3-7 3z"' + a(MINT) + '/><path d="M11 5.5v18M21 8.5v18"' + a(null, 1.8) + "/>" +
      '<path d="' + HEART + '" transform="translate(0 -1.5)"' + a(PINK, 1.3) + "/>",
    shuffle: '<path d="M4 10h5c6.5 0 8.5 12 15 12h3M4 22h5c6.5 0 8.5-12 15-12h3M23.5 6.5 27 10l-3.5 3.5M23.5 18.5 27 22l-3.5 3.5"' + a(null, 2.6) + "/>",
    download: '<path d="M12.5 4h7v9.5h4.5L16 21.5 8 13.5h4.5z"' + a(BUT, 2) + '/><rect x="5" y="23.5" width="22" height="4.5" rx="2.2"' + a(PINK, 2) + "/>",
    timer: '<rect x="13" y="3" width="6" height="4" rx="1.3"' + a(PINK, 2) + '/><circle cx="16" cy="18" r="10"' + a(BUT) + "/>" +
      '<path d="M16 18l4-4.5"' + a(null, 2.2) + '/><circle cx="16" cy="18" r="1.4" fill="' + C + '"/>',
    warn: '<path d="M16 4.5 28.5 26.5h-25z"' + a(BUT) + '/><path d="M16 12v7"' + a(null, 2.4) + '/><circle cx="16" cy="22.6" r="1.4" fill="' + C + '"/>',
    check: '<circle cx="16" cy="16" r="12"' + a(MINT) + '/><path d="M10.5 16.5l3.8 3.8 7.5-8"' + a(null, 2.6) + "/>",
    cross: '<circle cx="16" cy="16" r="12"' + a(PINK) + '/><path d="M11.5 11.5l9 9M20.5 11.5l-9 9"' + a(null, 2.6) + "/>",
    redo: '<path d="M24 12.5A9 9 0 1 0 25 20"' + a(null, 2.8) + '/><path d="M25.5 6v7h-7"' + a(null, 2.8) + "/>"
  };

  // FEP.icon("book") → <svg>; cls opcional para tamaños especiales
  FEP.icon = function (name, cls) {
    return '<svg class="ico' + (cls ? " " + cls : "") + '" viewBox="0 0 32 32" aria-hidden="true" focusable="false">' + (I[name] || I.flower) + "</svg>";
  };
})();
