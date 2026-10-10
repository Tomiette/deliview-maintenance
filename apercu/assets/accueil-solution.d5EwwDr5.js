// Accueil de l'aperçu : « La solution ». Chaque formule a trois bénéfices ; l'actif montre sa phrase et son écran animé.
// Défilement automatique quand le bloc est visible ; un clic sur un bénéfice l'arrête. Rien ne défile si le visiteur
// réduit les animations.
var DUREE = 5000;
var calme = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-etapes]').forEach(function (offre) {
  var items = offre.querySelectorAll('[data-etape]');
  var scenes = offre.querySelectorAll('[data-scene]');
  var actuel = 0, minuteur = 0, visible = false, arret = calme;
  offre.style.setProperty('--duree', DUREE + 'ms');

  var choisir = function (i) {
    actuel = i;
    items.forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === i)); });
    scenes.forEach(function (s, j) {
      s.classList.remove('dvs-active');
      if (j === i) { void s.offsetWidth; s.classList.add('dvs-active'); }
    });
  };
  var planifier = function () {
    clearTimeout(minuteur);
    var actif = !arret && visible && !offre.hidden;
    offre.classList.toggle('dvs-auto', actif);
    if (!actif) return;
    // Relance la barre de progression de l'élément actif.
    var barre = items[actuel].querySelector('.dvs-progres');
    if (barre) { barre.style.display = 'none'; void barre.offsetWidth; barre.style.display = ''; }
    minuteur = setTimeout(function () { choisir((actuel + 1) % items.length); planifier(); }, DUREE);
  };

  items.forEach(function (b, i) {
    b.addEventListener('click', function () { arret = true; choisir(i); planifier(); });
  });
  choisir(0);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; planifier(); }, { threshold: 0.4 }).observe(offre.parentElement);
  }
  // Changement de formule : l'offre affichée repart du premier bénéfice.
  document.querySelectorAll('[data-formule]').forEach(function (f) {
    f.addEventListener('click', function () {
      setTimeout(function () { if (!offre.hidden) { choisir(0); planifier(); } else { clearTimeout(minuteur); } }, 0);
    });
  });
});
