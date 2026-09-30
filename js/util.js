// Formato de precios y cantidades, y helpers chicos del DOM.
(function (root) {
  var QC = root.QC = root.QC || {};

  var clp = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
  var dec = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 2 });
  var MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  // 18990 → "$18.990"
  function formatCLP(n) { return clp.format(Math.round(n || 0)); }

  function plural(unit, pluralForm) {
    if (pluralForm) return pluralForm;
    return /[aeiou]$/i.test(unit) ? unit + "s" : unit + "es";
  }

  // (0.25, "kg") → "250 g" · (1.5, "kg") → "1,5 kg" · (2, "botella de 3 L", "botellas de 3 L") → "2 botellas de 3 L"
  function formatQty(qty, unit, pluralForm) {
    if (unit === "kg") return qty > 0 && qty < 1 ? Math.round(qty * 1000) + " g" : dec.format(qty) + " kg";
    if (unit === "L") return dec.format(qty) + " L";
    return dec.format(qty) + " " + (qty === 1 ? unit : plural(unit, pluralForm));
  }

  // Sufijo del precio unitario: "/kg", "/L" o "c/u"
  function priceUnit(unit) {
    if (unit === "kg") return "/kg";
    if (unit === "L") return "/L";
    return "c/u";
  }

  // "2026-09" → "septiembre de 2026" (o "sep 2026" en corto)
  function formatMonth(ym, short) {
    var m = /^(\d{4})-(\d{2})$/.exec(ym || "");
    if (!m) return ym;
    var name = MONTHS[+m[2] - 1];
    return short ? name.slice(0, 3) + " " + m[1] : name + " de " + m[1];
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  QC.util = { formatCLP: formatCLP, formatQty: formatQty, priceUnit: priceUnit, formatMonth: formatMonth, esc: esc, $: $, $$: $$ };
})(typeof window !== "undefined" ? window : globalThis);
