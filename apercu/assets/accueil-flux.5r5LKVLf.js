// Accueil de l'aperçu : « La solution ». Les quatre situations défilent quand le bloc est visible ; chacune joue son
// animation (alerte, fourche, clic en Autonomie, Tom en Délégation, même résultat). Un clic sur une situation arrête
// le défilement. Si le visiteur réduit les animations : rien ne défile, l'état final s'affiche.
var flux = document.querySelector('[data-flux]');
if (flux) {
  var DUREE = 7000;
  var calme = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var onglets = Array.prototype.slice.call(flux.querySelectorAll('[data-cas]'));
  var panneaux = Array.prototype.slice.call(flux.querySelectorAll('[data-cas-panneau]'));
  var actuel = 0, minuteur = 0, visible = false, auto = !calme;
  if (!calme) flux.classList.add('dvf-anime');
  flux.style.setProperty('--duree', DUREE + 'ms');

  // Le curseur vise le bouton de chaque voie Autonomie, quelle que soit sa largeur.
  var viser = function (panneau) {
    panneau.querySelectorAll('.dvf-ui').forEach(function (ui) {
      var b = ui.querySelector('.dvf-bouton');
      if (b) ui.style.setProperty('--x', Math.max(10, b.offsetWidth - 34) + 'px');
    });
  };
  var montrer = function (i, jouer) {
    actuel = i;
    onglets.forEach(function (o, j) { o.setAttribute('aria-pressed', String(j === i)); });
    panneaux.forEach(function (p, j) {
      p.hidden = j !== i;
      p.classList.remove('dvf-joue');
    });
    // Sur téléphone, la rangée d'onglets glisse jusqu'à l'onglet actif (sans faire défiler la page).
    var rangee = onglets[i].parentElement;
    if (rangee.scrollWidth > rangee.clientWidth) {
      rangee.scrollTo({ left: onglets[i].offsetLeft - (rangee.clientWidth - onglets[i].offsetWidth) / 2, behavior: calme ? 'auto' : 'smooth' });
    }
    var p = panneaux[i];
    viser(p);
    if (jouer && !calme) { void p.offsetWidth; p.classList.add('dvf-joue'); }
  };
  var planifier = function () {
    clearTimeout(minuteur);
    var actif = auto && visible;
    flux.classList.toggle('dvf-auto', actif);
    if (!actif) return;
    var barre = onglets[actuel].querySelector('.dvf-progres');
    if (barre) { barre.style.display = 'none'; void barre.offsetWidth; barre.style.display = ''; }
    minuteur = setTimeout(function () { montrer((actuel + 1) % onglets.length, true); planifier(); }, DUREE);
  };

  onglets.forEach(function (o, i) {
    o.addEventListener('click', function () { auto = false; montrer(i, true); planifier(); });
  });
  montrer(0, false);

  if ('IntersectionObserver' in window && !calme) {
    var deja = false;
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting;
      if (visible && !deja) { deja = true; montrer(actuel, true); }
      planifier();
    }, { threshold: 0.4 }).observe(flux);
  }
}
