// Accueil (aperçu validé par Tom le 10 octobre 2026) : « Votre activité livraison depuis votre poche ». Pose l'interface
// de l'app sur l'écran de la photo : une homographie envoie le rectangle 390 × 844 sur les quatre coins de l'écran,
// mesurés sur la photo (751 × 602), recalculée à chaque changement de taille. Les onglets défilent tout seuls quand le
// bloc est visible ; un clic dans la liste ou sur un onglet choisit et arrête le défilement. Si le visiteur réduit les
// animations, rien ne défile, le clic marche toujours.
// Repris d'accueil-appli.js (aperçu fait à la main), même logique, avec les types de TypeScript.
// Le HTML (components/accueil/AccueilAppli.astro) porte data-appli, data-onglet, data-ecran et data-choix ; ce script
// pose dvq-pret (interface posée), dvq-defile (défilement en cours), dvq-hors (bloc hors de l'écran) sur le bloc,
// dvq-anime (animations permises) et dvq-touche (doigt) sur l'interface ; styles/accueil/appli.css fait le reste.
const bloc = document.querySelector<HTMLElement>('[data-appli]');
if (bloc) {
  const photo = bloc.querySelector('.dvq-photo') as HTMLElement,
    appli = bloc.querySelector('.dvq-appli') as HTMLElement,
    doigt = bloc.querySelector<HTMLElement>('.dvq-doigt');
  const boutons = bloc.querySelectorAll<HTMLElement>('[data-choix]'),
    onglets = bloc.querySelectorAll<HTMLElement>('.dvq-onglet');
  // Coins de l'écran sur la photo d'origine (751 × 602) : haut gauche, haut droit, bas droit, bas gauche.
  const COINS = [
      [378, 12.5],
      [632.7, 118.2],
      [330.6, 571.8],
      [63, 449.9],
    ],
    L = 390,
    H = 844,
    PHOTO = 751;

  // Système 8 × 8 résolu par pivot de Gauss.
  const resoudre = (A: number[][], b: number[]): number[] => {
    const n = b.length;
    let i: number, j: number, k: number;
    for (i = 0; i < n; i++) A[i].push(b[i]);
    for (i = 0; i < n; i++) {
      let p = i;
      for (j = i + 1; j < n; j++) if (Math.abs(A[j][i]) > Math.abs(A[p][i])) p = j;
      const t = A[i];
      A[i] = A[p];
      A[p] = t;
      for (j = i + 1; j < n; j++) {
        const f = A[j][i] / A[i][i];
        for (k = i; k <= n; k++) A[j][k] -= f * A[i][k];
      }
    }
    const x: number[] = [];
    for (i = n - 1; i >= 0; i--) {
      let s = A[i][n];
      for (j = i + 1; j < n; j++) s -= A[i][j] * x[j];
      x[i] = s / A[i][i];
    }
    return x;
  };

  const poser = () => {
    const e = photo.clientWidth / PHOTO;
    if (!e) return;
    const src = [
        [0, 0],
        [L, 0],
        [L, H],
        [0, H],
      ],
      A: number[][] = [],
      b: number[] = [];
    for (let i = 0; i < 4; i++) {
      const x = src[i][0],
        y = src[i][1],
        X = COINS[i][0] * e,
        Y = COINS[i][1] * e;
      A.push([x, y, 1, 0, 0, 0, -x * X, -y * X]);
      b.push(X);
      A.push([0, 0, 0, x, y, 1, -x * Y, -y * Y]);
      b.push(Y);
    }
    const h = resoudre(A, b);
    appli.style.transform = 'matrix3d(' + [h[0], h[3], 0, h[6], h[1], h[4], 0, h[7], 0, 0, 1, 0, h[2], h[5], 0, 1].join(',') + ')';
    bloc.classList.add('dvq-pret');
  };
  poser();
  if ('ResizeObserver' in window) new ResizeObserver(poser).observe(photo);
  else addEventListener('resize', poser);

  let actif = 0;
  const choisir = (i: number, auto?: boolean) => {
    actif = i;
    appli.setAttribute('data-onglet', String(i));
    boutons.forEach((b) => {
      b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-choix')) === i));
    });
    if (auto && doigt) {
      const o = onglets[i];
      doigt.style.left = ((o.offsetParent as HTMLElement).offsetLeft + o.offsetLeft + o.offsetWidth / 2) + 'px';
      appli.classList.remove('dvq-touche');
      void appli.offsetWidth;
      appli.classList.add('dvq-touche');
    }
  };
  let arrete = false;
  const arreter = () => {
    arrete = true;
    bloc.classList.remove('dvq-defile');
    appli.classList.remove('dvq-touche');
  };
  boutons.forEach((b) => {
    b.addEventListener('click', () => {
      arreter();
      choisir(Number(b.getAttribute('data-choix')));
    });
  });
  onglets.forEach((o) => {
    o.addEventListener('click', () => {
      arreter();
      choisir(Number(o.getAttribute('data-onglet')));
    });
  });

  // Le défilement suit la barre de progression de l'élément actif : quand elle est pleine, onglet suivant.
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    appli.classList.add('dvq-anime');
    bloc.addEventListener('animationend', (e) => {
      if (arrete || e.animationName !== 'dvq-progres') return;
      choisir((actif + 1) % boutons.length, true);
    });
    new IntersectionObserver(
      (entrees) => {
        const vu = entrees[0].isIntersecting;
        if (vu && !arrete) bloc.classList.add('dvq-defile');
        bloc.classList.toggle('dvq-hors', !vu);
      },
      { threshold: 0.35 },
    ).observe(bloc);
  }
}
