// Accueil de l'aperçu : choix de la formule (« Je confie » / « Je garde la main ») et inclinaison de l'écran du hero.
// Fichier externe : la CSP de l'aperçu n'accepte que les scripts du site.
var choix = document.querySelectorAll('[data-formule]');
choix.forEach(function (bouton) {
  bouton.addEventListener('click', function () {
    var formule = bouton.getAttribute('data-formule');
    choix.forEach(function (b) { b.setAttribute('aria-pressed', String(b === bouton)); });
    document.querySelectorAll('[data-offre]').forEach(function (bloc) {
      bloc.hidden = bloc.getAttribute('data-offre') !== formule;
    });
  });
});

var ecran = document.querySelector('[data-ecran-incline]');
if (ecran && matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  var zone = ecran.parentElement, attente = 0;
  zone.addEventListener('pointermove', function (e) {
    if (attente) return;
    attente = requestAnimationFrame(function () {
      attente = 0;
      var r = zone.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      ecran.style.setProperty('--rx', (-y * 10).toFixed(1) + 'deg');
      ecran.style.setProperty('--ry', (x * 14).toFixed(1) + 'deg');
    });
  });
  zone.addEventListener('pointerleave', function () {
    ecran.style.removeProperty('--rx');
    ecran.style.removeProperty('--ry');
  });
}
