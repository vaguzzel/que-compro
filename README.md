# ¿Qué compro? 🛒

Asistente para las compras del supermercado. Eliges qué vas a hacer (asado, cosas para el pan, picoteo o cumpleaños, completos, carrete, tabla de quesos o brunch) y te guía paso a paso por todas las variantes posibles. Al final te dice **qué comprar, cuánto** y **cuánto te va a costar**, con el **mínimo, la media y el máximo**, calculados con **precios reales** de Jumbo, Unimarc, Tottus y Lider.

- Sin IA y sin servidor: todo se calcula en el navegador.
- HTML, CSS y JavaScript puro, sin build ni dependencias.
- Pensada para el celular, porque se usa en el súper.
- Estilo kawaii del portafolio: letras globo, tarjetas sticker, washi tape, fondo de lunares y más de 100 íconos pastel.
- En el asado, cada corte tiene una **ficha** (botón ⓘ) con un dibujo del animal que marca de dónde sale, para qué sirve, cómo se cocina, cuánto demora y en qué platos queda mejor.

## Cómo usarla

Abre `index.html` directo en el navegador (funciona con `file://`) o sírvela en local:

```sh
npx serve .            # o: python -m http.server
```

Para publicarla en Vercel, importa el repo con el preset **Other**, sin comando de build ni carpeta de salida.

1. **Inicio**: elige qué vas a hacer.
2. **Asistente**: un paso por pregunta. Cada opción muestra su rango de precio, y abajo queda fijo el total estimado, que se actualiza en vivo. **Lo típico** marca la combinación chilena clásica del paso. **Armar con lo típico**, en el paso de personas, arma la lista completa de una vez.
3. **Tu lista**: los tres totales (mínimo, media y máximo), el costo por persona y la lista agrupada por pasillo. Puedes subir o bajar cada cantidad (el total se recalcula), copiar la lista, mandarla por WhatsApp o imprimirla.

Las respuestas se guardan en `localStorage`, así que no se pierden al recargar.

## Precios reales (scraper)

`scripts/precios/` busca cada producto del catálogo en los supermercados y calcula su mínimo, su media (mediana) y su máximo, siempre en la unidad del catálogo (por kg, por litro o por envase). Corre en GitHub Actions (`.github/workflows/precios.yml`):

- **Todos los lunes** en la madrugada, y también **a mano** desde la pestaña *Actions → Precios reales → Run workflow*. En `main` hace commit de `data/prices.js` y `data/prices-report.md`, y Vercel redespliega solo.
- **En otras ramas** corre en modo *dry-run*: muestra los precios en el log y el detalle de los productos sospechosos, sin hacer commit.
- **Frenos de seguridad**: primero corren los tests. Si calza menos del 60 % del catálogo no se escribe nada, y un producto con menos de 2 precios encontrados conserva su precio de respaldo (la lista lo marca como "precio referencial").

| Súper | Cómo se consulta |
|---|---|
| Jumbo | HTML de la búsqueda (JSON-LD y precio por unidad de cada tarjeta) |
| Unimarc | API del sitio (BFF) con headers de navegador |
| Tottus | API JSON del buscador |
| Lider | GraphQL del sitio; tiene anti-bot, así que se reintenta y, si bloquea, se sigue sin él |
| Santa Isabel | Hoy bloquea a GitHub (403); se activa con `PRECIOS_SANTA_ISABEL=1` |

Para revisar que los precios tengan sentido, abre `data/prices-report.md`: por cada producto lista qué ítems calzaron en cada súper, con precio y link.

```sh
node scripts/precios/index.mjs --dry                 # necesita acceso a los sitios
node scripts/precios/index.mjs --only=croissant,entrana
node scripts/precios/probe.mjs croissant "entraña"   # muestra la respuesta cruda de cada súper
```

## Tests

```sh
node --test
```

- `tests/calc.test.js`: el motor (pools, redondeo al envase, reglas, pasos condicionales, completos) y la consistencia del catálogo, los escenarios y las fichas.
- `tests/scraper.test.mjs`: la normalización del scraper, con nombres y precios reales vistos en los súper (tamaños como "1,5 L" o "6 x 350 cc", productos a granel por kg, exclusión de mascotas y cosméticos, etc.).

## Estructura

```
index.html              estructura, <dialog> de la ficha y scripts (clásicos, sin módulos ES)
css/base.css            paleta, tipografías, letras globo, tarjetas, washi tape (del portafolio)
css/app.css             pantallas, tarjetas de opción, ficha, resumen e impresión
js/icons.js             QC.icon(name): íconos SVG pastel con contorno café
js/diagrams.js          QC.diagram(animal, zona): vaca, cerdo, cordero, pollo y pescado
js/util.js              formato de pesos, cantidades y fechas
js/calc.js              motor de cantidades y precios (funciones puras, también corre en Node)
js/app.js               router por hash: #/ → #/e/<escenario>/<paso> → #/e/<escenario>/resumen
data/products/*.js      catálogo por pasillo: precios de respaldo y reglas de búsqueda
data/prices.js          precios reales (lo genera el scraper)
data/prices-report.md   detalle de dónde salió cada precio
data/cuts.js            fichas de los cortes
data/scenarios/*.js     un archivo por escenario
scripts/precios/        scraper (Node 22, sin dependencias)
tests/                  node:test
docs/                   plan original y referencias de estilo del portafolio
```

## Catálogo (`data/products/*.js`)

```js
croissant: { name: "Croissant", cat: "panaderia", unit: "croissant", plural: "croissants", step: 1,
             min: 690, avg: 890, max: 1290, icon: "croissant",
             q: "croissant", not: ["relleno", "mini", "jamon"], pack: { un: 1, g: 70 } }
```

| Campo | Qué es |
|---|---|
| `cat` | pasillo, uno de `QC.AISLES` (ordena la lista de compras) |
| `unit` / `plural` | unidad de compra y de precio: `"kg"`, `"L"` o una unidad contable (`"frasco"`, `"botella de 3 L"`…) |
| `step` | lo mínimo que se puede comprar: la cantidad se redondea hacia arriba a un múltiplo |
| `size` | kg que aporta 1 unidad a un pool (una bolsa de pan de molde ≈ 0,6 kg) |
| `min` / `avg` / `max` | precios de **respaldo**: `data/prices.js` los reemplaza por los reales |
| `q` | texto que el scraper busca en cada súper |
| `must` / `not` | palabras obligatorias o excluidas en el nombre (`[["a", "b"]]` = a o b; `"gorr*"` = prefijo) |
| `pack` | a qué equivale 1 unidad: `{ g }`, `{ ml }`, `{ un, g? }`; si falta, 1 kg, 1 L o el envase tal cual |
| `start`, `minSize`, `tol` | la palabra debe ir primero; envase mínimo en g; tolerancia de tamaño (por defecto 0,55 a 1,8) |
| `scrape: false` | no buscarlo (se queda con el precio de respaldo) |

## Escenarios (`data/scenarios/*.js`)

Un escenario es una lista de pasos declarativos. Para agregar uno, crea el archivo, inclúyelo en `index.html` y en `tests/calc.test.js`.

- `people`: adultos y niños (cuentan como media persona). Con `kids: false` es solo para adultos (carrete).
- `choice`: se elige una opción. Su `factor` multiplica las cantidades por persona (desayuno y once ×2, carrete largo ×1,8).
- `pick`: opciones de selección múltiple agrupadas. Acepta `min: 1`, `info: true` (botón ⓘ con la ficha de `data/cuts.js`) y `when: { step, any: [...] }` (el paso solo aparece si en otro se eligió alguna de esas opciones).

**Reglas de cantidad de una opción**

- `perPerson: 0.1`: por persona efectiva (× el factor). Con `adultsOnly: true`, solo para adultos.
- `pool: "carne"`: se reparte el total del pool entre las opciones elegidas; `weight` cambia la proporción.
- `fixed: 1, every: 8`: 1 unidad cada 8 personas (o 1 fija si no hay `every`).
- `items: [...]`: combo de varios productos (ensalada chilena = tomate + cebolla). Si el combo tiene su propio `pool`, sus ítems usan `per` (cantidad por unidad del pool): así, cada tipo de completo trae 1 pan, 1 vienesa, 50 g de palta…
- `typical: true`: la marca **Lo típico**.
