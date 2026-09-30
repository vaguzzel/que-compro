// Tests del motor de cálculo: node --test tests/
const test = require("node:test");
const assert = require("node:assert/strict");

require("../data/products.js");
require("../data/scenarios/asado.js");
require("../data/scenarios/pan.js");
require("../data/scenarios/picoteo.js");
require("../js/icons.js");
const calc = require("../js/calc.js");

const QC = globalThis.QC;
const P = QC.PRODUCTS;
const scenario = (id) => QC.SCENARIOS.find((s) => s.id === id);
const item = (res, id) => res.items.find((it) => it.id === id);

function assertOrdered(res) {
  for (const it of res.items) {
    assert.ok(it.min <= it.avg && it.avg <= it.max, `${it.id}: ${it.min} ≤ ${it.avg} ≤ ${it.max}`);
  }
  assert.ok(res.totals.min <= res.totals.avg && res.totals.avg <= res.totals.max);
}

test("personas efectivas: los niños cuentan como 0,5", () => {
  assert.equal(calc.effectivePeople({ people: { adults: 10, kids: 2 } }), 11);
  assert.equal(calc.effectivePeople({ people: { adults: 3, kids: 0 } }), 3);
  assert.equal(calc.effectivePeople({}), 0);
});

test("redondeo hacia arriba al envase", () => {
  assert.equal(calc.roundUpToStep(2.2, 0.5), 2.5);
  assert.equal(calc.roundUpToStep(2.5, 0.5), 2.5);
  assert.equal(calc.roundUpToStep(0.24, 0.25), 0.25);
  assert.equal(calc.roundUpToStep(0.3, 0.1), 0.3); // sin errores de coma flotante
  assert.equal(calc.roundUpToStep(13, 6), 18);
  assert.equal(calc.roundUpToStep(0, 1), 0);
});

test("asado 10 adultos + 2 niños con 2 cortes: el pool se reparte y redondea", () => {
  const res = calc.calculate(scenario("asado"), {
    people: { adults: 10, kids: 2 },
    picks: { carnes: ["entrana", "punta_paleta"] }
  }, P);
  // 11 personas efectivas × 0,4 kg = 4,4 kg → 2,2 kg por corte → 2,5 kg
  assert.equal(res.items.length, 2);
  assert.equal(item(res, "entrana").qty, 2.5);
  assert.equal(item(res, "punta_paleta").qty, 2.5);
  assert.equal(item(res, "entrana").avg, Math.round(2.5 * P.entrana.avg));
  assert.equal(res.totals.avg, item(res, "entrana").avg + item(res, "punta_paleta").avg);
  assert.equal(res.perPerson.avg, Math.round(res.totals.avg / 12));
  assertOrdered(res);
});

test("asado para 8 con entraña y longaniza: el embutido cuenta como media parte", () => {
  const res = calc.calculate(scenario("asado"), {
    people: { adults: 8, kids: 0 },
    picks: { carnes: ["entrana", "longaniza"] }
  }, P);
  // 3,2 kg de pool con pesos 1 y 0,5 → 2,13 kg y 1,07 kg
  assert.equal(item(res, "entrana").qty, 2.5);
  assert.equal(item(res, "longaniza").qty, 1.5);
});

test("reglas fixed y adultsOnly", () => {
  const res = calc.calculate(scenario("asado"), {
    people: { adults: 6, kids: 4 },
    picks: { bebestibles: ["cerveza"], fuego: ["carbon", "encendedor"] }
  }, P);
  assert.equal(item(res, "cerveza").qty, 18); // 6 adultos × 3 latas, packs de 6
  assert.equal(item(res, "carbon").qty, 2); // 10 personas → 1 saco cada 8
  assert.equal(item(res, "encendedor").qty, 1);
});

test("los combos suman el mismo producto (ensalada chilena + pebre)", () => {
  const res = calc.calculate(scenario("asado"), {
    people: { adults: 10, kids: 0 },
    picks: { acompanamientos: ["ensalada_chilena", "pebre"] }
  }, P);
  // tomate: 10 × (0,12 + 0,04) = 1,6 kg → 2 kg
  assert.equal(item(res, "tomate").qty, 2);
  assert.equal(res.items.filter((it) => it.id === "tomate").length, 1);
  assert.equal(item(res, "cilantro").qty, 1);
});

test("pan para 4 personas con Lo típico", () => {
  const s = scenario("pan");
  const res = calc.calculate(s, { people: { adults: 4, kids: 0 }, picks: calc.typicalPicks(s) }, P);
  // once (×1): 4 × 0,12 kg = 0,48 kg repartidos entre marraqueta y hallulla
  assert.equal(item(res, "marraqueta").qty, 0.25);
  assert.equal(item(res, "hallulla").qty, 0.25);
  assert.equal(item(res, "jamon_pierna").qty, 0.25);
  assert.equal(item(res, "queso_gauda").qty, 0.25);
  assert.equal(item(res, "mantequilla").qty, 1);
  assert.ok(res.totals.avg > 0);
  assertOrdered(res);
});

test("desayuno y once cuenta doble; el pan de molde se pide por bolsa", () => {
  const s = scenario("pan");
  const res = calc.calculate(s, {
    people: { adults: 4, kids: 0 },
    picks: { comida: ["ambos"], panes: ["pan_molde"] }
  }, P);
  // 4 × 0,12 × 2 = 0,96 kg → bolsas de 0,6 kg → 2 bolsas
  assert.equal(item(res, "pan_molde").qty, 2);
});

test("la cantidad editada reemplaza la calculada y recalcula el total", () => {
  const s = scenario("asado");
  const answers = { people: { adults: 8, kids: 0 }, picks: { carnes: ["entrana", "longaniza"] } };
  const before = calc.calculate(s, answers, P);
  const after = calc.calculate(s, { ...answers, overrides: { entrana: 3 } }, P);
  assert.equal(item(after, "entrana").qty, 3);
  assert.equal(item(after, "entrana").edited, true);
  assert.equal(after.totals.avg - before.totals.avg, Math.round(0.5 * P.entrana.avg));
});

test("sin personas no hay nada que comprar", () => {
  const res = calc.calculate(scenario("asado"), {
    people: { adults: 0, kids: 0 },
    picks: { carnes: ["entrana"], fuego: ["encendedor"] }
  }, P);
  assert.equal(res.totals.avg, 0);
  assert.deepEqual(res.perPerson, { min: 0, avg: 0, max: 0 });
});

test("catálogo y escenarios consistentes", () => {
  for (const [id, p] of Object.entries(P)) {
    assert.ok(p.min <= p.avg && p.avg <= p.max, `precios de ${id}`);
    assert.ok(p.step > 0, `step de ${id}`);
    assert.ok(QC.AISLES.some((a) => a.id === p.cat), `pasillo de ${id}`);
    assert.ok(QC.hasIcon(p.icon), `ícono de ${id}: ${p.icon}`);
  }
  for (const s of QC.SCENARIOS) {
    assert.ok(QC.hasIcon(s.icon), `ícono del escenario ${s.id}`);
    const ids = new Set();
    for (const step of s.steps) {
      assert.ok(!ids.has(step.id), `paso repetido ${s.id}/${step.id}`);
      ids.add(step.id);
      if (step.type !== "pick") continue;
      const optIds = new Set();
      for (const o of calc.allOptions(step)) {
        const oid = calc.optionId(o);
        assert.ok(!optIds.has(oid), `opción repetida ${s.id}/${step.id}/${oid}`);
        optIds.add(oid);
        if (o.icon) assert.ok(QC.hasIcon(o.icon), `ícono de ${oid}`);
        for (const r of o.items || [o]) {
          assert.ok(P[r.product], `producto ${r.product} en ${s.id}`);
          if (r.pool) assert.ok(s.pools[r.pool], `pool ${r.pool} en ${s.id}`);
        }
      }
    }
    // "Lo típico" de todo el escenario produce una lista con precios ordenados
    const res = calc.calculate(s, { people: { adults: 6, kids: 2 }, picks: calc.typicalPicks(s) }, P);
    assert.ok(res.items.length > 0, `lo típico de ${s.id}`);
    assertOrdered(res);
  }
});
