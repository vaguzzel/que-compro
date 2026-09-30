// Motor de cantidades y precios. Funciones puras (sin DOM): corre en el
// navegador y en Node (node --test tests/).
(function (root) {
  var QC = root.QC = root.QC || {};

  var EPS = 1e-9;

  function round3(n) { return Math.round(n * 1000) / 1000; }

  // Redondea hacia arriba al envase comprable más cercano.
  function roundUpToStep(qty, step) {
    if (!(qty > 0)) return 0;
    step = step || 1;
    return round3(Math.ceil(qty / step - EPS) * step);
  }

  function people(answers) {
    var p = (answers && answers.people) || {};
    var adults = Math.max(0, Math.floor(+p.adults || 0));
    var kids = Math.max(0, Math.floor(+p.kids || 0));
    return { adults: adults, kids: kids, heads: adults + kids, effective: adults + 0.5 * kids };
  }

  // Personas efectivas = adultos + 0,5 × niños
  function effectivePeople(answers) { return people(answers).effective; }

  // Un paso con `when: { step, any:[…] }` solo se muestra (y solo cuenta) si en
  // ese otro paso se eligió alguna de esas opciones.
  function isStepVisible(step, answers) {
    if (!step.when) return true;
    var chosen = ((answers && answers.picks) || {})[step.when.step] || [];
    return step.when.any.some(function (id) { return chosen.indexOf(id) !== -1; });
  }

  function visibleSteps(scenario, answers) {
    return scenario.steps.filter(function (s) { return isStepVisible(s, answers); });
  }

  // Recorre las opciones elegidas en los pasos "pick" y las de los pasos
  // "choice" (que solo aportan un factor multiplicador, p. ej. desayuno y once).
  function selection(scenario, answers) {
    var picks = (answers && answers.picks) || {};
    var chosen = [], factor = 1;
    scenario.steps.forEach(function (step) {
      if (!isStepVisible(step, answers)) return;
      var ids = picks[step.id] || [];
      if (step.type === "choice") {
        step.options.forEach(function (o) {
          if (ids.indexOf(o.id) !== -1 && o.factor) factor *= o.factor;
        });
      } else if (step.type === "pick") {
        allOptions(step).forEach(function (o) {
          if (ids.indexOf(optionId(o)) !== -1) chosen.push(o);
        });
      }
    });
    return { options: chosen, factor: factor };
  }

  function allOptions(step) {
    var out = [];
    (step.groups || []).forEach(function (g) { out = out.concat(g.options); });
    return out;
  }

  function optionId(o) { return o.id || o.product; }

  // Una opción puede ser un producto con su regla o un combo con varios items
  function parts(option) { return option.items || [option]; }

  // Cantidades sin redondear por producto
  function rawQuantities(scenario, answers, products) {
    var ppl = people(answers);
    var sel = selection(scenario, answers);
    var pools = scenario.pools || {};

    // Peso total elegido en cada pool, para repartirlo. Un combo con `pool` propio
    // (p. ej. "Completo italiano") cuenta como una sola parte del pool.
    var poolWeight = {};
    function addWeight(pool, w) { poolWeight[pool] = (poolWeight[pool] || 0) + (w || 1); }
    sel.options.forEach(function (o) {
      if (o.pool && o.items) addWeight(o.pool, o.weight);
      else parts(o).forEach(function (r) { if (r.pool) addWeight(r.pool, r.weight); });
    });
    function poolTotal(name) {
      var pool = pools[name];
      if (!pool) throw new Error("Pool desconocido: " + name);
      return (pool.adultsOnly ? ppl.adults : ppl.effective) * pool.perPerson * sel.factor;
    }

    var raw = {}, order = [];
    sel.options.forEach(function (o) {
      // Parte del pool que le toca al combo completo; cada ítem lleva `per` unidades por cada una
      var share = o.pool && o.items ? poolTotal(o.pool) * (o.weight || 1) / poolWeight[o.pool] : null;
      parts(o).forEach(function (r) {
        var p = products[r.product];
        if (!p) throw new Error("Producto desconocido: " + r.product);
        var base = r.adultsOnly ? ppl.adults : ppl.effective;
        var q = 0;
        if (share != null && r.per != null) {
          q = share * r.per / (p.size || 1);
        } else if (r.pool) {
          q = poolTotal(r.pool) * (r.weight || 1) / poolWeight[r.pool] / (p.size || 1);
        } else if (r.perPerson != null) {
          q = base * r.perPerson * sel.factor;
        } else if (r.fixed != null) {
          q = ppl.heads > 0 ? r.fixed * (r.every ? Math.ceil(ppl.heads / r.every) : 1) : 0;
        }
        if (!(r.product in raw)) { raw[r.product] = 0; order.push(r.product); }
        raw[r.product] += q;
      });
    });
    return { raw: raw, order: order, people: ppl, factor: sel.factor };
  }

  // calculate(scenario, answers, products) →
  //   { items:[{id, name, cat, icon, unit, qty, auto, min, avg, max, edited}],
  //     totals:{min, avg, max}, perPerson:{min, avg, max}, people:{…} }
  // answers = { people:{adults, kids}, picks:{ stepId:[optionId…] }, overrides:{ productId: qty } }
  function calculate(scenario, answers, products) {
    var r = rawQuantities(scenario, answers, products);
    var overrides = (answers && answers.overrides) || {};
    var aisleOrder = (QC.AISLES || []).map(function (a) { return a.id; });

    var items = r.order.map(function (id, i) {
      var p = products[id];
      var auto = roundUpToStep(r.raw[id], p.step);
      var edited = overrides[id] != null && isFinite(overrides[id]);
      var qty = edited ? Math.max(0, round3(+overrides[id])) : auto;
      return {
        id: id, name: p.name, cat: p.cat, icon: p.icon, unit: p.unit, plural: p.plural, step: p.step || 1,
        qty: qty, auto: auto, edited: edited && qty !== auto,
        min: Math.round(qty * p.min), avg: Math.round(qty * p.avg), max: Math.round(qty * p.max),
        _i: i
      };
    });

    // Orden: por pasillo y, dentro del pasillo, en el orden del escenario
    items.sort(function (a, b) {
      var d = aisleIndex(aisleOrder, a.cat) - aisleIndex(aisleOrder, b.cat);
      return d || a._i - b._i;
    });
    items.forEach(function (it) { delete it._i; });

    var totals = { min: 0, avg: 0, max: 0 };
    items.forEach(function (it) { totals.min += it.min; totals.avg += it.avg; totals.max += it.max; });

    var heads = r.people.heads;
    var perPerson = heads > 0
      ? { min: Math.round(totals.min / heads), avg: Math.round(totals.avg / heads), max: Math.round(totals.max / heads) }
      : { min: 0, avg: 0, max: 0 };

    return { items: items, totals: totals, perPerson: perPerson, people: r.people, factor: r.factor };
  }

  function aisleIndex(order, cat) {
    var i = order.indexOf(cat);
    return i === -1 ? order.length : i;
  }

  // Costo estimado de una sola opción, como si fuera lo único elegido en su paso
  // (sirve para mostrar el rango de los combos, p. ej. "Ensalada chilena").
  function estimateOption(scenario, answers, stepId, option, products) {
    var picks = {};
    scenario.steps.forEach(function (s) { if (s.type === "choice") picks[s.id] = ((answers || {}).picks || {})[s.id] || []; });
    picks[stepId] = [optionId(option)];
    return calculate(scenario, { people: (answers || {}).people, picks: picks }, products).totals;
  }

  // Selección "Lo típico" de un paso (o de todo el escenario si no se indica paso)
  function typicalPicks(scenario, stepId) {
    var out = {};
    scenario.steps.forEach(function (s) {
      if (stepId && s.id !== stepId) return;
      if (s.type === "choice") {
        out[s.id] = s.options.filter(function (o) { return o.typical; }).map(function (o) { return o.id; });
      } else if (s.type === "pick") {
        out[s.id] = allOptions(s).filter(function (o) { return o.typical; }).map(optionId);
      }
    });
    return out;
  }

  QC.calc = {
    roundUpToStep: roundUpToStep,
    effectivePeople: effectivePeople,
    people: people,
    calculate: calculate,
    estimateOption: estimateOption,
    typicalPicks: typicalPicks,
    isStepVisible: isStepVisible,
    visibleSteps: visibleSteps,
    allOptions: allOptions,
    optionId: optionId
  };

  if (typeof module !== "undefined" && module.exports) module.exports = QC.calc;
})(typeof window !== "undefined" ? window : globalThis);
