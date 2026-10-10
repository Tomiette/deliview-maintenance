// Accueil de l'aperçu : les deux formules jouent leur courte animation une fois, quand elles arrivent à l'écran,
// puis la rejouent au survol. Rien ne bouge si le visiteur réduit les animations (l'état final reste affiché).
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  var jouer = function (carte) {
    var maintenant = Date.now();
    if (carte._fin && maintenant < carte._fin) return; // animation en cours
    carte.classList.remove('dvo-joue');
    void carte.offsetWidth;
    carte.classList.add('dvo-joue');
    carte._fin = maintenant + 3600;
  };
  var vue = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (e) {
      if (e.isIntersecting) { jouer(e.target); vue.unobserve(e.target); }
    });
  }, { threshold: 0.45 });
  document.querySelectorAll('[data-offre-anim]').forEach(function (carte) {
    carte.classList.add('dvo-pret');
    vue.observe(carte);
    carte.addEventListener('mouseenter', function () { if (carte.classList.contains('dvo-joue')) jouer(carte); });
  });
}
