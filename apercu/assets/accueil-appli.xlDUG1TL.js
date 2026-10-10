// Accueil de l'aperçu : « Dans l'app Deliview ». Pose l'interface de l'app sur l'écran de la photo : une homographie
// envoie le rectangle 390 × 844 sur les quatre coins de l'écran, mesurés sur la photo (751 × 602), recalculée à chaque
// changement de taille. Les onglets défilent tout seuls quand le bloc est visible ; un clic dans la liste ou sur un
// onglet choisit et arrête le défilement. Si le visiteur réduit les animations, rien ne défile, le clic marche toujours.
var bloc = document.querySelector('[data-appli]');
if (bloc) {
  var photo = bloc.querySelector('.dvq-photo'), appli = bloc.querySelector('.dvq-appli'), doigt = bloc.querySelector('.dvq-doigt');
  var boutons = bloc.querySelectorAll('[data-choix]'), onglets = bloc.querySelectorAll('.dvq-onglet');
  var COINS = [[378, 12.5], [632.7, 118.2], [330.6, 571.8], [63, 449.9]], L = 390, H = 844, PHOTO = 751;

  // Système 8 × 8 résolu par pivot de Gauss.
  var resoudre = function (A, b) {
    var n = b.length, i, j, k;
    for (i = 0; i < n; i++) A[i].push(b[i]);
    for (i = 0; i < n; i++) {
      var p = i;
      for (j = i + 1; j < n; j++) if (Math.abs(A[j][i]) > Math.abs(A[p][i])) p = j;
      var t = A[i]; A[i] = A[p]; A[p] = t;
      for (j = i + 1; j < n; j++) {
        var f = A[j][i] / A[i][i];
        for (k = i; k <= n; k++) A[j][k] -= f * A[i][k];
      }
    }
    var x = [];
    for (i = n - 1; i >= 0; i--) {
      var s = A[i][n];
      for (j = i + 1; j < n; j++) s -= A[i][j] * x[j];
      x[i] = s / A[i][i];
    }
    return x;
  };

  var poser = function () {
    var e = photo.clientWidth / PHOTO;
    if (!e) return;
    var src = [[0, 0], [L, 0], [L, H], [0, H]], A = [], b = [];
    for (var i = 0; i < 4; i++) {
      var x = src[i][0], y = src[i][1], X = COINS[i][0] * e, Y = COINS[i][1] * e;
      A.push([x, y, 1, 0, 0, 0, -x * X, -y * X]); b.push(X);
      A.push([0, 0, 0, x, y, 1, -x * Y, -y * Y]); b.push(Y);
    }
    var h = resoudre(A, b);
    appli.style.transform = 'matrix3d(' + [h[0], h[3], 0, h[6], h[1], h[4], 0, h[7], 0, 0, 1, 0, h[2], h[5], 0, 1].join(',') + ')';
    bloc.classList.add('dvq-pret');
  };
  poser();
  if ('ResizeObserver' in window) new ResizeObserver(poser).observe(photo);
  else addEventListener('resize', poser);

  var actif = 0;
  var choisir = function (i, auto) {
    actif = i;
    appli.setAttribute('data-onglet', i);
    boutons.forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-choix') === i)); });
    if (auto && doigt) {
      var o = onglets[i];
      doigt.style.left = (o.offsetParent.offsetLeft + o.offsetLeft + o.offsetWidth / 2) + 'px';
      appli.classList.remove('dvq-touche'); void appli.offsetWidth; appli.classList.add('dvq-touche');
    }
  };
  var arrete = false;
  var arreter = function () { arrete = true; bloc.classList.remove('dvq-defile'); appli.classList.remove('dvq-touche'); };
  boutons.forEach(function (b) {
    b.addEventListener('click', function () { arreter(); choisir(+b.getAttribute('data-choix')); });
  });
  onglets.forEach(function (o) {
    o.addEventListener('click', function () { arreter(); choisir(+o.getAttribute('data-onglet')); });
  });

  // Le défilement suit la barre de progression de l'élément actif : quand elle est pleine, onglet suivant.
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    appli.classList.add('dvq-anime');
    bloc.addEventListener('animationend', function (e) {
      if (arrete || e.animationName !== 'dvq-progres') return;
      choisir((actif + 1) % boutons.length, true);
    });
    new IntersectionObserver(function (entrees) {
      var vu = entrees[0].isIntersecting;
      if (vu && !arrete) bloc.classList.add('dvq-defile');
      bloc.classList.toggle('dvq-hors', !vu);
    }, { threshold: 0.35 }).observe(bloc);
  }
}
