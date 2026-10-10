// Accueil de l'aperçu : animation « Avant, après » du classement. Tourne en boucle quand la scène est visible,
// s'arrête dès que le visiteur choisit Avant ou Après, ou met en pause. Sans animation si le visiteur les refuse.
var scene = document.querySelector('[data-classement]');
if (scene) {
  var boutons = document.querySelectorAll('[data-classement-voir]');
  var pause = document.querySelector('[data-classement-pause]');
  var annonce = scene.querySelector('[data-classement-annonce]');
  var calme = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var etapes = [[0, 'avant', 0], [1400, 'avant', 1], [2200, 'avant', 2], [3000, 'avant', 3], [3800, 'apres', 3]];
  var duree = 8600, minuteurs = [], visible = false, arret = calme;

  var montrer = function (etat, etape) {
    scene.setAttribute('data-etat', etat);
    scene.setAttribute('data-etape', String(etape));
    boutons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-classement-voir') === etat)); });
  };
  var annoncer = function (etat) {
    annonce.textContent = etat === 'apres'
      ? 'Après : Pizza Cosy apparaît en 1re position.'
      : 'Avant : Pizza Cosy apparaît en 6e position.';
  };
  var vider = function () { minuteurs.forEach(clearTimeout); minuteurs = []; };
  var boucle = function () {
    vider();
    if (arret || !visible) return;
    etapes.forEach(function (e) { minuteurs.push(setTimeout(function () { montrer(e[1], e[2]); }, e[0])); });
    minuteurs.push(setTimeout(boucle, duree));
  };
  var arreter = function () {
    arret = true; vider();
    if (pause) { pause.setAttribute('aria-pressed', 'true'); pause.querySelector('.sr-only').textContent = 'Relancer l’animation'; }
  };

  boutons.forEach(function (b) {
    b.addEventListener('click', function () {
      var etat = b.getAttribute('data-classement-voir');
      arreter(); montrer(etat, etat === 'apres' ? 3 : 0); annoncer(etat);
    });
  });
  if (pause) {
    pause.addEventListener('click', function () {
      if (!arret) { arreter(); return; }
      arret = false;
      pause.setAttribute('aria-pressed', 'false');
      pause.querySelector('.sr-only').textContent = 'Mettre l’animation en pause';
      boucle();
    });
  }

  if (calme) {
    // Pas d'animation : on montre le résultat, le visiteur bascule lui-même.
    montrer('apres', 3); annoncer('apres');
    if (pause) pause.hidden = true;
  } else if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entrees) {
      var avant = visible; visible = entrees[0].isIntersecting;
      if (visible && !avant) boucle();
      if (!visible) { vider(); if (!arret) montrer('avant', 0); }
    }, { threshold: 0.35 }).observe(scene);
  } else {
    montrer('apres', 3);
  }
}
