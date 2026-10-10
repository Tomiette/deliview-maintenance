// Accueil de l'aperçu : « Vos prix, vos avis, vos ventes ». Chaque carte joue son animation une fois quand elle arrive
// à l'écran (chiffres qui montent, barres, prix des voisins), puis la rejoue au survol. Rien ne bouge si le visiteur
// réduit les animations : les valeurs finales sont déjà dans la page.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  var grille = document.querySelector('.dvm');
  if (grille) grille.classList.add('dvm-anime');
  var ecrire = function (el, v) {
    var dec = +(el.getAttribute('data-decimales') || 0);
    var txt = v.toLocaleString('fr-FR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    el.textContent = txt + (el.getAttribute('data-suffixe') || '');
  };
  var compter = function (el) {
    var fin = parseFloat(el.getAttribute('data-compte')), debut = 0, duree = 1100, delai = +(el.getAttribute('data-delai') || 0);
    ecrire(el, 0);
    var pas = function (t) {
      if (!debut) debut = t;
      var k = Math.min(1, (t - debut) / duree), e = 1 - Math.pow(1 - k, 3);
      ecrire(el, fin * e);
      if (k < 1) requestAnimationFrame(pas);
    };
    setTimeout(function () { requestAnimationFrame(pas); }, delai);
  };
  var jouer = function (carte) {
    if (carte._fin && Date.now() < carte._fin) return;
    carte.classList.remove('dvm-joue'); void carte.offsetWidth; carte.classList.add('dvm-joue');
    carte.querySelectorAll('[data-compte]').forEach(compter);
    carte._fin = Date.now() + 2400;
  };
  var vue = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (e) { if (e.isIntersecting) { jouer(e.target); vue.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-module]').forEach(function (c) {
    vue.observe(c);
    c.addEventListener('mouseenter', function () { if (c.classList.contains('dvm-joue')) jouer(c); });
  });
}
