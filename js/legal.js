/* Fills the clinic's details and theme into privacy.html and terms.html from js/config.js. */
(function () {
  'use strict';
  var SITE = window.SITE || {};
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  // older theme names (from the Ivory Lane template) still work
  var LEGACY = { lagoon: 'sage', sapphire: 'clay', plum: 'mist', forest: 'olive' };
  var theme = String(SITE.theme || '').toLowerCase();
  // the colour last picked with the theme switcher (demo copies only); a ?theme= demo link wins
  if (SITE.showThemeSwitcher && !/[?&]theme=/.test(window.location.search)) {
    var picked = null;
    try { picked = localStorage.getItem('site-theme'); } catch (e) {}
    if (['sage', 'clay', 'mist', 'olive'].indexOf(picked) >= 0) theme = picked;
  }
  theme = LEGACY[theme] || theme;
  if (['sage', 'clay', 'mist', 'olive'].indexOf(theme) >= 0) document.documentElement.setAttribute('data-theme', theme);

  // as on the main page, a detail set to "" removes what shows it (and its [data-site-row] wrapper)
  $$('[data-site]').forEach(function (el) {
    var key = el.getAttribute('data-site');
    if (SITE[key]) el.textContent = SITE[key];
    else if (Object.prototype.hasOwnProperty.call(SITE, key) && (SITE[key] === '' || SITE[key] == null)) (el.closest('[data-site-row]') || el).remove();
  });
  var hrefs = {
    phone: SITE.phoneRaw && 'tel:' + SITE.phoneRaw,
    email: SITE.email && 'mailto:' + SITE.email
  };
  $$('[data-site-href]').forEach(function (el) {
    var href = hrefs[el.getAttribute('data-site-href')];
    if (href) el.setAttribute('href', href);
  });
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
