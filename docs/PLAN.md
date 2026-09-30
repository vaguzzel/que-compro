# Plan: "¿Qué compro?" — asistente de compras del supermercado

## Context
Cuando alguien tiene que ir al súper con un encargo vago ("tengo un asado con amigos", "compra cosas para el pan"), no sabe qué comprar, cuánto comprar ni cuánto le va a costar. La página guía al usuario por escenarios: le muestra todas las variantes posibles (cortes de carne, tipos de pan, agregados dulces o salados, bebidas…), calcula cantidades según el número de personas y entrega un presupuesto con **mínimo, media y máximo** en CLP a partir de precios de mercado.

Decisiones ya tomadas por la usuaria:
- Precios: **tabla curada en CLP** (mín/medio/máx por producto, sacados de Lider, Jumbo, Unimarc, Tottus y Santa Isabel), con fecha de actualización.
- Entrada: **escenarios guiados** paso a paso, todo en el navegador y sin IA.
- Stack: **HTML/CSS/JS puro**, igual que el portafolio (sin build).
- Repo: **`vaguzzel/que-compro`, público**.
- Íconos con el estilo de `vaguzzely-portafolio/fep/js/icons.js`.

## Estilo visual (reutilizado del portafolio)
- `fep/js/icons.js`: SVG con `viewBox="0 0 32 32"`, relleno pastel, contorno café `#3B2218` redondeado (`stroke-linejoin/linecap="round"`, grosor ~2.4) y detalle blanco. Se reutilizan el helper `a(fill, sw)`, las constantes `C, PINK, LAV, MINT, BUT, BLUE, W` y la API `icon(name, cls)`.
- `css/styles.css`: variables `--blush --bubblegum --lavender --mint --butter --baby-blue --choco-dark --cream`, fuentes Titan One / Nunito / Pacifico / Special Elite, `.bubble` (letras globo), `--shadow-sticker`, fondo de lunares, `.card`, `.lace` y footer `.wood`. Copio solo lo que se usa (base, bubble, card, header y footer) a `css/base.css`.

## Estructura del repo
Ruta local: `C:\Users\Valentina\Documents\GitHub\que-compro`
```
index.html            shell: header, <main id="app">, footer, scripts
css/base.css          paleta, tipografías, bubble, card, sticker (del portafolio)
css/app.css           tarjetas de opción, stepper, barra de rango de precios, resumen
js/icons.js           QC.icon(name) con íconos de comida nuevos, en el mismo estilo
js/util.js            formatCLP (Intl es-CL), escape, helpers del DOM
js/calc.js            motor de cantidades y precios (función pura, también corre en Node)
js/app.js             router por hash: #/ → #/e/<escenario>/<paso> → #/resumen
data/products.js      catálogo: id, nombre, categoría, unidad, tamaño de envase, min/avg/max, ícono
data/scenarios/*.js   asado.js, pan.js, picoteo.js (un archivo por escenario)
tests/calc.test.js    node:test sobre calc.js
README.md             qué es, cómo correrlo, cómo agregar escenarios y actualizar precios
```

## Modelo de datos
**Producto** (`data/products.js`):
```js
"entrana": { name:"Entraña", cat:"vacuno", unit:"kg", step:0.5, min:14990, avg:18990, max:24990, icon:"steak" }
"marraqueta": { name:"Marraqueta", cat:"pan", unit:"kg", step:0.25, min:1990, avg:2590, max:3290, icon:"marraqueta", hint:"≈10 unidades por kg" }
```
`QC.PRICES_UPDATED = "2026-09"`. Los precios son valores de referencia que armo al implementar y el README explica cómo actualizarlos. Si durante la implementación los sitios de los supermercados se pueden consultar, contrasto los valores con ellos.

**Escenario** (`data/scenarios/asado.js`): lista de pasos declarativos.
- `people`: adultos y niños (los niños cuentan como 0,5).
- `pick` (single o multi): opciones agrupadas; cada opción apunta a un producto y trae una regla de cantidad:
  - `perPerson` (p. ej. pan 0,1 kg por persona), o
  - `share` de un `pool` (p. ej. el pool "carne" = 0,4 kg por adulto se reparte entre los cortes elegidos), o
  - `fixed` (p. ej. 1 bolsa de carbón por cada 8 personas).
- `preset "Lo típico"`: un botón por escenario que preselecciona una combinación chilena clásica, para quien no tiene idea (el caso "mi mamá solo dijo 'cosas para el pan'").

Escenarios v1:
1. **Asado**: personas → carnes (vacuno: lomo vetado, entraña, asado de tira, punta paleta, plateada, sobrecostilla, tapapecho; cerdo: costillar, pulpa, chuleta; pollo: trutro, alitas; embutidos: longaniza, chorizo, prietas; veggie: choclo, champiñones, zapallo italiano, hamburguesa veggie) → acompañamientos (pan, ensalada chilena, lechuga, papas mayo, arroz, pebre) → bebestibles (bebida, cerveza, vino, jugo, agua, hielo) → para el fuego y la mesa (carbón, encendedor, servilletas, platos y vasos) → postre (opcional).
2. **Cosas para el pan**: ¿desayuno, once o ambos? → personas → tipo de pan (marraqueta, hallulla, pan de molde, integral, dobladita, frica, croissant) → salado (palta, jamón pierna/pavo/acaramelado, queso gauda/mantecoso, quesillo, huevos, tomate, mantequilla, paté) → dulce (mermelada, manjar, miel, crema de avellanas) → para tomar (té, café, leche, jugo).
3. **Picoteo o cumpleaños**: papas fritas, maní, galletas, torta, bebidas, vasos y platos.

## Motor de cálculo (`js/calc.js`)
`calculate(scenario, answers, products)` → `{ items:[{id, qty, unit, min, avg, max}], totals:{min, avg, max}, perPerson:{…} }`
1. Personas efectivas = adultos + 0,5 × niños.
2. Para cada opción elegida calcula la cantidad bruta según su regla (`perPerson`, parte del `pool` o `fixed`).
3. Redondea hacia arriba al envase comprable (`step`: 0,5 kg, 1 unidad, 1,5 L, etc.).
4. Costo = cantidad × precio min/avg/max. Suma los totales y calcula el total por persona.
Es una función pura, sin DOM, así que se puede testear con `node --test`.

## Pantallas (`js/app.js`)
1. **Inicio**: título con letras globo, "¿Qué vas a hacer?" y tarjetas-sticker de escenarios, cada una con su ícono.
2. **Asistente**: una pregunta por paso, barra de progreso y botones Atrás/Siguiente. Las opciones son tarjetas con ícono, nombre y rango "$min – $max /kg", agrupadas por subcategoría, con "Lo típico" y "Limpiar". Un mini total estimado queda fijo abajo y se actualiza en vivo.
3. **Resumen**: lista de compras agrupada por pasillo, con cantidad editable (stepper que recalcula), precio medio y rango por ítem. Arriba van tres tarjetas grandes: **Mínimo · Media · Máximo** y el total por persona. Acciones: copiar la lista, compartir por WhatsApp (`wa.me/?text=`), imprimir y volver a editar.
- El estado se guarda en `localStorage` para no perderlo al recargar. La navegación es accesible (botones reales, `aria-pressed` en las opciones, foco visible `outline dashed fuchsia` como en el portafolio) y el diseño es mobile-first, porque se usa en el súper desde el celular.

## Íconos nuevos (`js/icons.js`, mismo patrón que FEP)
Escenarios: `grill`, `breadBasket`, `party`. Comida: `steak`, `ribs`, `chickenLeg`, `sausage`, `corn`, `mushroom`, `marraqueta`, `hallulla`, `loaf`, `croissant`, `avocado`, `ham`, `cheese`, `egg`, `butter`, `jam`, `honey`, `tomato`, `lettuce`, `potato`, `rice`, `soda`, `beer`, `wine`, `water`, `juice`, `milk`, `coffee`, `tea`, `ice`, `charcoal`, `napkin`, `cake`, `chips`. UI: `cart`, `people`, `plus`, `minus`, `copy`, `share`, `check`, `flame` (copiado de FEP). Si falta un ícono, se usa uno genérico (`basket`).

## Ejecución en la nube (la usuaria va a apagar el computador)
- Desde este PC solo hago lo mínimo, en menos de un minuto: crear `vaguzzel/que-compro` público en GitHub con un commit inicial que incluya `README.md` y este plan como `docs/PLAN.md`.
- El resto (pasos 2 a 7 y la verificación) lo hace una **sesión de Claude Code en la nube** sobre ese repo, que trabaja en una rama y hace push al terminar. Primero intento con un agente remoto (`isolation: "remote"`); si no está disponible, uso una rutina de una sola ejecución (skill `schedule`) apuntando al repo.
- La sesión en la nube hace commit y push por etapas, para que el avance quede en GitHub aunque se corte.
- Cuando se apague el PC, la ruta local ya no importa: todo vive en el repo.

## Pasos de ejecución
1. Crear la carpeta y hacer `git init` con rama `main`.
2. Escribir `css/base.css` (extraído del portafolio) y `js/icons.js`, y revisar los íconos en una página de muestra temporal.
3. `data/products.js` y los 3 escenarios.
4. `js/calc.js` y `tests/calc.test.js`.
5. `js/app.js`, `index.html` y `css/app.css`.
6. README.
7. Primer commit y `gh repo create vaguzzel/que-compro --public --source . --push` (gh está en `C:\Program Files\GitHub CLI\gh.exe`, logueado como vaguzzel).
8. Publicarlo (Vercel o GitHub Pages) queda **fuera** de este plan: se lo pregunto a la usuaria al final.

## Verificación
- `node --test tests/` con casos del motor: 10 adultos + 2 niños en el asado con 2 cortes, que el pool se reparta y redondee bien y que se cumpla min ≤ avg ≤ max; pan para 4 personas con "Lo típico".
- Servir la carpeta en local (`npx serve` o `python -m http.server`) y recorrer con Playwright los dos casos de uso: (a) asado para 8 con entraña y longaniza, que llegue al resumen con los tres totales y que editar una cantidad los recalcule; (b) "cosas para el pan" solo con "Lo típico". Tomar capturas en móvil (390px) y en escritorio para revisar el estilo kawaii y los íconos.
- Revisar que no haya errores en la consola y que funcione al abrir `index.html` directo (sin módulos ES, con scripts clásicos como en FEP).
- Confirmar que el repo quedó público en GitHub con el commit inicial.
