# ¿Qué compro? 🛒

Asistente para las compras del supermercado. Eliges un escenario (asado, cosas para el pan, picoteo o cumpleaños) y te guía paso a paso por todas las variantes posibles. Al final te dice **qué comprar, cuánto** y **cuánto te va a costar**, con el **mínimo, la media y el máximo** en pesos chilenos.

- Sin IA y sin servidor: todo se calcula en el navegador.
- HTML, CSS y JavaScript puro, sin build ni dependencias.
- Pensada para el celular, porque se usa en el súper.
- Estilo kawaii del portafolio: letras globo, tarjetas sticker, fondo de lunares y los mismos íconos pastel.

## Cómo usarla

Abre `index.html` directo en el navegador (funciona con `file://`) o sírvela en local:

```sh
npx serve .            # o: python -m http.server
```

1. **Inicio**: elige qué vas a hacer.
2. **Asistente**: un paso por pregunta (personas, carnes, pan, bebestibles…). Cada opción muestra su rango de precio, y abajo queda fijo el total estimado, que se actualiza en vivo. **Lo típico** marca la combinación chilena clásica del paso. **Armar con lo típico**, en el paso de personas, arma la lista completa de una vez.
3. **Tu lista**: los tres totales (mínimo, media y máximo), el costo por persona y la lista agrupada por pasillo. Puedes subir o bajar cada cantidad (el total se recalcula), copiar la lista, mandarla por WhatsApp o imprimirla.

Las respuestas se guardan en `localStorage`, así que no se pierden al recargar.

## Tests

```sh
node --test
```

Prueban el motor de cálculo (`js/calc.js`): el reparto de los pools, el redondeo al envase, las reglas por persona, fijas y solo para adultos, las cantidades editadas y la consistencia del catálogo y los escenarios (que exista cada producto y cada ícono, y que se cumpla mín ≤ media ≤ máx).

> Con Node 22, `node --test tests/` no acepta una carpeta como argumento. Usa `node --test`, que encuentra solo los `*.test.js`.

## Estructura

```
index.html            estructura: header, <main id="app">, footer y scripts
css/base.css          paleta, tipografías, letras globo, tarjetas y botones (del portafolio)
css/app.css           tarjetas de opción, stepper, minitotal, resumen e impresión
js/icons.js           QC.icon(name): íconos SVG pastel con contorno café
js/util.js            formato de pesos y cantidades, helpers
js/calc.js            motor de cantidades y precios (funciones puras, también corre en Node)
js/app.js             router por hash: #/ → #/e/<escenario>/<paso> → #/e/<escenario>/resumen
data/products.js      catálogo con precios mín/medio/máx y pasillos
data/scenarios/*.js   un archivo por escenario
tests/calc.test.js    tests con node:test
docs/PLAN.md          plan original del proyecto
docs/referencia-estilo/  íconos y estilos del portafolio usados como referencia
```

Los scripts son clásicos (no módulos ES) y cuelgan todo del objeto global `QC`, como en el portafolio. Así la página funciona abriendo el archivo directo.

## Actualizar precios

Los precios están en `data/products.js`. Cada producto tiene `min`, `avg` y `max` **por unidad de compra** (`unit`): por kg, por litro o por envase. Son precios de referencia de Lider, Jumbo, Unimarc, Tottus y Santa Isabel:

- `min`: el más barato (marca propia u oferta)
- `avg`: el precio típico
- `max`: el más caro (marca premium o el súper más caro)

Después de actualizarlos, cambia `QC.PRICES_UPDATED` (por ejemplo, a `"2027-03"`). Esa fecha aparece en el header y en la lista.

```js
entrana: { name: "Entraña", cat: "carniceria", unit: "kg", step: 0.5,
           min: 17990, avg: 21990, max: 27990, icon: "steak", hint: "…" }
```

| Campo | Qué es |
|---|---|
| `cat` | pasillo, uno de `QC.AISLES` (ordena la lista de compras) |
| `unit` | `"kg"`, `"L"` o una unidad contable (`"frasco"`, `"botella de 3 L"`…) |
| `plural` | plural de la unidad si no basta con agregar "s" |
| `step` | lo mínimo que se puede comprar: la cantidad se redondea hacia arriba a un múltiplo (0,5 kg, 1 frasco, packs de 6 latas…) |
| `size` | solo si el producto participa en un pool en kg: cuánto aporta una unidad (una bolsa de pan de molde ≈ 0,6 kg) |
| `icon` | nombre del ícono en `js/icons.js` (si no existe, se usa una canasta) |

## Agregar un escenario

Crea `data/scenarios/<id>.js`, inclúyelo en `index.html` antes de `js/calc.js` y súmalo a los `require` de `tests/calc.test.js`. Un escenario es una lista de pasos declarativos:

```js
QC.SCENARIOS.push({
  id: "asado", name: "Asado", icon: "grill", color: "pink", tagline: "…",
  pools: { carne: { perPerson: 0.4 } },          // kg por persona a repartir
  steps: [
    { id: "personas", type: "people", title: "¿Cuántos van?" },
    { id: "comida", type: "choice", title: "¿Para qué es?", options: [
        { id: "once", name: "Once", icon: "tea", factor: 1, typical: true },
        { id: "ambos", name: "Desayuno y once", icon: "sparkle", factor: 2 } ] },
    { id: "carnes", type: "pick", title: "…", min: 1, groups: [
        { name: "Vacuno", options: [
            { product: "entrana", pool: "carne", typical: true },
            { product: "longaniza", pool: "carne", weight: 0.5 } ] } ] }
  ]
});
```

**Tipos de paso**

- `people`: adultos y niños. Los niños cuentan como media persona (personas efectivas = adultos + 0,5 × niños).
- `choice`: se elige una sola opción. Su `factor` multiplica las cantidades por persona (desayuno y once = ×2).
- `pick`: opciones de selección múltiple agrupadas por subcategoría. Con `min: 1`, obliga a elegir al menos una.

**Reglas de cantidad de una opción**

- `perPerson: 0.1`: 0,1 unidades por persona efectiva (× el factor). Con `adultsOnly: true`, se calcula solo para los adultos (cerveza, vino).
- `pool: "carne"`: se reparte el total del pool entre las opciones elegidas del mismo pool. `weight` cambia la proporción (los embutidos cuentan 0,5).
- `fixed: 1, every: 8`: 1 unidad por cada 8 personas (o 1 fija si no hay `every`).
- `items: [...]`: un combo de varios productos con su regla cada uno (ensalada chilena = tomate + cebolla). Si dos opciones usan el mismo producto, las cantidades se suman.
- `typical: true`: la marca el botón **Lo típico**.

## Pendiente

- Publicarla (GitHub Pages o Vercel).
- Contrastar los precios con los sitios de los supermercados. Desde el entorno donde se implementó no se podía acceder a ellos, así que son valores de referencia curados a mano para septiembre de 2026.
