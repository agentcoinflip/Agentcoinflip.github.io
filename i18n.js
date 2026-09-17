function applyI18n(lang) {
  var dict = (window.translations || {});
  var t = dict[lang] || dict.fr || {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (t[k] !== undefined) el.innerHTML = t[k];
  });
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  if (t['_title']) document.title = t['_title'];
  var descEl = document.querySelector('meta[name="description"]');
  if (descEl && t['_desc']) descEl.setAttribute('content', t['_desc']);
  var labels = { fr: 'FR', en: 'EN', es: 'ES', pt: 'PT', hi: 'HI', ar: 'AR' };
  var cur = document.getElementById('lang-current');
  if (cur) cur.textContent = labels[lang] || lang.toUpperCase();
  document.querySelectorAll('.lang-panel a[data-lang]').forEach(function (a) {
    a.style.fontWeight = (a.getAttribute('data-lang') === lang) ? '800' : '500';
  });
}
function setLanguage(lang) {
  try { localStorage.setItem('site_lang', lang); } catch (e) {}
  applyI18n(lang);
}
(function () {
  var saved = 'fr';
  try { saved = localStorage.getItem('site_lang') || 'fr'; } catch (e) {}
  applyI18n(saved);
})();
