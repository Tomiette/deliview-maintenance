// Accueil de l'aperçu : le moteur Deliview. Les données d'Uber Eats et Deliveroo glissent le long des courbes jusqu'au
// noyau, qui pulse ; les actions repartent vers les plateformes et le compteur de chaque icône augmente. Tourne
// seulement quand la scène est visible. Si le visiteur réduit les animations : une image fixe du même système.
var cadre = document.querySelector('[data-moteur]');
if (cadre) {
  var calme = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var scene = cadre.querySelector('.dvx-scene');
  var svg = cadre.querySelector('.dvx-chemins');
  var coeur = cadre.querySelector('.dvx-coeur');
  var statut = cadre.querySelector('.dvx-statut span');
  var badges = { ue: cadre.querySelector('[data-app=ue-d] .dvx-badge'), dr: cadre.querySelector('[data-app=dr-d] .dvx-badge') };
  var MISES = {
    large: { w: 1120, h: 420,
      entrees: ['M164 156 C 300 156 330 226 452 226', 'M164 316 C 300 316 330 226 452 226'],
      sorties: ['M668 226 C 790 226 820 156 956 156', 'M668 226 C 790 226 820 316 956 316'] },
    etroit: { w: 360, h: 640,
      entrees: ['M105 122 C 105 200 180 180 180 236', 'M255 122 C 255 200 180 180 180 236'],
      sorties: ['M180 400 C 180 460 105 440 105 512', 'M180 400 C 180 460 255 440 255 512'] }
  };
  var DONNEES = [
    [['Ventes', '961 €'], ['Note', '4,4 ★'], ['Prix', '14,00 €'], ['Commandes', '39']],
    [['Ventes', '291 €'], ['Note', '4,1 ★'], ['Prix', '13,50 €'], ['Commandes', '12']]
  ];
  var ACTIONS = ['Prix ajusté · +1,30 €', 'Promo du midi lancée', 'Avis répondu', 'Prix ajusté · +0,90 €', 'Restaurant relancé', 'Offre conseillée en ligne'];
  var STATUTS = ['Analyse de vos données…', 'Analyse de votre zone…', 'Élaboration de la stratégie…'];
  var COCHE = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  var mise = null, compte = { ue: 0, dr: 0 };

  var dessiner = function () {
    var nom = cadre.clientWidth < 700 ? 'etroit' : 'large', m = MISES[nom];
    var k = Math.min(1.12, cadre.clientWidth / m.w);
    cadre.style.setProperty('--k', k.toFixed(4));
    cadre.style.setProperty('--w', m.w + 'px');
    cadre.style.setProperty('--h', m.h + 'px');
    if (nom === mise) return;
    mise = nom;
    scene.setAttribute('data-mise', nom);
    svg.setAttribute('viewBox', '0 0 ' + m.w + ' ' + m.h);
    var html = '';
    m.entrees.concat(m.sorties).forEach(function (d) { html += '<path class="dvx-rail" d="' + d + '"></path>'; });
    m.entrees.concat(m.sorties).forEach(function (d) { html += '<path class="dvx-lueur" d="' + d + '"></path>'; });
    svg.innerHTML = html;
    scene.querySelectorAll('.dvx-pas').forEach(function (p) { p.remove(); });
  };

  var pastille = function (classe, html, chemin, depart) {
    var p = document.createElement('span');
    p.className = 'dvx-pas ' + classe;
    p.innerHTML = html;
    p.style.offsetPath = 'path("' + chemin + '")';
    p.style.offsetDistance = depart;
    scene.appendChild(p);
    return p;
  };
  var badge = function (cle) {
    compte[cle]++;
    var b = badges[cle];
    b.textContent = compte[cle];
    b.classList.add('dvx-vu');
    b.classList.remove('dvx-tic'); void b.offsetWidth; b.classList.add('dvx-tic');
  };

  dessiner();
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(dessiner).observe(cadre);
  else window.addEventListener('resize', dessiner);

  if (calme || !Element.prototype.animate) {
    // Image fixe : deux données en route, deux actions en route, des compteurs déjà allumés.
    var m0 = MISES[mise];
    pastille('dvx-donnee', 'Ventes <em>961 €</em>', m0.entrees[0], '55%');
    pastille('dvx-donnee', 'Note <em>4,1 ★</em>', m0.entrees[1], '45%');
    pastille('dvx-action', COCHE + ACTIONS[0], m0.sorties[0], '50%');
    pastille('dvx-action', COCHE + ACTIONS[2], m0.sorties[1], '55%');
    badge('ue'); badge('ue'); badge('dr');
  } else {
    var tic = 0, minuteur = 0, visible = false, iDonnee = [0, 0], iAction = 0, iStatut = 0;
    var envoyer = function () {
      var m = MISES[mise], source = tic % 2, d = DONNEES[source][iDonnee[source]++ % 4];
      var p = pastille('dvx-donnee', d[0] + ' <em>' + d[1] + '</em>', m.entrees[source], '0%');
      p.animate([
        { offsetDistance: '0%', opacity: 0, transform: "scale(.7)" },
        { offsetDistance: '14%', opacity: 1, transform: "scale(1)", offset: .14 },
        { offsetDistance: '86%', opacity: 1, transform: "scale(1)", offset: .86 },
        { offsetDistance: '100%', opacity: 0, transform: "scale(.4)" }
      ], { duration: 2300, easing: 'cubic-bezier(.45,.05,.3,1)' }).onfinish = function () {
        p.remove();
        coeur.classList.add('dvx-pouls');
        setTimeout(function () { coeur.classList.remove('dvx-pouls'); }, 260);
      };
      if (tic % 2 === 1) {
        setTimeout(function () {
          if (!visible) return;
          var cible = iAction % 2, a = pastille('dvx-action', COCHE + ACTIONS[iAction++ % ACTIONS.length], MISES[mise].sorties[cible], '0%');
          a.animate([
            { offsetDistance: '0%', opacity: 0, transform: "scale(.5)" },
            { offsetDistance: '16%', opacity: 1, transform: "scale(1)", offset: .16 },
            { offsetDistance: '88%', opacity: 1, transform: "scale(1)", offset: .88 },
            { offsetDistance: '100%', opacity: 0, transform: "scale(.6)" }
          ], { duration: 2400, easing: 'cubic-bezier(.45,.05,.3,1)' }).onfinish = function () { a.remove(); badge(cible ? 'dr' : 'ue'); };
        }, 2300);
      }
      if (tic % 3 === 2 && statut) {
        statut.style.opacity = 0;
        setTimeout(function () { statut.textContent = STATUTS[++iStatut % STATUTS.length]; statut.style.opacity = 1; }, 300);
      }
      tic++;
    };
    var boucle = function () {
      clearTimeout(minuteur);
      if (!visible || document.hidden) return;
      envoyer();
      minuteur = setTimeout(boucle, 1100);
    };
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting;
      cadre.classList.toggle('dvx-joue', visible);
      if (visible) boucle(); else clearTimeout(minuteur);
    }, { threshold: 0.25 }).observe(cadre);
    document.addEventListener('visibilitychange', function () { if (!document.hidden && visible) boucle(); });
    // Les compteurs repartent de zéro au-delà de 9, pour rester lisibles.
    setInterval(function () { ['ue', 'dr'].forEach(function (c) { if (compte[c] > 9) { compte[c] = 0; badges[c].classList.remove('dvx-vu'); } }); }, 4000);
  }
}
