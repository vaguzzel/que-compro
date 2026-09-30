// Íconos SVG con el mismo estilo que los del portafolio (fep/js/icons.js):
// relleno pastel, contorno café (#3B2218) redondeado y detalle blanco.
(function (root) {
  var QC = root.QC = root.QC || {};
  var C = "#3B2218", PINK = "#F7A1C4", LAV = "#C9B6F2", MINT = "#BFE8D4", BUT = "#FFE9A8", BLUE = "#BFE0F7", W = "#FFFFFF";
  // Tonos extra para comida, dentro de la misma familia pastel
  var TAN = "#F5D3A6", CORAL = "#F9A99B", CREAM = "#FFF8F3", LEAF = "#A9DDB9";
  function a(fill, sw) {
    return ' fill="' + (fill || "none") + '" stroke="' + C + '" stroke-width="' + (sw || 2.4) + '" stroke-linejoin="round" stroke-linecap="round"';
  }
  function dots(list, r, fill, sw) {
    return list.map(function (p) {
      return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '"' + (sw ? a(fill, sw) : ' fill="' + fill + '"') + "/>";
    }).join("");
  }
  var HEART = "M16 17.6l-3.1-3a1.9 1.9 0 0 1 2.7-2.7l.4.4.4-.4a1.9 1.9 0 0 1 2.7 2.7z";

  var I = {
    /* ---------- Escenarios ---------- */
    grill: '<path d="M11 8.5c-1-1.5 1-2.5 0-4.5M16 8.5c-1-1.5 1-2.5 0-4.5M21 8.5c-1-1.5 1-2.5 0-4.5"' + a(null, 1.8) + "/>" +
      '<rect x="8" y="10.2" width="16" height="3.6" rx="1.8"' + a(CORAL, 2) + "/>" +
      '<path d="M10 20.5l-3 7.5M22 20.5l3 7.5M16 22v6"' + a(null, 2.4) + "/>" +
      '<path d="M4.5 14h23a11.5 9 0 0 1-23 0z"' + a(PINK) + "/>" +
      '<path d="M9 17.5c1.5 1.6 3.6 2.4 5.5 2.6"' + a(null, 1.8).replace(C, W) + "/>",
    breadBasket: '<ellipse cx="16" cy="12.5" rx="9.5" ry="5.5"' + a(TAN) + "/>" +
      '<path d="M12 10.5l1.5 2.5M16 9.5l1.5 2.5M20 10.5l1.5 2.5"' + a(null, 1.6) + "/>" +
      '<path d="M4 15h24l-2.4 11.2a2 2 0 0 1-2 1.6H8.4a2 2 0 0 1-2-1.6z"' + a(BUT) + "/>" +
      '<path d="M10.5 15l1 12.6M16 15v12.6M21.5 15l-1 12.6M5.2 20.8h21.6"' + a(null, 1.6) + "/>",
    party: '<path d="M16 5.5 25 27c-5.6 1.8-12.4 1.8-18 0z"' + a(PINK) + "/>" +
      '<path d="M13.4 11.6c1.8.6 3.4.6 5.2 0M11 17.6c3.3 1 6.7 1 10 0M8.8 23c4.6 1.3 9.8 1.3 14.4 0"' + a(null, 1.8).replace(C, W) + "/>" +
      '<circle cx="16" cy="4.6" r="2.6"' + a(BUT, 2) + "/>" +
      '<path d="M4.5 9l2 1.5M27.5 9l-2 1.5M5 15.5h2.5M27 15.5h-2.5"' + a(null, 1.8) + "/>",

    /* ---------- Carnes ---------- */
    steak: '<path d="M7 9.5c3.5-4 11-5 16-2.5 4.5 2.3 5.5 7.5 3.5 11.5-2 4-5 5-8 7.5-3.5 3-9 3.5-12 .5-3-3-3-7.5-1.5-10.5 1-2 1.2-4 2-6.5z"' + a(CORAL) + "/>" +
      '<path d="M10 10.5c3.2-2.8 9-3.6 12.6-1.8M24 12.5c.8 2 .6 4-.4 5.8"' + a(null, 1.8).replace(C, W) + "/>" +
      '<circle cx="12.5" cy="19" r="3.2"' + a(W, 2) + "/>",
    ribs: '<rect x="3" y="9" width="9" height="3.4" rx="1.7"' + a(W, 2) + '/><rect x="3" y="14.3" width="9" height="3.4" rx="1.7"' + a(W, 2) + "/>" +
      '<rect x="3" y="19.6" width="9" height="3.4" rx="1.7"' + a(W, 2) + "/>" +
      '<rect x="8.5" y="6" width="20" height="20" rx="5.5"' + a(CORAL) + "/>" +
      '<path d="M13 12.5l5-4M17.5 19l6.5-5.5M13.5 23l4-3.4"' + a(null, 1.8) + "/>",
    chickenLeg: '<circle cx="6.8" cy="22.6" r="2.4"' + a(W, 2) + '/><circle cx="9.4" cy="25.2" r="2.4"' + a(W, 2) + "/>" +
      '<path d="M15.5 16.5 9 23"' + a(null, 6.2) + '/><path d="M15.5 16.5 9 23" fill="none" stroke="' + W + '" stroke-width="2.6" stroke-linecap="round"/>' +
      '<ellipse cx="19.6" cy="12.4" rx="8.6" ry="7" transform="rotate(-40 19.6 12.4)"' + a(TAN) + "/>" +
      '<path d="M16 10.5c1-2.4 3-4 5.6-4.4"' + a(null, 1.8).replace(C, W) + "/>",
    sausage: '<path d="M5.2 9.5c1.8 8.2 9 13.8 18.6 13.4a3.2 3.2 0 0 0 .3-6.4c-6.7-.2-11.2-4-12.5-8.4a3.3 3.3 0 0 0-6.4 1.4z"' + a(CORAL) + "/>" +
      '<path d="M8.8 10.8c1.8 4 5.2 6.8 9.6 8"' + a(null, 1.8).replace(C, W) + "/>" +
      '<path d="M6.8 5.4 5.6 3.6M27 19.6l2 .6"' + a(null, 2) + "/>",

    /* ---------- Verduras y frutas ---------- */
    corn: '<path d="M16 28.5c-6.2-2.8-8.4-8.8-7.2-15.2 2 3 4.4 6 7.2 8z"' + a(LEAF) + "/>" +
      '<ellipse cx="16" cy="13" rx="5.6" ry="10"' + a(BUT) + "/>" +
      '<path d="M12.6 8.6h6.8M10.9 12.6h10.2M11.3 16.6h9.4M16 3.4v18.2"' + a(null, 1.4) + "/>" +
      '<path d="M16 28.5c6.2-2.8 8.4-8.8 7.2-15.2-2 3-4.4 6-7.2 8z"' + a(LEAF) + "/>",
    mushroom: '<path d="M12 17h8l1 8.6a2 2 0 0 1-2 2.2h-6a2 2 0 0 1-2-2.2z"' + a(CREAM) + "/>" +
      '<path d="M4 17.2a12 11 0 0 1 24 0z"' + a(TAN) + "/>" +
      dots([[10, 12.4], [16.4, 9.2], [21.8, 13]], 1.8, W, 1.4),
    zucchini: '<path d="M6.5 24.5c-2-2-1.2-5 1.5-7.4l9.6-8.4c2.6-2.3 5.6-3.2 7.6-1.2s1.1 5-1.2 7.6l-8.4 9.6c-2.4 2.7-5.4 3.5-7.4 1.5z"' + a(LEAF) + "/>" +
      '<path d="M24.5 7.5l2.2-2.2"' + a(null, 3) + '/><path d="M10 20.5l9.8-9.4"' + a(null, 1.8).replace(C, W) + "/>",
    avocado: '<path d="M16 3.5c-3 0-4.5 3.5-5.5 7-.8 2.8-4 5-4 10a9.5 9.5 0 0 0 19 0c0-5-3.2-7.2-4-10-1-3.5-2.5-7-5.5-7z"' + a(LEAF) + "/>" +
      '<path d="M16 7.6c-1.8 0-2.8 2.6-3.4 5-.6 2.2-3.2 4-3.2 7.8a6.6 6.6 0 0 0 13.2 0c0-3.8-2.6-5.6-3.2-7.8-.6-2.4-1.6-5-3.4-5z" fill="' + BUT + '"/>' +
      '<circle cx="16" cy="20.4" r="4"' + a("#D9A77C", 2) + '/><path d="M14.4 18.8a2 2 0 0 1 1.6-.8"' + a(null, 1.4).replace(C, W) + "/>",
    tomato: '<circle cx="16" cy="17.5" r="10.5"' + a(CORAL) + "/>" +
      '<path d="M16 7.5l-2-3M16 7.5l-4.5 1.5 2.5 2 2-1.6 2 1.6 2.5-2z"' + a(LEAF, 2) + "/>" +
      '<path d="M9.4 15.5a7 7 0 0 1 3.4-4"' + a(null, 1.8).replace(C, W) + "/>",
    lettuce: '<path d="M16 28c-7 0-11-4.5-11-10 0-4 2-7 5-8.5C11 6 13.5 4 16 4s5 2 6 5.5c3 1.5 5 4.5 5 8.5 0 5.5-4 10-11 10z"' + a(LEAF) + "/>" +
      '<path d="M16 28V11.5M16 19.5l-5-3.5M16 16l4.5-3.5M16 23.5l6-3.5"' + a(null, 1.6) + "/>",
    potato: '<path d="M6.5 11.5c2.5-5 9-7 14-5.5 5 1.5 7.5 6 6.5 11-1 5.2-5.5 9-11 9s-10.5-2.5-11-7c-.3-3 .2-5.3 1.5-7.5z"' + a(TAN) + "/>" +
      dots([[12, 13], [19.5, 11], [21, 19], [13, 20.5]], 1, C) +
      '<path d="M9.4 12.4a6 6 0 0 1 3.6-3"' + a(null, 1.8).replace(C, W) + "/>",
    onion: '<path d="M16 5.5c-1 3.5-9.5 6-9.5 13.2a9.5 9 0 0 0 19 0C25.5 11.5 17 9 16 5.5z"' + a(LAV) + "/>" +
      '<path d="M16 5.5V2.8M13 26.4l-1 2M19 26.4l1 2M16 9.5c-2.6 3-4.4 5.8-4.4 9.4M16 9.5c2.6 3 4.4 5.8 4.4 9.4"' + a(null, 1.6) + "/>",
    herb: '<path d="M16 28V16"' + a(null) + '/><path d="M16 19c-6 0-9.5-3.2-9.5-8.5 6 0 9.5 3.2 9.5 8.5z"' + a(LEAF) + "/>" +
      '<path d="M16 16c0-5.3 3.5-8.5 9.5-8.5 0 5.3-3.5 8.5-9.5 8.5z"' + a(LEAF) + "/>",
    watermelon: '<path d="M3.5 12.5h25a12.5 12.5 0 0 1-25 0z"' + a(LEAF) + "/>" +
      '<path d="M6.3 12.5h19.4a9.7 9.7 0 0 1-19.4 0z" fill="' + CORAL + '" stroke="' + C + '" stroke-width="1.6" stroke-linejoin="round"/>' +
      dots([[11, 15.5], [16, 17.5], [21, 15.5], [16, 14]], 0.95, C),

    /* ---------- Panadería ---------- */
    marraqueta: '<path d="M4.5 16c0-5 3-8 7-8 2 0 3.3.8 4.5 2 1.2-1.2 2.5-2 4.5-2 4 0 7 3 7 8s-3 8-7 8c-2 0-3.3-.8-4.5-2-1.2 1.2-2.5 2-4.5 2-4 0-7-3-7-8z"' + a(TAN) + "/>" +
      '<path d="M16 10v12M5.5 16h21"' + a(null, 1.8) + "/>" +
      '<path d="M8 12.5a4 4 0 0 1 3-2"' + a(null, 1.6).replace(C, W) + '/><path d="M19.5 12.5a4 4 0 0 1 3-2"' + a(null, 1.6).replace(C, W) + "/>",
    hallulla: '<ellipse cx="16" cy="18.4" rx="12" ry="6.8"' + a(TAN) + "/>" +
      '<ellipse cx="16" cy="15.6" rx="12" ry="6.8"' + a(BUT) + "/>" +
      dots([[11, 14.2], [16, 13], [21, 14.2], [13.5, 17.4], [18.5, 17.4]], 1, C),
    loaf: '<path d="M7 13.5a5 5 0 0 1 .8-9.6C10.5 3 13 3 16 3s5.5 0 8.2.9a5 5 0 0 1 .8 9.6V26a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z"' + a(TAN) + "/>" +
      '<path d="M10.6 13.8a2.8 2.8 0 0 1 .2-5.6C12.6 7.4 14 7.4 16 7.4s3.4 0 5.2.8a2.8 2.8 0 0 1 .2 5.6V24.6H10.6z"' + a(CREAM, 1.6) + "/>",
    croissant: '<path d="M16 8.5c-2.4 0-3.8 2.2-3.8 5.5v6.4c1.2 1.6 2.4 2.2 3.8 2.2s2.6-.6 3.8-2.2V14c0-3.3-1.4-5.5-3.8-5.5z"' + a(TAN) + "/>" +
      '<path d="M12.2 11.5c-2.8-.2-4.8 1-5.8 3.6l.6 6.2c1.8 1 3.4 1.2 5.2.6z"' + a(TAN) + "/>" +
      '<path d="M19.8 11.5c2.8-.2 4.8 1 5.8 3.6l-.6 6.2c-1.8 1-3.4 1.2-5.2.6z"' + a(TAN) + "/>" +
      '<path d="M6.4 15.1c-2 .4-3 1.8-2.6 3.6l3.2 2.6M25.6 15.1c2 .4 3 1.8 2.6 3.6l-3.2 2.6"' + a(TAN) + "/>",
    cake: '<path d="M16 3.5v4"' + a(null, 2) + '/><path d="M16 1.8c.9 1 .9 1.8 0 2.6-.9-.8-.9-1.6 0-2.6z"' + a(BUT, 1.4) + "/>" +
      '<rect x="14.6" y="7.5" width="2.8" height="5" rx="1"' + a(LAV, 1.8) + "/>" +
      '<rect x="5" y="12.5" width="22" height="15" rx="3"' + a(PINK) + "/>" +
      '<path d="M5 17c2 2 3.6 2 5 .5s3.6-1.5 5 0 3.6 1.5 5 0 3.6-1.5 5 0 1.5 1 2 .5v-2.5a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3z"' + a(W, 2) + "/>" +
      dots([[10, 23], [16, 23.6], [22, 23]], 1, W),
    cookie: '<circle cx="16" cy="16" r="11.5"' + a(TAN) + "/>" +
      dots([[11.5, 12], [18.5, 10.5], [20, 17.5], [12.5, 19.5], [16.5, 22.5]], 1.5, "#8A5A3C"),

    /* ---------- Fiambrería, lácteos y despensa ---------- */
    ham: '<circle cx="16" cy="16" r="12"' + a(PINK) + "/>" +
      '<circle cx="16" cy="16" r="8.4" fill="' + CORAL + '" stroke="' + W + '" stroke-width="2"/>' +
      '<path d="M12.5 13.5c1.5-1.4 3.4-1.8 5-1.2M18.5 19c-1 .8-2.4 1.2-3.6 1"' + a(null, 1.6).replace(C, W) + "/>",
    cheese: '<path d="M4 14l18.5-8.5L28 14v11a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 4 25z"' + a(BUT) + "/>" +
      '<path d="M4 14h24"' + a(null, 2) + "/>" + dots([[10, 19.5], [19, 21.5], [23.5, 17.5], [14.5, 23.5]], 1.9, W, 1.4),
    egg: '<path d="M16 3.5c5 0 9.5 8 9.5 14a9.5 9.5 0 0 1-19 0c0-6 4.5-14 9.5-14z"' + a(CREAM) + "/>" +
      '<path d="M11 12.5c.8-2.4 2-4.2 3.4-5"' + a(null, 1.8).replace(C, BUT) + "/>",
    butter: '<path d="M4 15.5l7.5-5h16.5l-7.5 5z"' + a(W, 2.2) + "/>" +
      '<path d="M20.5 15.5l7.5-5v9l-7.5 5z"' + a("#F7D77A", 2.2) + "/>" +
      '<rect x="4" y="15.5" width="16.5" height="9" rx="1"' + a(BUT, 2.2) + "/>" +
      '<path d="M7.5 19.5h6"' + a(null, 1.6) + "/>",
    jam: '<rect x="8.5" y="4" width="15" height="5" rx="1.5"' + a(LAV) + "/>" +
      '<path d="M9 9h14v2.5c2 1 3 2.5 3 4.5v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-9c0-2 1-3.5 3-4.5z"' + a(PINK) + "/>" +
      '<rect x="10" y="15" width="12" height="8" rx="2"' + a(W, 1.6) + "/>" +
      '<path d="' + HEART + '" transform="translate(0 1.6)"' + a(CORAL, 1.2) + "/>",
    jar: '<rect x="9" y="4" width="14" height="4.6" rx="1.4"' + a(PINK) + "/>" +
      '<path d="M9.5 8.6h13v2c2 .8 3 2.2 3 4.4v10a3 3 0 0 1-3 3h-13a3 3 0 0 1-3-3V15c0-2.2 1-3.6 3-4.4z"' + a(BUT) + "/>" +
      '<rect x="10" y="15.5" width="12" height="7.5" rx="2"' + a(W, 1.6) + "/>",
    honey: '<rect x="9" y="5" width="14" height="4" rx="1.4"' + a(LAV, 2.2) + "/>" +
      '<path d="M9.5 9h13c3 2.4 4.5 5.4 4.5 9a11 9.6 0 0 1-22 0c0-3.6 1.5-6.6 4.5-9z"' + a(BUT) + "/>" +
      '<path d="M9.5 9h13v2.2h-4.6v2.6a1.6 1.6 0 0 1-3.2 0v-2.6H9.5z"' + a("#F7C95A", 1.8) + "/>" +
      '<path d="M13 18.4l3-1.8 3 1.8v3.4l-3 1.8-3-1.8z"' + a(W, 1.6) + "/>",
    rice: '<path d="M6 16c0-5 4.5-8.5 10-8.5S26 11 26 16z"' + a(W) + "/>" +
      '<path d="M11 12.5l1.2.6M15 10.8l1.2.4M19.6 12l1.2.8M13 14.4l1.2.2M17.6 14.6l1.2-.2"' + a(null, 1.4) + "/>" +
      '<path d="M4 16h24a12 11 0 0 1-24 0z"' + a(BLUE) + "/>" +
      '<path d="M9.5 21.5c1.6 1.4 3.6 2.2 5.6 2.4"' + a(null, 1.8).replace(C, W) + "/>",
    peanut: '<path d="M11.5 4.5c4 0 6.5 3 6.5 6.4 0 1.8.8 2.6 2.6 3 3.4.8 6 3.2 6 7a6.5 6.5 0 0 1-6.6 6.6c-3.8 0-6.2-2.6-7-6-.4-1.8-1.2-2.6-3-3-3.4-.8-6-3.4-6-7a6.5 6.5 0 0 1 7.5-7z"' + a(TAN) + "/>" +
      '<path d="M9 9.5l1.4 1.4M13.6 8.4l1.2 1.2M20 21l1.4 1.4M23.4 18.6l1.2 1.2M11.4 13.6l1.2 1.2M19.4 16.4l1.2 1.2"' + a(null, 1.5) + "/>",
    chips: '<path d="M7 5.5h18l-1 3 1 3-1.5 14.5a2 2 0 0 1-2 1.8h-11a2 2 0 0 1-2-1.8L7 11.5l1-3z"' + a(BUT) + "/>" +
      '<path d="M8 8.5l2 1.2 2-1.2 2 1.2 2-1.2 2 1.2 2-1.2 2 1.2 2-1.2"' + a(null, 1.4) + "/>" +
      '<path d="M16 13.5c3.5 0 5.8 2.2 5.4 5-.4 2.6-2.6 4.5-5.4 4.5s-5-1.9-5.4-4.5c-.4-2.8 1.9-5 5.4-5z"' + a(TAN, 2) + "/>",
    icecream: '<path d="M10 16h12l-6 12.5z"' + a(TAN) + '/><path d="M12.5 19.5l6.5 3M11.6 17.5l8.6 4"' + a(null, 1.3) + "/>" +
      '<circle cx="12.4" cy="12.6" r="4.4"' + a(PINK) + '/><circle cx="19.6" cy="12.6" r="4.4"' + a(MINT) + "/>" +
      '<circle cx="16" cy="8.4" r="4.4"' + a(LAV) + "/>",

    /* ---------- Bebestibles ---------- */
    soda: '<rect x="13" y="2.5" width="6" height="3.5" rx="1"' + a(PINK, 2) + "/>" +
      '<path d="M13 6h6v3c3 1.5 4.5 4 4.5 7v10a2.5 2.5 0 0 1-2.5 2.5h-10A2.5 2.5 0 0 1 8.5 26V16c0-3 1.5-5.5 4.5-7z"' + a(BLUE) + "/>" +
      '<path d="M8.5 16h15v6h-15z"' + a(PINK, 1.8) + "/>" +
      dots([[12, 25], [15, 25.8], [19, 24.6]], 1, W),
    beer: '<path d="M22 12.5h2.5a3 3 0 0 1 3 3v4.5a3 3 0 0 1-3 3H22"' + a(null) + "/>" +
      '<rect x="6" y="9" width="16" height="19" rx="2.5"' + a(BUT) + "/>" +
      '<path d="M5 10.5a3 3 0 0 1 2.4-4.4 3.5 3.5 0 0 1 6.2-1.4 3.5 3.5 0 0 1 6.2 1 3 3 0 0 1 3 4.8z"' + a(W) + "/>" +
      '<path d="M11 15.5v8.5M17 15.5v8.5"' + a(null, 1.8) + "/>",
    wine: '<path d="M13.5 3h5v7.2c2.5 1.2 4 3.5 4 6.3v10a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-10c0-2.8 1.5-5.1 4-6.3z"' + a(LAV) + "/>" +
      '<rect x="13.5" y="3" width="5" height="4" rx="1"' + a(PINK, 2) + "/>" +
      '<rect x="9.5" y="17" width="13" height="7" rx="1.6"' + a(W, 1.6) + "/>" +
      '<path d="' + HEART + '" transform="translate(0 3)"' + a(PINK, 1.1) + "/>",
    water: '<path d="M16 3.5c4 5.5 9 10.5 9 16a9 9 0 0 1-18 0c0-5.5 5-10.5 9-16z"' + a(BLUE) + "/>" +
      '<path d="M11.4 19.5a5 5 0 0 0 3 4.4"' + a(null, 1.8).replace(C, W) + "/>",
    juice: '<path d="M8 11l3-4.5h10L24 11z"' + a(PINK, 2.2) + "/>" +
      '<rect x="8" y="11" width="16" height="17" rx="2"' + a(BUT) + "/>" +
      '<path d="M19 6.5l1.5-4h3.5"' + a(null, 2) + "/>" +
      '<circle cx="16" cy="19.5" r="4.4"' + a("#FFC48A", 1.8) + '/><path d="M16 15.1v8.8M11.6 19.5h8.8M12.9 16.4l6.2 6.2M19.1 16.4l-6.2 6.2"' + a(null, 1).replace(C, W) + "/>",
    milk: '<path d="M9 11l3-5.5h8l3 5.5v15.5a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2z"' + a(W) + "/>" +
      '<path d="M9 11h14M12 5.5 15 11"' + a(null, 2) + "/>" +
      '<rect x="9" y="15" width="14" height="8" fill="' + BLUE + '" stroke="' + C + '" stroke-width="1.8"/>' +
      '<path d="M16 16.6c1.4 1.8 2.2 2.8 2.2 3.8a2.2 2.2 0 0 1-4.4 0c0-1 .8-2 2.2-3.8z"' + a(W, 1.3) + "/>",
    coffee: '<path d="M11 8.5c-1-1.4 1-2.4 0-4.2M16 8.5c-1-1.4 1-2.4 0-4.2"' + a(null, 1.8) + "/>" +
      '<path d="M23 14.5h2a3 3 0 0 1 0 6h-2.4"' + a(null) + "/>" +
      '<path d="M5.5 11.5h18v8.5a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7z"' + a(PINK) + "/>" +
      '<path d="M3.5 28h22"' + a(null) + '/><path d="' + HEART + '" transform="translate(-1.5 2)"' + a(W, 1.2) + "/>",
    tea: '<path d="M4 25.5h22"' + a(null) + "/>" +
      '<path d="M22 13.5h2.2a3 3 0 0 1 0 6H21.6"' + a(null) + "/>" +
      '<path d="M5 11h18v6a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7z"' + a(LAV) + "/>" +
      '<path d="M18 11V4.5M18 4.5l4 1"' + a(null, 1.4) + '/><rect x="19.5" y="4" width="5" height="5" rx="1" transform="rotate(12 22 6.5)"' + a(BUT, 1.6) + "/>",
    sugar: '<path d="M7.5 9h17l-1.5 17a2 2 0 0 1-2 1.8H11a2 2 0 0 1-2-1.8z"' + a(W) + "/>" +
      '<path d="M7.5 9l1.4-4.5h14.2L24.5 9"' + a(BLUE, 2.2) + "/>" +
      '<rect x="12" y="14" width="3.6" height="3.6" rx=".6"' + a(W, 1.4) + '/><rect x="16.6" y="17.6" width="3.6" height="3.6" rx=".6"' + a(W, 1.4) + "/>",
    ice: '<rect x="4.5" y="12" width="12" height="12" rx="3" transform="rotate(-10 10.5 18)"' + a(BLUE) + "/>" +
      '<rect x="15.5" y="7" width="12" height="12" rx="3" transform="rotate(12 21.5 13)"' + a(BLUE) + "/>" +
      '<path d="M7.8 15.6l2.2-.4M19 10.2l2.2.5"' + a(null, 1.8).replace(C, W) + "/>",

    /* ---------- Fuego y mesa ---------- */
    charcoal: '<path d="M7 7h18l1.5 19.5a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5z"' + a(TAN) + "/>" +
      '<path d="M7 7l1 3.5h16l1-3.5"' + a(null, 2) + "/>" +
      '<path d="M16 13c.7 3 4.4 4.4 4.4 8.4a4.4 4.4 0 0 1-8.8 0c0-2.3 1.4-3.6 2.4-4.8.1 1.5.6 2.3 1.4 2.7-.4-2.1-.4-4.1.6-6.3z"' + a(PINK, 1.8) + "/>",
    napkin: '<path d="M5 8.5 20.5 5 27 20.5 11.5 24z"' + a(W) + "/>" +
      '<path d="M5 8.5l6.5 15.5 3 4L27 20.5"' + a(PINK) + "/>" +
      '<path d="' + HEART + '" transform="translate(0 -3)"' + a(PINK, 1.2) + "/>",
    tableware: '<ellipse cx="13" cy="19.5" rx="10.5" ry="6.5"' + a(W) + '/><ellipse cx="13" cy="19" rx="6" ry="3.4"' + a(BLUE, 1.6) + "/>" +
      '<path d="M20.5 5h8l-1.6 16.5a1.4 1.4 0 0 1-1.4 1.3h-2a1.4 1.4 0 0 1-1.4-1.3z"' + a(PINK) + '/><path d="M21.2 10h6.6"' + a(null, 1.6) + "/>",

    /* ---------- UI ---------- */
    cart: '<path d="M3 5h3.5l3 15h15.5l2.5-10.5H8"' + a(null, 2.4) + "/>" +
      '<path d="M8.2 9.5h19.3L25 20H10.3z"' + a(LAV) + "/>" +
      '<path d="M14 12.5v4.5M19 12.5v4.5"' + a(null, 1.6) + "/>" +
      '<circle cx="12" cy="25.5" r="2.4"' + a(PINK, 2) + '/><circle cx="23" cy="25.5" r="2.4"' + a(PINK, 2) + "/>",
    basket: '<path d="M10 13 14 5M22 13 18 5"' + a(null) + "/>" +
      '<path d="M3.5 12.5h25v3.5h-25z"' + a(PINK, 2.2) + "/>" +
      '<path d="M5.5 16h21l-2 10a2 2 0 0 1-2 1.6H9.5a2 2 0 0 1-2-1.6z"' + a(BUT) + "/>" +
      '<path d="M11.5 19.5v5M16 19.5v5M20.5 19.5v5"' + a(null, 1.8) + "/>",
    people: '<circle cx="11" cy="10" r="4.2"' + a(PINK) + '/><path d="M3.5 26a7.5 7.5 0 0 1 15 0z"' + a(PINK) + "/>" +
      '<circle cx="21.5" cy="11.5" r="3.8"' + a(LAV) + '/><path d="M15.8 26a6.2 6.2 0 0 1 12.4 0z"' + a(LAV) + "/>",
    child: '<circle cx="16" cy="12" r="6.5"' + a(BUT) + "/>" +
      '<path d="M6.5 28a9.5 9.5 0 0 1 19 0z"' + a(MINT) + "/>" +
      '<path d="M16 5.5l-3.5-2v4zM16 5.5l3.5-2v4z"' + a(PINK, 1.6) + "/>" +
      dots([[13.6, 12.4], [18.4, 12.4]], 1, C) + '<path d="M14.2 15a2.4 2.4 0 0 0 3.6 0"' + a(null, 1.4) + "/>",
    plus: '<path d="M16 7.5v17M7.5 16h17"' + a(null, 3.2) + "/>",
    minus: '<path d="M7.5 16h17"' + a(null, 3.2) + "/>",
    copy: '<rect x="4.5" y="4.5" width="15" height="18" rx="3"' + a(LAV) + "/>" +
      '<rect x="12.5" y="9.5" width="15" height="18" rx="3"' + a(PINK) + "/>" +
      '<path d="M16.5 15h7M16.5 19h7M16.5 23h4"' + a(null, 1.6) + "/>",
    share: '<path d="M16 4.5a11.5 11.5 0 0 0-9.9 17.3L4.5 27.5l5.9-1.5A11.5 11.5 0 1 0 16 4.5z"' + a(MINT) + "/>" +
      '<path d="' + HEART + '" transform="translate(0 -.4)"' + a(W, 1.4) + "/>",
    print: '<rect x="9" y="4" width="14" height="8" rx="1.5"' + a(W) + "/>" +
      '<rect x="4" y="11" width="24" height="11" rx="3"' + a(LAV) + "/>" +
      '<rect x="9" y="18" width="14" height="10" rx="1.5"' + a(W) + '/><path d="M12 22h8M12 25h5"' + a(null, 1.6) + "/>",
    pencil: '<path d="M6 26l1.4-5.6L21 6.8a2.8 2.8 0 0 1 4 0l.2.2a2.8 2.8 0 0 1 0 4L11.6 24.6z"' + a(BUT) + "/>" +
      '<path d="M18.5 9.3l4.2 4.2M7.4 20.4l4.2 4.2"' + a(null, 2) + '/><path d="M6 26l1.4-5.6 4.2 4.2z"' + a(PINK, 2) + "/>",
    arrowLeft: '<path d="M26 16H7M13.5 9 6.5 16l7 7"' + a(null, 3) + "/>",
    arrowRight: '<path d="M6 16h19M18.5 9l7 7-7 7"' + a(null, 3) + "/>",
    home: '<path d="M4.5 15 16 5l11.5 10"' + a(null, 2.6) + '/><path d="M7.5 13v13a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5V13L16 5.8z"' + a(PINK) + "/>" +
      '<path d="' + HEART + '" transform="translate(0 2.6)"' + a(W, 1.3) + "/>",
    // Copiados de FEP
    check: '<circle cx="16" cy="16" r="12"' + a(MINT) + '/><path d="M10.5 16.5l3.8 3.8 7.5-8"' + a(null, 2.6) + "/>",
    flame: '<path d="M16 3.5c1.2 5.2 7.5 7.5 7.5 14.5a7.5 7.5 0 0 1-15 0c0-4 2.5-6.3 4.2-8.4.1 2.6 1 4 2.4 4.7C14.7 11 13.8 7.6 16 3.5z"' + a(PINK) + "/>" +
      '<path d="M16 17c2.2 2.2 3.3 3.4 3.3 5.3a3.3 3.3 0 0 1-6.6 0c0-1.9 1.4-3.2 3.3-5.3z"' + a(BUT, 1.8) + "/>",
    sparkle: '<path d="M14 3.5c1 6.2 3.3 8.5 9.5 9.5-6.2 1-8.5 3.3-9.5 9.5-1-6.2-3.3-8.5-9.5-9.5 6.2-1 8.5-3.3 9.5-9.5z"' + a(BUT, 2.2) + "/>" +
      '<path d="M24 19c.5 3 1.5 4 4.5 4.5-3 .5-4 1.5-4.5 4.5-.5-3-1.5-4-4.5-4.5 3-.5 4-1.5 4.5-4.5z"' + a(PINK, 1.8) + "/>",
    redo: '<path d="M24 12.5A9 9 0 1 0 25 20"' + a(null, 2.8) + '/><path d="M25.5 6v7h-7"' + a(null, 2.8) + "/>"
  };

  QC.ICON_NAMES = Object.keys(I);
  QC.hasIcon = function (name) { return Object.prototype.hasOwnProperty.call(I, name); };

  // QC.icon("steak") → <svg>; si falta el ícono, se usa la canasta genérica.
  QC.icon = function (name, cls) {
    return '<svg class="ico' + (cls ? " " + cls : "") + '" viewBox="0 0 32 32" aria-hidden="true" focusable="false">' + (I[name] || I.basket) + "</svg>";
  };
})(typeof window !== "undefined" ? window : globalThis);
