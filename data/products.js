// Catálogo de productos con precios de referencia en CLP.
//
// Cada producto:
//   name    nombre que ve la usuaria
//   cat     pasillo del súper (ver QC.AISLES)
//   unit    unidad de compra y de precio ("kg", "L" o una unidad contable)
//   plural  plural de la unidad contable (si no se indica, se agrega "s")
//   step    lo mínimo que se puede comprar: las cantidades se redondean
//           hacia arriba a un múltiplo de step (0,25 kg, 1 frasco, 6 latas…)
//   size    opcional, cuánto aporta 1 unidad a un "pool" en kg
//           (p. ej. una bolsa de pan de molde ≈ 0,6 kg de pan)
//   min/avg/max  precio por unidad: el más barato, el típico y el más caro
//           entre Lider, Jumbo, Unimarc, Tottus y Santa Isabel
//   icon    nombre del ícono en js/icons.js
//   hint    dato útil que se muestra bajo el nombre
//
// Para actualizar precios basta con editar min/avg/max y QC.PRICES_UPDATED.
(function (root) {
  var QC = root.QC = root.QC || {};

  QC.PRICES_UPDATED = "2026-09";

  // Orden en que aparecen los pasillos en la lista de compras
  QC.AISLES = [
    { id: "carniceria", name: "Carnicería", icon: "steak" },
    { id: "fiambreria", name: "Fiambrería y quesos", icon: "cheese" },
    { id: "panaderia", name: "Panadería", icon: "marraqueta" },
    { id: "verduleria", name: "Frutas y verduras", icon: "tomato" },
    { id: "lacteos", name: "Lácteos y huevos", icon: "milk" },
    { id: "despensa", name: "Despensa", icon: "jar" },
    { id: "snacks", name: "Snacks y galletas", icon: "chips" },
    { id: "postres", name: "Postres", icon: "cake" },
    { id: "bebidas", name: "Bebidas, jugos y agua", icon: "soda" },
    { id: "botilleria", name: "Botillería", icon: "wine" },
    { id: "bazar", name: "Desechables y bazar", icon: "napkin" }
  ];

  QC.PRODUCTS = {
    /* ---------- Vacuno ---------- */
    lomo_vetado: { name: "Lomo vetado", cat: "carniceria", unit: "kg", step: 0.5, min: 14990, avg: 17990, max: 22990, icon: "steak" },
    entrana: { name: "Entraña", cat: "carniceria", unit: "kg", step: 0.5, min: 17990, avg: 21990, max: 27990, icon: "steak", hint: "Sale rápido: 2 o 3 piezas por kg" },
    asado_tira: { name: "Asado de tira", cat: "carniceria", unit: "kg", step: 0.5, min: 8990, avg: 10990, max: 13990, icon: "ribs", hint: "Tiene hueso: rinde un poco menos" },
    punta_paleta: { name: "Punta paleta", cat: "carniceria", unit: "kg", step: 0.5, min: 10990, avg: 12990, max: 15990, icon: "steak" },
    plateada: { name: "Plateada", cat: "carniceria", unit: "kg", step: 0.5, min: 9990, avg: 11990, max: 14490, icon: "steak" },
    sobrecostilla: { name: "Sobrecostilla", cat: "carniceria", unit: "kg", step: 0.5, min: 8490, avg: 9990, max: 11990, icon: "steak" },
    tapapecho: { name: "Tapapecho", cat: "carniceria", unit: "kg", step: 0.5, min: 8990, avg: 10490, max: 12990, icon: "steak", hint: "Cocción lenta" },

    /* ---------- Cerdo ---------- */
    costillar: { name: "Costillar de cerdo", cat: "carniceria", unit: "kg", step: 0.5, min: 5990, avg: 7490, max: 8990, icon: "ribs" },
    pulpa_cerdo: { name: "Pulpa de cerdo", cat: "carniceria", unit: "kg", step: 0.5, min: 5490, avg: 6490, max: 7990, icon: "steak" },
    chuleta: { name: "Chuleta de cerdo", cat: "carniceria", unit: "kg", step: 0.5, min: 4990, avg: 5990, max: 7490, icon: "steak" },

    /* ---------- Pollo ---------- */
    trutro: { name: "Trutro de pollo", cat: "carniceria", unit: "kg", step: 0.5, min: 2990, avg: 3790, max: 4590, icon: "chickenLeg" },
    alitas: { name: "Alitas de pollo", cat: "carniceria", unit: "kg", step: 0.5, min: 3490, avg: 4290, max: 5290, icon: "chickenLeg" },

    /* ---------- Embutidos ---------- */
    longaniza: { name: "Longaniza", cat: "carniceria", unit: "kg", step: 0.5, min: 5990, avg: 7990, max: 10990, icon: "sausage", hint: "≈ 8 a 10 unidades por kg" },
    chorizo: { name: "Chorizo", cat: "carniceria", unit: "kg", step: 0.5, min: 5490, avg: 7490, max: 9990, icon: "sausage" },
    prietas: { name: "Prietas", cat: "carniceria", unit: "kg", step: 0.5, min: 4990, avg: 6490, max: 7990, icon: "sausage" },

    /* ---------- Veggie ---------- */
    choclo: { name: "Choclo", cat: "verduleria", unit: "choclo", step: 1, min: 450, avg: 650, max: 900, icon: "corn" },
    champinones: { name: "Champiñones", cat: "verduleria", unit: "kg", step: 0.25, min: 3990, avg: 4990, max: 6490, icon: "mushroom", hint: "Bandejas de 200 o 250 g" },
    zapallo_italiano: { name: "Zapallo italiano", cat: "verduleria", unit: "kg", step: 0.5, min: 1290, avg: 1790, max: 2490, icon: "zucchini" },
    hamburguesa_veggie: { name: "Hamburguesa veggie", cat: "carniceria", unit: "caja de 4", plural: "cajas de 4", step: 1, min: 3490, avg: 4290, max: 5490, icon: "steak", hint: "Media por persona" },

    /* ---------- Verdulería ---------- */
    tomate: { name: "Tomate", cat: "verduleria", unit: "kg", step: 0.5, min: 990, avg: 1490, max: 2290, icon: "tomato" },
    cebolla: { name: "Cebolla", cat: "verduleria", unit: "kg", step: 0.5, min: 690, avg: 990, max: 1490, icon: "onion" },
    cilantro: { name: "Cilantro", cat: "verduleria", unit: "atado", step: 1, min: 390, avg: 590, max: 890, icon: "herb" },
    lechuga: { name: "Lechuga", cat: "verduleria", unit: "lechuga", step: 1, min: 690, avg: 990, max: 1390, icon: "lettuce" },
    papa: { name: "Papas", cat: "verduleria", unit: "kg", step: 1, min: 890, avg: 1290, max: 1790, icon: "potato", hint: "Mallas de 1 a 2 kg" },
    palta: { name: "Palta", cat: "verduleria", unit: "kg", step: 0.5, min: 3990, avg: 5490, max: 7990, icon: "avocado", hint: "≈ 4 o 5 paltas por kg" },
    fruta: { name: "Fruta de la estación", cat: "verduleria", unit: "kg", step: 0.5, min: 990, avg: 1490, max: 2290, icon: "watermelon" },

    /* ---------- Panadería ---------- */
    marraqueta: { name: "Marraqueta", cat: "panaderia", unit: "kg", step: 0.25, min: 1890, avg: 2390, max: 2990, icon: "marraqueta", hint: "≈ 10 unidades por kg" },
    hallulla: { name: "Hallulla", cat: "panaderia", unit: "kg", step: 0.25, min: 1890, avg: 2390, max: 2990, icon: "hallulla", hint: "≈ 10 unidades por kg" },
    pan_molde: { name: "Pan de molde blanco", cat: "panaderia", unit: "bolsa", step: 1, size: 0.6, min: 1990, avg: 2690, max: 3490, icon: "loaf", hint: "Bolsa de ≈ 600 g" },
    pan_integral: { name: "Pan de molde integral", cat: "panaderia", unit: "bolsa", step: 1, size: 0.6, min: 2290, avg: 2990, max: 3790, icon: "loaf", hint: "Bolsa de ≈ 600 g" },
    dobladita: { name: "Dobladita", cat: "panaderia", unit: "kg", step: 0.25, min: 2290, avg: 2790, max: 3490, icon: "hallulla" },
    frica: { name: "Pan frica", cat: "panaderia", unit: "kg", step: 0.25, min: 2190, avg: 2690, max: 3290, icon: "hallulla", hint: "El pan de hamburguesa" },
    croissant: { name: "Croissant", cat: "panaderia", unit: "croissant", plural: "croissants", step: 1, size: 0.06, min: 390, avg: 590, max: 890, icon: "croissant" },

    /* ---------- Fiambrería y quesos ---------- */
    jamon_pierna: { name: "Jamón de pierna", cat: "fiambreria", unit: "kg", step: 0.25, min: 7990, avg: 9990, max: 12990, icon: "ham", hint: "Pide por cuarto (250 g)" },
    jamon_pavo: { name: "Jamón de pavo", cat: "fiambreria", unit: "kg", step: 0.25, min: 6990, avg: 8990, max: 11990, icon: "ham" },
    jamon_acaramelado: { name: "Jamón acaramelado", cat: "fiambreria", unit: "kg", step: 0.25, min: 8990, avg: 10990, max: 13990, icon: "ham" },
    queso_gauda: { name: "Queso gauda", cat: "fiambreria", unit: "kg", step: 0.25, min: 8990, avg: 10990, max: 13990, icon: "cheese" },
    queso_mantecoso: { name: "Queso mantecoso", cat: "fiambreria", unit: "kg", step: 0.25, min: 8490, avg: 10490, max: 12990, icon: "cheese" },
    quesillo: { name: "Quesillo", cat: "lacteos", unit: "quesillo", step: 1, size: 0.25, min: 1590, avg: 1990, max: 2590, icon: "cheese", hint: "De 250 g" },
    pate: { name: "Paté", cat: "fiambreria", unit: "pote", step: 1, min: 690, avg: 990, max: 1390, icon: "jar", hint: "De 100 g" },

    /* ---------- Lácteos y huevos ---------- */
    huevos: { name: "Huevos", cat: "lacteos", unit: "huevo", step: 6, min: 180, avg: 230, max: 300, icon: "egg", hint: "Bandejas de 6, 12 o 30" },
    mantequilla: { name: "Mantequilla", cat: "lacteos", unit: "pan de 250 g", plural: "panes de 250 g", step: 1, min: 2490, avg: 3190, max: 3990, icon: "butter" },
    leche: { name: "Leche", cat: "lacteos", unit: "L", step: 1, min: 890, avg: 1190, max: 1490, icon: "milk", hint: "Cajas de 1 L" },
    helado: { name: "Helado", cat: "postres", unit: "L", step: 1, min: 2490, avg: 3490, max: 4990, icon: "icecream", hint: "Potes de 1 L" },

    /* ---------- Despensa ---------- */
    arroz: { name: "Arroz", cat: "despensa", unit: "kg", step: 1, min: 1190, avg: 1590, max: 2190, icon: "rice" },
    mayonesa: { name: "Mayonesa", cat: "despensa", unit: "frasco", step: 1, min: 1690, avg: 2290, max: 2990, icon: "jar", hint: "De 400 g" },
    mermelada: { name: "Mermelada", cat: "despensa", unit: "frasco", step: 1, min: 1290, avg: 1890, max: 2690, icon: "jam", hint: "De 250 g" },
    manjar: { name: "Manjar", cat: "despensa", unit: "pote", step: 1, min: 1490, avg: 2190, max: 2990, icon: "jar", hint: "De 400 g" },
    miel: { name: "Miel", cat: "despensa", unit: "frasco", step: 1, min: 3990, avg: 5490, max: 7490, icon: "honey", hint: "De 500 g" },
    crema_avellanas: { name: "Crema de avellanas", cat: "despensa", unit: "frasco", step: 1, min: 2990, avg: 4490, max: 5990, icon: "jar", hint: "De 350 g" },
    te: { name: "Té", cat: "despensa", unit: "caja", step: 1, min: 790, avg: 1190, max: 1790, icon: "tea", hint: "Caja de 20 bolsitas" },
    cafe: { name: "Café instantáneo", cat: "despensa", unit: "frasco", step: 1, min: 3990, avg: 5990, max: 8490, icon: "coffee", hint: "De 170 g" },
    azucar: { name: "Azúcar", cat: "despensa", unit: "kg", step: 1, min: 1090, avg: 1390, max: 1790, icon: "sugar" },

    /* ---------- Snacks y postres ---------- */
    papas_fritas: { name: "Papas fritas", cat: "snacks", unit: "bolsa", step: 1, min: 1990, avg: 2690, max: 3490, icon: "chips", hint: "Bolsa de ≈ 380 g" },
    mani: { name: "Maní salado", cat: "snacks", unit: "bolsa", step: 1, min: 1490, avg: 2190, max: 2990, icon: "peanut", hint: "Bolsa de ≈ 400 g" },
    ramitas: { name: "Ramitas", cat: "snacks", unit: "bolsa", step: 1, min: 990, avg: 1390, max: 1890, icon: "chips", hint: "Bolsa de ≈ 250 g" },
    galletas_saladas: { name: "Galletas saladas", cat: "snacks", unit: "paquete", step: 1, min: 690, avg: 990, max: 1390, icon: "cookie" },
    galletas_dulces: { name: "Galletas dulces", cat: "snacks", unit: "paquete", step: 1, min: 790, avg: 1190, max: 1690, icon: "cookie" },
    torta: { name: "Torta", cat: "postres", unit: "torta", step: 1, min: 12990, avg: 16990, max: 22990, icon: "cake", hint: "De 15 porciones" },
    velas: { name: "Velas de cumpleaños", cat: "bazar", unit: "paquete", step: 1, min: 590, avg: 990, max: 1990, icon: "cake" },

    /* ---------- Bebestibles ---------- */
    bebida: { name: "Bebida", cat: "bebidas", unit: "botella de 3 L", plural: "botellas de 3 L", step: 1, min: 2290, avg: 2790, max: 3490, icon: "soda" },
    jugo: { name: "Jugo", cat: "bebidas", unit: "caja de 1,5 L", plural: "cajas de 1,5 L", step: 1, min: 1190, avg: 1590, max: 2190, icon: "juice" },
    agua: { name: "Agua mineral", cat: "bebidas", unit: "botella de 1,6 L", plural: "botellas de 1,6 L", step: 1, min: 590, avg: 890, max: 1290, icon: "water" },
    hielo: { name: "Hielo", cat: "bebidas", unit: "bolsa de 2 kg", plural: "bolsas de 2 kg", step: 1, min: 990, avg: 1490, max: 1990, icon: "ice" },
    cerveza: { name: "Cerveza", cat: "botilleria", unit: "lata", step: 6, min: 690, avg: 990, max: 1390, icon: "beer", hint: "Latas de 470 cc, en packs de 6" },
    vino: { name: "Vino", cat: "botilleria", unit: "botella", step: 1, min: 2990, avg: 4990, max: 8990, icon: "wine", hint: "Botella de 750 cc" },

    /* ---------- Fuego y mesa ---------- */
    carbon: { name: "Carbón", cat: "bazar", unit: "saco de 5 kg", plural: "sacos de 5 kg", step: 1, min: 4990, avg: 5990, max: 7490, icon: "charcoal", hint: "Uno por cada 8 personas" },
    encendedor: { name: "Encendedor de carbón", cat: "bazar", unit: "unidad", plural: "unidades", step: 1, min: 990, avg: 1490, max: 2290, icon: "flame", hint: "Líquido o pastillas" },
    servilletas: { name: "Servilletas", cat: "bazar", unit: "paquete", step: 1, min: 690, avg: 990, max: 1490, icon: "napkin", hint: "Paquete de 100" },
    platos: { name: "Platos desechables", cat: "bazar", unit: "paquete", step: 1, min: 1490, avg: 1990, max: 2990, icon: "tableware", hint: "Paquete de 20" },
    vasos: { name: "Vasos desechables", cat: "bazar", unit: "paquete", step: 1, min: 990, avg: 1390, max: 1990, icon: "tableware", hint: "Paquete de 25" }
  };
})(typeof window !== "undefined" ? window : globalThis);
