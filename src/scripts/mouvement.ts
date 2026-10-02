// Mouvement discret (cahier du 2 octobre 2026) : un ticket glisse à l'apparition, un trait de marqueur se dessine
// sur un chiffre, une seule fois. Tout est déjà visible dans le HTML : ce script ne fait que masquer puis révéler
// ce qui est encore sous l'écran. Rien ne bouge si le visiteur a demandé moins d'animations.
const calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Longueur à l'écran d'un tracé dont le trait ne se déforme pas (vector-effect: non-scaling-stroke) :
// les pointillés s'y mesurent en pixels d'écran, on échantillonne donc le tracé mis à l'échelle de son cadre.
function longueurEcran(chemin: SVGPathElement, svg: SVGSVGElement): number {
  const cadre = svg.viewBox.baseVal;
  const r = svg.getBoundingClientRect();
  if (!cadre || !cadre.width || !r.width) return 0;
  const sx = r.width / cadre.width;
  const sy = r.height / cadre.height;
  const total = chemin.getTotalLength();
  let longueur = 0;
  let precedent: [number, number] | null = null;
  for (let i = 0; i <= 120; i++) {
    const p = chemin.getPointAtLength((total * i) / 120);
    const point: [number, number] = [p.x * sx, p.y * sy];
    if (precedent) longueur += Math.hypot(point[0] - precedent[0], point[1] - precedent[1]);
    precedent = point;
  }
  // Marge : un changement de police ne doit jamais couper le bout du trait.
  return Math.ceil(longueur * 1.08 + 6);
}

function tracer(svg: SVGSVGElement, delai: number) {
  svg.querySelectorAll('path').forEach((chemin, i) => {
    chemin.style.transition = `stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delai + i * 0.55}s`;
    chemin.style.strokeDashoffset = '0';
    // Une fois tracé, le trait redevient continu (aucune coupure possible si la mise en page change).
    chemin.addEventListener(
      'transitionend',
      () => {
        chemin.style.removeProperty('stroke-dasharray');
        chemin.style.removeProperty('stroke-dashoffset');
        chemin.style.removeProperty('transition');
      },
      { once: true },
    );
  });
}

function preparerMarqueur(svg: SVGSVGElement): boolean {
  const chemins = Array.from(svg.querySelectorAll('path'));
  const longueurs = chemins.map((c) => longueurEcran(c, svg));
  if (longueurs.some((l) => l === 0)) return false;
  chemins.forEach((c, i) => {
    c.style.strokeDasharray = `${longueurs[i]} ${longueurs[i]}`;
    c.style.strokeDashoffset = String(longueurs[i]);
  });
  svg.classList.add('dv-trace-pret');
  return true;
}

function demarrer() {
  const marqueurs = Array.from(document.querySelectorAll<SVGSVGElement>('svg[data-marqueur]'));
  const tickets = Array.from(document.querySelectorAll<HTMLElement>('[data-apparition=""]'));
  const hauteur = window.innerHeight;

  const observateur = new IntersectionObserver(
    (entrees) => {
      entrees.forEach((e) => {
        if (!e.isIntersecting) return;
        observateur.unobserve(e.target);
        if (e.target instanceof SVGSVGElement) tracer(e.target, 0.15);
        else e.target.classList.remove('dv-attente');
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.2 },
  );

  // Tickets encore sous l'écran : masqués, puis ils glissent en place quand on y arrive.
  tickets.forEach((t) => {
    if (t.getBoundingClientRect().top > hauteur) {
      t.classList.add('dv-attente');
      observateur.observe(t);
    }
  });

  marqueurs.forEach((svg) => {
    if (!preparerMarqueur(svg)) {
      // Marqueur masqué (affichage réservé à une autre largeur d'écran) : laissé tel quel, donc visible.
      svg.classList.add('dv-trace-pret');
      return;
    }
    // Marqueur du haut de page : tracé dès que le ticket a fini de glisser.
    if (svg.dataset.marqueur === 'arrivee') {
      requestAnimationFrame(() => requestAnimationFrame(() => tracer(svg, 0.5)));
      return;
    }
    observateur.observe(svg);
  });
}

if (!calme && 'IntersectionObserver' in window) {
  // Les longueurs se mesurent avec les polices définitives (Aspekta) ; au plus 1,5 s d'attente.
  const polices = document.fonts ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]) : Promise.resolve();
  polices.then(demarrer);
}
