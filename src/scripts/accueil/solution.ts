// Accueil (aperçu validé par Tom le 10 octobre 2026) : « La solution ». Les quatre situations défilent quand le bloc est
// visible ; chacune joue son animation (alerte, fourche, clic en Autonomie, Tom en Délégation, même résultat). Un clic
// sur une situation arrête le défilement. Si le visiteur réduit les animations : rien ne défile, l'état final s'affiche
// (un clic change quand même de situation).
// Repris d'accueil-flux.js (aperçu fait à la main), même logique, avec les types de TypeScript.
// Le HTML (components/accueil/AccueilSolution.astro) porte data-flux, data-cas et data-cas-panneau ; ce script pose
// dvf-anime (animations permises), dvf-auto (défilement en cours), dvf-joue (panneau qui joue), --duree et --x ;
// styles/accueil/solution.css fait le reste.
const flux = document.querySelector<HTMLElement>('[data-flux]');
if (flux) {
  const DUREE = 7000;
  const calme = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onglets = Array.from(flux.querySelectorAll<HTMLElement>('[data-cas]'));
  const panneaux = Array.from(flux.querySelectorAll<HTMLElement>('[data-cas-panneau]'));
  let actuel = 0,
    minuteur = 0,
    visible = false,
    auto = !calme;
  if (!calme) flux.classList.add('dvf-anime');
  flux.style.setProperty('--duree', DUREE + 'ms');

  // Le curseur vise le bouton de chaque voie Autonomie, quelle que soit sa largeur.
  const viser = (panneau: HTMLElement) => {
    panneau.querySelectorAll<HTMLElement>('.dvf-ui').forEach((ui) => {
      const b = ui.querySelector<HTMLElement>('.dvf-bouton');
      if (b) ui.style.setProperty('--x', Math.max(10, b.offsetWidth - 34) + 'px');
    });
  };
  const montrer = (i: number, jouer: boolean) => {
    actuel = i;
    onglets.forEach((o, j) => {
      o.setAttribute('aria-pressed', String(j === i));
    });
    panneaux.forEach((p, j) => {
      p.hidden = j !== i;
      p.classList.remove('dvf-joue');
    });
    // Sur téléphone, la rangée d'onglets glisse jusqu'à l'onglet actif (sans faire défiler la page).
    const rangee = onglets[i].parentElement as HTMLElement;
    if (rangee.scrollWidth > rangee.clientWidth) {
      rangee.scrollTo({ left: onglets[i].offsetLeft - (rangee.clientWidth - onglets[i].offsetWidth) / 2, behavior: calme ? 'auto' : 'smooth' });
    }
    const p = panneaux[i];
    viser(p);
    if (jouer && !calme) {
      void p.offsetWidth;
      p.classList.add('dvf-joue');
    }
  };
  const planifier = () => {
    window.clearTimeout(minuteur);
    const actif = auto && visible;
    flux.classList.toggle('dvf-auto', actif);
    if (!actif) return;
    const barre = onglets[actuel].querySelector<HTMLElement>('.dvf-progres');
    if (barre) {
      barre.style.display = 'none';
      void barre.offsetWidth;
      barre.style.display = '';
    }
    minuteur = window.setTimeout(() => {
      montrer((actuel + 1) % onglets.length, true);
      planifier();
    }, DUREE);
  };

  onglets.forEach((o, i) => {
    o.addEventListener('click', () => {
      auto = false;
      montrer(i, true);
      planifier();
    });
  });
  montrer(0, false);

  if ('IntersectionObserver' in window && !calme) {
    let deja = false;
    new IntersectionObserver(
      (e) => {
        visible = e[0].isIntersecting;
        if (visible && !deja) {
          deja = true;
          montrer(actuel, true);
        }
        planifier();
      },
      { threshold: 0.4 },
    ).observe(flux);
  }
}
