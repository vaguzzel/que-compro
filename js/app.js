// Interfaz: router por hash, asistente paso a paso y lista de compras.
//   #/                     inicio (elige escenario)
//   #/e/<escenario>/<n>    paso n del asistente (desde 0)
//   #/e/<escenario>/resumen lista de compras con presupuesto
(function () {
  var QC = window.QC, calc = QC.calc, P = QC.PRODUCTS, U = QC.util;
  var fmt = U.formatCLP, esc = U.esc, icon = QC.icon;
  var KEY = "que-compro:v1";
  var app = document.getElementById("app");
  var live = document.getElementById("live");

  /* ---------------- Estado (localStorage) ---------------- */
  var state = { answers: {} };
  try {
    var saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && saved.answers) state = saved;
  } catch (e) { /* sin localStorage: se trabaja en memoria */ }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* nada */ }
  }

  function answersFor(sc) {
    var a = state.answers[sc.id] || (state.answers[sc.id] = {});
    a.people = a.people || { adults: 4, kids: 0 };
    a.picks = a.picks || {};
    a.overrides = a.overrides || {};
    return a;
  }

  function scenarioById(id) {
    return QC.SCENARIOS.filter(function (s) { return s.id === id; })[0];
  }

  /* ---------------- Router ---------------- */
  function route() {
    var parts = location.hash.replace(/^#\/?/, "").split("/");
    var sc = parts[0] === "e" && scenarioById(parts[1]);
    if (!sc) return { view: "home" };
    if (parts[2] === "resumen") return { view: "summary", sc: sc };
    var i = parseInt(parts[2], 10);
    if (!(i >= 0 && i < sc.steps.length)) i = 0;
    return { view: "step", sc: sc, i: i };
  }

  function stepHref(sc, i) { return "#/e/" + sc.id + "/" + i; }
  function summaryHref(sc) { return "#/e/" + sc.id + "/resumen"; }

  var lastRouteKey = null, restoreFocus = null;

  function render() {
    var r = route();
    var key = location.hash;
    var html, title;
    if (r.view === "step") { html = viewStep(r.sc, r.i); title = r.sc.name; }
    else if (r.view === "summary") { html = viewSummary(r.sc); title = "Lista para " + r.sc.name.toLowerCase(); }
    else { html = viewHome(); title = null; }
    app.innerHTML = html;
    fixAccents(app);
    app.setAttribute("data-route", key);
    document.title = (title ? title + " · " : "") + "¿Qué compro?";
    document.body.classList.toggle("has-minibar", r.view === "step");

    if (restoreFocus) {
      var el = U.$(restoreFocus, app);
      if (el) el.focus({ preventScroll: true });
      restoreFocus = null;
    } else if (key !== lastRouteKey) {
      // Cambio de pantalla: arriba y foco en el título, para lectores de pantalla
      window.scrollTo(0, 0);
      var h = U.$("[data-autofocus]", app);
      if (h && lastRouteKey !== null) h.focus({ preventScroll: true });
    }
    lastRouteKey = key;
  }

  // Titan One dibuja la "í" minúscula sin tilde: en los textos con esa fuente
  // se envuelve en un <span class="acc"> que usa Nunito.
  var TITAN = ".bubble, .btn, .step-title, .scenario__name, .aisle__name, .counter__label, .total__value, .minibar__avg";
  function fixAccents(rootEl) {
    U.$$(TITAN, rootEl).forEach(function (el) {
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [], n;
      while ((n = walker.nextNode())) if (n.nodeValue.indexOf("í") !== -1 && !n.parentNode.classList.contains("acc")) nodes.push(n);
      nodes.forEach(function (t) {
        // Un solo span por texto, para no romper los contenedores flex con gap
        var wrap = document.createElement("span");
        t.nodeValue.split(/(í)/).forEach(function (part) {
          if (part === "í") { var s = document.createElement("span"); s.className = "acc"; s.textContent = part; wrap.appendChild(s); }
          else if (part) wrap.appendChild(document.createTextNode(part));
        });
        t.parentNode.replaceChild(wrap, t);
      });
    });
  }

  // Vuelve a pintar la misma pantalla y devuelve el foco al control que se usó
  function rerender(focusSelector) {
    restoreFocus = focusSelector || null;
    save();
    render();
  }

  function announce(msg) { live.textContent = ""; setTimeout(function () { live.textContent = msg; }, 30); }

  /* ---------------- Textos ---------------- */
  function peopleText(p) {
    var parts = [];
    if (p.adults) parts.push(p.adults + (p.adults === 1 ? " adulto" : " adultos"));
    if (p.kids) parts.push(p.kids + (p.kids === 1 ? " niño" : " niños"));
    return parts.join(" y ") || "nadie todavía";
  }

  function range(min, max) { return fmt(min) + " – " + fmt(max); }

  function choiceText(sc, a) {
    var out = [];
    sc.steps.forEach(function (s) {
      if (s.type !== "choice") return;
      s.options.forEach(function (o) { if ((a.picks[s.id] || []).indexOf(o.id) !== -1) out.push(o.name); });
    });
    return out.join(", ");
  }

  /* ---------------- Inicio ---------------- */
  function viewHome() {
    var cards = QC.SCENARIOS.map(function (sc, n) {
      var a = state.answers[sc.id];
      var started = a && Object.keys(a.picks || {}).some(function (k) { return (a.picks[k] || []).length; });
      return '<li><a class="scenario card scenario--' + esc(sc.color) + '" href="' + stepHref(sc, 0) + '" style="--tilt:' + [-1.5, 1, -0.5][n % 3] + 'deg">' +
        '<span class="scenario__ico">' + icon(sc.icon) + "</span>" +
        '<span class="scenario__name">' + esc(sc.name) + "</span>" +
        '<span class="scenario__tag">' + esc(sc.tagline) + "</span>" +
        (started ? '<span class="tape tape--sm tape--mint scenario__badge">Tienes una lista a medias</span>' : "") +
        "</a></li>";
    }).join("");
    return '<section class="home">' +
      '<h1 class="home__title" tabindex="-1" data-autofocus><span class="bubble bubble--lavender">¿Qué</span> <span class="bubble bubble--choco">compro?</span></h1>' +
      '<p class="home__lead">Elige qué vas a hacer y te digo <strong>qué comprar, cuánto</strong> y <strong>cuánto te va a salir</strong>, con el mínimo, la media y el máximo del súper.</p>' +
      '<h2 class="home__ask"><span class="tape tape--tilt-left">¿Qué vas a hacer?</span></h2>' +
      '<ul class="scenarios" role="list">' + cards + "</ul>" +
      "</section>";
  }

  /* ---------------- Asistente ---------------- */
  function stepError(sc, step, a) {
    var ppl = calc.people(a);
    if (step.type === "people") return ppl.heads < 1 ? "Agrega al menos una persona." : "";
    var n = (a.picks[step.id] || []).length;
    if (step.type === "choice") return n < 1 ? "Elige una opción para seguir." : "";
    if (step.min && n < step.min) return "Elige al menos una opción para seguir.";
    return "";
  }

  function viewStep(sc, i) {
    var step = sc.steps[i], a = answersFor(sc), total = sc.steps.length;
    var res = calc.calculate(sc, a, P);
    var err = stepError(sc, step, a);
    var last = i === total - 1;

    var body;
    if (step.type === "people") body = viewPeople(sc, a);
    else if (step.type === "choice") body = viewChoice(step, a);
    else body = viewPick(sc, step, a, res);

    var tools = "";
    if (step.type === "pick" || step.type === "choice") {
      tools = '<div class="step-tools">' +
        '<button type="button" class="btn btn--sm btn--butter" data-action="typical" data-step="' + step.id + '">' + icon("sparkle") + "Lo típico</button>" +
        (step.type === "pick" ? '<button type="button" class="btn btn--sm" data-action="clear" data-step="' + step.id + '">' + icon("redo") + "Limpiar</button>" : "") +
        "</div>";
    }

    var pct = Math.round(((i + 1) / (total + 1)) * 100);
    return '<section class="wizard">' +
      '<div class="wizard__top">' +
      '<a class="crumb" href="#/">' + icon("arrowLeft") + "Escenarios</a>" +
      '<span class="tape tape--sm tape--tilt-right">' + icon(sc.icon) + " " + esc(sc.name) + "</span>" +
      "</div>" +
      '<div class="progress" role="progressbar" aria-label="Avance" aria-valuemin="1" aria-valuemax="' + total + '" aria-valuenow="' + (i + 1) + '" aria-valuetext="Paso ' + (i + 1) + " de " + total + '">' +
      '<span class="progress__bar" style="width:' + pct + '%"></span></div>' +
      '<p class="progress__label">Paso ' + (i + 1) + " de " + total + "</p>" +
      '<h1 class="step-title" tabindex="-1" data-autofocus>' + esc(step.title) + "</h1>" +
      (step.help ? '<p class="step-help">' + esc(step.help) + "</p>" : "") +
      tools + body +
      '<nav class="wizard__nav" aria-label="Pasos">' +
      (i > 0
        ? '<a class="btn" href="' + stepHref(sc, i - 1) + '">' + icon("arrowLeft") + "Atrás</a>"
        : '<a class="btn" href="#/">' + icon("arrowLeft") + "Atrás</a>") +
      '<button type="button" class="btn btn--pink" data-action="next" data-next="' + (last ? summaryHref(sc) : stepHref(sc, i + 1)) + '"' +
      (err ? ' disabled aria-describedby="step-error"' : "") + ">" +
      (last ? "Ver mi lista" + icon("cart") : "Siguiente" + icon("arrowRight")) + "</button>" +
      "</nav>" +
      '<p class="step-error" id="step-error" role="status">' + esc(err) + "</p>" +
      "</section>" + viewMinibar(sc, res);
  }

  function viewMinibar(sc, res) {
    var has = res.items.length > 0;
    return '<aside class="minibar" aria-label="Total estimado">' +
      '<span class="minibar__ico">' + icon("cart") + "</span>" +
      '<span class="minibar__text">' +
      (has
        ? '<span class="minibar__label">Estimado</span> <strong class="minibar__avg" data-total>' + fmt(res.totals.avg) + "</strong>" +
          '<span class="minibar__range" data-range>entre ' + range(res.totals.min, res.totals.max) + "</span>"
        : '<span class="minibar__label">Todavía no hay nada en el carro</span>') +
      "</span>" +
      (has ? '<a class="btn btn--sm btn--mint" href="' + summaryHref(sc) + '">Ver lista</a>' : "") +
      "</aside>";
  }

  function viewPeople(sc, a) {
    function counter(field, label, sub, ico, min) {
      var v = a.people[field] || 0;
      return '<div class="counter card card--small">' +
        '<span class="sticker">' + icon(ico) + "</span>" +
        '<label class="counter__label" for="in-' + field + '">' + label + (sub ? '<small>' + sub + "</small>" : "") + "</label>" +
        '<div class="stepper">' +
        '<button type="button" class="stepper__btn" data-action="people" data-field="' + field + '" data-delta="-1" aria-label="Quitar un ' + (field === "kids" ? "niño" : "adulto") + '"' + (v <= min ? " disabled" : "") + ">" + icon("minus") + "</button>" +
        '<input class="stepper__input" id="in-' + field + '" data-people="' + field + '" type="number" inputmode="numeric" min="0" max="200" value="' + v + '">' +
        '<button type="button" class="stepper__btn" data-action="people" data-field="' + field + '" data-delta="1" aria-label="Agregar un ' + (field === "kids" ? "niño" : "adulto") + '">' + icon("plus") + "</button>" +
        "</div></div>";
    }
    return '<div class="people">' +
      counter("adults", "Adultos", "", "people", 0) +
      counter("kids", "Niños", "cuentan como media porción", "child", 0) +
      "</div>" +
      '<div class="typical-all card card--small">' +
      '<p><strong>¿No tienes idea?</strong> Te armo la lista con lo típico chileno y después la ajustas.</p>' +
      '<button type="button" class="btn btn--butter" data-action="typical-all">' + icon("sparkle") + "Armar con lo típico</button>" +
      "</div>";
  }

  function viewChoice(step, a) {
    var chosen = a.picks[step.id] || [];
    return '<div class="options options--choice" role="group" aria-label="' + esc(step.title) + '">' +
      step.options.map(function (o) {
        var on = chosen.indexOf(o.id) !== -1;
        return '<button type="button" class="opt" data-action="toggle" data-step="' + step.id + '" data-opt="' + o.id + '" aria-pressed="' + on + '">' +
          '<span class="opt__ico">' + icon(o.icon) + "</span>" +
          '<span class="opt__body"><span class="opt__name">' + esc(o.name) + "</span>" +
          (o.factor > 1 ? '<span class="opt__hint">Cantidades × ' + o.factor + "</span>" : "") + "</span>" +
          '<span class="opt__check">' + icon("check") + "</span></button>";
      }).join("") + "</div>";
  }

  function viewPick(sc, step, a, res) {
    var chosen = a.picks[step.id] || [];
    var qtyById = {};
    res.items.forEach(function (it) { qtyById[it.id] = it; });

    return step.groups.map(function (g, gi) {
      var gid = "g-" + step.id + "-" + gi;
      return '<div class="group">' +
        '<h2 class="group__name" id="' + gid + '"><span class="tape tape--sm ' + ["", "tape--mint", "tape--lavender", "tape--butter", "tape--blue"][gi % 5] + '">' + esc(g.name) + "</span></h2>" +
        '<div class="options" role="group" aria-labelledby="' + gid + '">' +
        g.options.map(function (o) {
          var id = calc.optionId(o), on = chosen.indexOf(id) !== -1;
          var p = o.items ? null : P[o.product];
          var name = o.name || p.name, ico = o.icon || p.icon, price, extra = "";
          if (p) {
            price = range(p.min, p.max) + " " + U.priceUnit(p.unit);
            var it = qtyById[o.product];
            if (on && it) extra = '<span class="opt__qty">Llevas ' + esc(U.formatQty(it.qty, it.unit, it.plural)) + "</span>";
            else if (p.hint) extra = '<span class="opt__hint">' + esc(p.hint) + "</span>";
          } else {
            var est = calc.estimateOption(sc, a, step.id, o, P);
            price = "≈ " + range(est.min, est.max) + " en total";
            extra = '<span class="opt__hint">' + esc(o.items.map(function (r) { return P[r.product].name; }).join(", ")) + "</span>";
          }
          return '<button type="button" class="opt" data-action="toggle" data-step="' + step.id + '" data-opt="' + id + '" aria-pressed="' + on + '">' +
            '<span class="opt__ico">' + icon(ico) + "</span>" +
            '<span class="opt__body"><span class="opt__name">' + esc(name) + "</span>" +
            '<span class="opt__price">' + price + "</span>" + extra + "</span>" +
            '<span class="opt__check">' + icon("check") + "</span></button>";
        }).join("") +
        "</div></div>";
    }).join("");
  }

  /* ---------------- Resumen ---------------- */
  function viewSummary(sc) {
    var a = answersFor(sc);
    var res = calc.calculate(sc, a, P);
    var ppl = res.people;
    var choice = choiceText(sc, a);
    var head = '<div class="wizard__top">' +
      '<a class="crumb" href="' + stepHref(sc, 0) + '">' + icon("pencil") + "Editar respuestas</a>" +
      '<span class="tape tape--sm tape--tilt-right">' + icon(sc.icon) + " " + esc(sc.name) + "</span></div>" +
      '<h1 class="summary__title" tabindex="-1" data-autofocus><span class="bubble bubble--lavender">Tu lista</span></h1>' +
      '<p class="summary__who">' + icon("people") + " " + esc(sc.name) + (choice ? " · " + esc(choice) : "") + " para " + esc(peopleText(ppl)) + "</p>";

    if (!res.items.length) {
      return '<section class="summary">' + head +
        '<div class="card empty"><p>Todavía no hay nada en la lista. Vuelve al asistente y elige lo que quieres llevar.</p>' +
        '<a class="btn btn--pink" href="' + stepHref(sc, 0) + '">' + icon("arrowLeft") + "Ir al asistente</a></div></section>";
    }

    var t = res.totals, pp = res.perPerson;
    var totals = '<div class="totals">' +
      totalCard("min", "Mínimo", t.min, "comprando lo más barato") +
      totalCard("avg", "Media", t.avg, "precio típico") +
      totalCard("max", "Máximo", t.max, "si todo sale caro") +
      "</div>" +
      '<p class="per-person">' + icon("people") + " <span>≈ <strong>" + fmt(pp.avg) + "</strong> por persona <small>(entre " + range(pp.min, pp.max) + ")</small></span></p>";

    var actions = '<div class="actions">' +
      '<button type="button" class="btn btn--sm btn--lavender" data-action="copy">' + icon("copy") + "Copiar lista</button>" +
      '<a class="btn btn--sm btn--mint" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(listText(sc, a, res)) + '">' + icon("share") + "WhatsApp</a>" +
      '<button type="button" class="btn btn--sm btn--butter" data-action="print">' + icon("print") + "Imprimir</button>" +
      '<a class="btn btn--sm" href="' + stepHref(sc, 0) + '">' + icon("pencil") + "Editar</a>" +
      "</div>";

    var aisles = QC.AISLES.map(function (aisle) {
      var items = res.items.filter(function (it) { return it.cat === aisle.id; });
      if (!items.length) return "";
      return '<section class="aisle card">' +
        '<h2 class="aisle__name">' + icon(aisle.icon) + esc(aisle.name) + "</h2>" +
        '<ul class="items" role="list">' + items.map(itemRow).join("") + "</ul></section>";
    }).join("");

    var anyEdited = res.items.some(function (it) { return it.edited; });

    return '<section class="summary">' + head + totals + actions +
      '<div class="aisles">' + aisles + "</div>" +
      '<div class="summary__foot">' +
      (anyEdited ? '<button type="button" class="btn btn--sm" data-action="reset-qty">' + icon("redo") + "Volver a las cantidades calculadas</button>" : "") +
      '<button type="button" class="btn btn--sm" data-action="restart">' + icon("redo") + "Empezar de nuevo</button>" +
      "</div>" +
      '<p class="summary__note">Precios de referencia de ' + esc(U.formatMonth(QC.PRICES_UPDATED)) + " (Lider, Jumbo, Unimarc, Tottus y Santa Isabel). Las cantidades se redondean hacia arriba al envase que se puede comprar.</p>" +
      "</section>";
  }

  function totalCard(kind, label, value, sub) {
    return '<div class="total total--' + kind + '"><span class="total__label">' + label + '</span><strong class="total__value" data-total-' + kind + ">" + fmt(value) + "</strong><small>" + sub + "</small></div>";
  }

  function itemRow(it) {
    var qty = U.formatQty(it.qty, it.unit, it.plural);
    var stepTxt = U.formatQty(it.step, it.unit, it.plural);
    var p = P[it.id];
    return '<li class="item' + (it.qty === 0 ? " item--off" : "") + '">' +
      '<span class="item__ico">' + icon(it.icon) + "</span>" +
      '<div class="item__main">' +
      '<span class="item__name">' + esc(it.name) + "</span>" +
      '<span class="item__meta">' + range(p.min, p.max) + " " + U.priceUnit(p.unit) +
      (it.edited ? ' · <em>calculado: ' + esc(U.formatQty(it.auto, it.unit, it.plural)) + "</em>" : (p.hint ? " · " + esc(p.hint) : "")) + "</span>" +
      "</div>" +
      '<div class="item__qty stepper stepper--sm">' +
      '<button type="button" class="stepper__btn" data-action="qty" data-id="' + it.id + '" data-delta="-1" aria-label="Quitar ' + esc(stepTxt) + " de " + esc(it.name) + '"' + (it.qty <= 0 ? " disabled" : "") + ">" + icon("minus") + "</button>" +
      '<output class="stepper__value" aria-live="off">' + esc(qty) + "</output>" +
      '<button type="button" class="stepper__btn" data-action="qty" data-id="' + it.id + '" data-delta="1" aria-label="Agregar ' + esc(stepTxt) + " de " + esc(it.name) + '">' + icon("plus") + "</button>" +
      "</div>" +
      '<div class="item__price"><strong>' + fmt(it.avg) + "</strong><small>" + range(it.min, it.max) + "</small></div>" +
      "</li>";
  }

  // Texto plano para copiar o mandar por WhatsApp
  function listText(sc, a, res) {
    var choice = choiceText(sc, a);
    var lines = ["🛒 Lista de compras: " + sc.name + (choice ? " (" + choice + ")" : ""), "👥 " + peopleText(res.people), ""];
    QC.AISLES.forEach(function (aisle) {
      var items = res.items.filter(function (it) { return it.cat === aisle.id && it.qty > 0; });
      if (!items.length) return;
      lines.push(aisle.name.toUpperCase());
      items.forEach(function (it) {
        lines.push("• " + it.name + ": " + U.formatQty(it.qty, it.unit, it.plural) + " (~" + fmt(it.avg) + ")");
      });
      lines.push("");
    });
    lines.push("Total estimado: " + fmt(res.totals.avg));
    lines.push("Rango: " + range(res.totals.min, res.totals.max));
    lines.push("≈ " + fmt(res.perPerson.avg) + " por persona");
    lines.push("Precios de referencia de " + U.formatMonth(QC.PRICES_UPDATED) + " · ¿Qué compro?");
    return lines.join("\n");
  }

  /* ---------------- Acciones ---------------- */
  function current() { var r = route(); return r.sc ? r : null; }

  app.addEventListener("click", function (ev) {
    var btn = ev.target.closest("[data-action]");
    if (!btn || btn.disabled) return;
    var r = current();
    if (!r) return;
    var sc = r.sc, a = answersFor(sc), act = btn.getAttribute("data-action");

    if (act === "toggle") {
      var stepId = btn.getAttribute("data-step"), opt = btn.getAttribute("data-opt");
      var step = sc.steps.filter(function (s) { return s.id === stepId; })[0];
      var list = (a.picks[stepId] || []).slice();
      var at = list.indexOf(opt);
      if (step.type === "choice" || step.single) list = [opt];
      else if (at === -1) list.push(opt);
      else list.splice(at, 1);
      a.picks[stepId] = list;
      rerender('[data-opt="' + opt + '"][data-step="' + stepId + '"]');
      announceTotal(sc);
    } else if (act === "typical") {
      var sid = btn.getAttribute("data-step");
      a.picks[sid] = calc.typicalPicks(sc, sid)[sid];
      rerender('[data-action="typical"]');
      announce("Listo, marqué lo típico.");
    } else if (act === "clear") {
      a.picks[btn.getAttribute("data-step")] = [];
      rerender('[data-action="clear"]');
      announce("Selección borrada.");
    } else if (act === "typical-all") {
      var typ = calc.typicalPicks(sc);
      Object.keys(typ).forEach(function (k) { a.picks[k] = typ[k]; });
      a.overrides = {};
      if (calc.people(a).heads < 1) a.people = { adults: 4, kids: 0 };
      save();
      location.hash = summaryHref(sc);
    } else if (act === "people") {
      var f = btn.getAttribute("data-field");
      a.people[f] = clampPeople((a.people[f] || 0) + +btn.getAttribute("data-delta"));
      rerender('[data-action="people"][data-field="' + f + '"][data-delta="' + btn.getAttribute("data-delta") + '"]');
      if (!U.$('[data-action="people"][data-field="' + f + '"][data-delta="' + btn.getAttribute("data-delta") + '"]:not([disabled])', app)) {
        var input = U.$("#in-" + f, app); if (input) input.focus();
      }
      announce(peopleText(calc.people(a)));
    } else if (act === "next") {
      location.hash = btn.getAttribute("data-next");
    } else if (act === "qty") {
      var id = btn.getAttribute("data-id"), delta = +btn.getAttribute("data-delta");
      var item = calc.calculate(sc, a, P).items.filter(function (it) { return it.id === id; })[0];
      var next = Math.max(0, Math.round((item.qty + delta * item.step) * 1000) / 1000);
      if (next === item.auto) delete a.overrides[id]; else a.overrides[id] = next;
      var sel = '[data-action="qty"][data-id="' + id + '"][data-delta="' + delta + '"]';
      rerender(sel);
      if (!U.$(sel + ":not([disabled])", app)) { var other = U.$('[data-action="qty"][data-id="' + id + '"][data-delta="1"]', app); if (other) other.focus(); }
      announceTotal(sc);
    } else if (act === "reset-qty") {
      a.overrides = {};
      rerender(".summary__title");
      announceTotal(sc);
    } else if (act === "restart") {
      if (!window.confirm("¿Borrar todas las respuestas de este escenario?")) return;
      delete state.answers[sc.id];
      save();
      location.hash = stepHref(sc, 0);
    } else if (act === "copy") {
      copyText(listText(sc, a, calc.calculate(sc, a, P)), btn);
    } else if (act === "print") {
      window.print();
    }
  });

  // Escribir el número de personas a mano: se actualiza sin repintar para no perder el cursor
  app.addEventListener("input", function (ev) {
    var f = ev.target.getAttribute && ev.target.getAttribute("data-people");
    var r = current();
    if (!f || !r) return;
    var a = answersFor(r.sc);
    a.people[f] = clampPeople(ev.target.value === "" ? 0 : +ev.target.value);
    save();
    refreshStepChrome(r.sc, r.i);
  });

  app.addEventListener("change", function (ev) {
    if (ev.target.getAttribute && ev.target.getAttribute("data-people")) rerender("#" + ev.target.id);
  });

  function clampPeople(n) { return Math.min(200, Math.max(0, Math.floor(n) || 0)); }

  // Actualiza el minitotal, el botón Siguiente y el mensaje de error
  function refreshStepChrome(sc, i) {
    var a = answersFor(sc), res = calc.calculate(sc, a, P);
    var old = U.$(".minibar", app);
    if (old) old.outerHTML = viewMinibar(sc, res);
    var err = stepError(sc, sc.steps[i], a);
    var next = U.$('[data-action="next"]', app);
    if (next) {
      next.disabled = !!err;
      if (err) next.setAttribute("aria-describedby", "step-error"); else next.removeAttribute("aria-describedby");
    }
    var msg = U.$("#step-error", app);
    if (msg) msg.textContent = err;
  }

  function announceTotal(sc) {
    var res = calc.calculate(sc, answersFor(sc), P);
    announce(res.items.length ? "Total estimado " + fmt(res.totals.avg) : "La lista está vacía");
  }

  function copyText(text, btn) {
    function done(ok) {
      toast(ok ? "¡Lista copiada!" : "No pude copiar, prueba con WhatsApp o imprimir");
      if (ok && btn) btn.classList.add("is-done");
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
    } else {
      done(fallbackCopy(text));
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  var toastTimer;
  function toast(msg) {
    var el = document.getElementById("toast");
    el.innerHTML = icon("check") + "<span>" + esc(msg) + "</span>";
    el.classList.add("is-visible");
    announce(msg);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-visible"); }, 2400);
  }

  /* ---------------- Arranque ---------------- */
  document.getElementById("prices-date").textContent = U.formatMonth(QC.PRICES_UPDATED, true);
  U.$$("[data-icon]").forEach(function (el) { el.innerHTML = icon(el.getAttribute("data-icon")); });
  window.addEventListener("hashchange", render);
  render();

  // Solo para depurar desde la consola
  QC.app = { state: state, listText: function (id) { var sc = scenarioById(id), a = answersFor(sc); return listText(sc, a, calc.calculate(sc, a, P)); } };
})();
