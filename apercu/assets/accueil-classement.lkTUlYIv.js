// Accueil de l'aperçu : animation « Avant, après » du classement, calculée image par image à partir d'une seule
// progression p (0 = avant, 1 = après). Pizza Démo double les restaurants un par un, le compteur descend de 6 à 1.
// Boucle quand la scène est visible ; un clic sur Avant / Après ou la pause l'arrête. Si le visiteur réduit les
// animations : pas de boucle, mais un clic joue une transition courte, puisqu'il l'a demandée.
var scene = document.querySelector('[data-classement]');
if (scene) {
  var calme = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var choix = document.querySelector('.dvc-choix');
  var boutons = Array.prototype.slice.call(document.querySelectorAll('[data-classement-voir]'));
  var pause = document.querySelector('[data-classement-pause]');
  var annonce = scene.querySelector('[data-classement-annonce]');
  var rangs = Array.prototype.slice.call(scene.querySelectorAll('.dvc-rang'));
  var cosy = scene.querySelector('.dvc-cosy');
  var concurrents = rangs.filter(function (r) { return r !== cosy; });
  var compteur = scene.querySelector('.dvc-position b');
  var R = parseFloat(getComputedStyle(scene).getPropertyValue('--rang')) || 68;
  var N = concurrents.length; // Pizza Démo part de la place N + 1

  scene.classList.add('dvc-js');
  compteur.innerHTML = '<span class="dvc-pos-n"></span>';
  var nombre = compteur.firstChild, rangAffiche = 0;
  var curseur = document.createElement('span');
  curseur.className = 'dvc-choix-curseur';
  curseur.setAttribute('aria-hidden', 'true');
  choix.insertBefore(curseur, choix.firstChild);
  choix.classList.add('dvc-choix-js');

  var borne = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };
  var douce = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };

  var p = 0, tourne = false;
  var rendre = function (v) {
    p = v;
    var etape = v > 0.32 ? 3 : v > 0.2 ? 2 : v > 0.08 ? 1 : 0;
    scene.setAttribute('data-etape', String(etape));
    // La remontée occupe la seconde moitié : position continue de N (en bas) à 0 (en tête).
    var c = douce(borne((v - 0.42) / 0.55));
    var y = N - N * c;
    cosy.style.transform = 'translateY(' + (y * R).toFixed(1) + 'px) scale(' + (1 + 0.045 * Math.sin(Math.PI * c)).toFixed(3) + ')';
    // Chaque restaurant descend d'une place au moment précis où Pizza Démo le dépasse.
    concurrents.forEach(function (r, k) {
      var d = borne(k + 1 - y);
      r.style.transform = 'translateY(' + ((k + d) * R).toFixed(1) + 'px)';
    });
    scene.setAttribute('data-etat', c > 0.985 ? 'apres' : 'avant');
    // En lecture automatique, le sélecteur bascule sur « Après » quand la remontée commence.
    if (tourne && v >= 0.42 && choix.getAttribute('data-choix') !== 'apres') placer('apres');
    var rang = Math.min(N + 1, Math.round(y) + 1);
    if (rang !== rangAffiche) {
      rangAffiche = rang;
      nombre.innerHTML = rang + '<sup>' + (rang === 1 ? 're' : 'e') + '</sup>';
      nombre.classList.toggle('dvc-pos-premier', rang === 1);
      nombre.classList.remove('dvc-tic'); void nombre.offsetWidth; nombre.classList.add('dvc-tic');
    }
  };

  var placer = function (etat) {
    boutons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-classement-voir') === etat)); });
    var b = boutons.filter(function (x) { return x.getAttribute('data-classement-voir') === etat; })[0];
    curseur.style.width = b.offsetWidth + 'px';
    curseur.style.transform = 'translateX(' + b.offsetLeft + 'px)';
    choix.setAttribute('data-choix', etat);
  };
  var annoncer = function (etat) {
    annonce.textContent = etat === 'apres'
      ? 'Après : Pizza Démo apparaît en 1re position.'
      : 'Avant : Pizza Démo apparaît en 6e position.';
  };

  // Animation de p vers une cible ; renvoie une promesse, annulée si une autre animation démarre.
  var jeton = 0;
  var animer = function (cible, duree) {
    var mien = ++jeton, depart = p, debut = 0;
    return new Promise(function (fini) {
      if (duree <= 0 || depart === cible) { rendre(cible); fini(true); return; }
      var pas = function (t) {
        if (mien !== jeton) { fini(false); return; }
        if (!debut) debut = t;
        var k = borne((t - debut) / duree);
        rendre(depart + (cible - depart) * k);
        if (k < 1) requestAnimationFrame(pas); else fini(true);
      };
      requestAnimationFrame(pas);
    });
  };
  var attendre = function (ms) {
    var mien = jeton;
    return new Promise(function (fini) { setTimeout(function () { fini(mien === jeton); }, ms); });
  };

  var auto = !calme, visible = false;
  var boucle = function () {
    if (tourne || !auto || !visible) return;
    tourne = true;
    var tour = function () {
      if (!auto || !visible) { tourne = false; return; }
      attendre(700)
        .then(function (ok) { if (!ok) throw 0; return animer(1, 4400); })
        .then(function (ok) { if (!ok) throw 0; annoncer('apres'); return attendre(2600); })
        .then(function (ok) { if (!ok) throw 0; scene.classList.add('dvc-fondu'); return attendre(380); })
        .then(function (ok) { if (!ok) throw 0; rendre(0); placer('avant'); scene.classList.remove('dvc-fondu'); return attendre(500); })
        .then(function (ok) { if (!ok) throw 0; tour(); })
        .catch(function () { tourne = false; scene.classList.remove('dvc-fondu'); });
    };
    tour();
  };
  var arreter = function () {
    auto = false; jeton++; tourne = false; scene.classList.remove('dvc-fondu');
    if (pause) { pause.setAttribute('aria-pressed', 'true'); pause.querySelector('.sr-only').textContent = 'Relancer l’animation'; }
  };

  boutons.forEach(function (b) {
    b.addEventListener('click', function () {
      var etat = b.getAttribute('data-classement-voir');
      arreter(); placer(etat);
      var vers = etat === 'apres' ? 1 : 0;
      var duree = Math.abs(vers - p) * (vers ? (calme ? 1500 : 3200) : (calme ? 700 : 1100));
      animer(vers, duree).then(function (ok) { if (ok) annoncer(etat); });
    });
  });
  if (pause) {
    if (calme) pause.hidden = true;
    pause.addEventListener('click', function () {
      if (auto) { arreter(); return; }
      auto = true;
      pause.setAttribute('aria-pressed', 'false');
      pause.querySelector('.sr-only').textContent = 'Mettre l’animation en pause';
      if (p > 0) { animer(0, 900).then(function (ok) { if (ok) { placer('avant'); boucle(); } }); } else boucle();
    });
  }
  window.addEventListener('resize', function () { placer(choix.getAttribute('data-choix') || 'avant'); });
  if (document.fonts) document.fonts.ready.then(function () { placer(choix.getAttribute('data-choix') || 'avant'); });

  if (calme) { rendre(1); placer('apres'); annoncer('apres'); }
  else { rendre(0); placer('avant'); }

  if (!calme && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting;
      if (visible) boucle();
      else if (auto) { jeton++; tourne = false; scene.classList.remove('dvc-fondu'); rendre(0); placer('avant'); }
    }, { threshold: 0.35 }).observe(scene);
  }
}
