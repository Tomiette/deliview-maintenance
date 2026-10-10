// Accueil (aperçu validé par Tom le 10 octobre 2026) : l'écran du hero s'incline vers le pointeur.
// Seulement avec une souris ou un pavé tactile (pointer: fine) et si le visiteur accepte les animations : sinon l'écran
// garde son inclinaison de repos (--rx 4deg, --ry -8deg, dans styles/accueil/hero.css).
// Repris d'accueil-design.js (aperçu fait à la main), sans la partie « formules » ([data-formule], [data-offre]),
// qui ne sert plus.
const ecran = document.querySelector<HTMLElement>('[data-ecran-incline]');
if (ecran && matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const zone = ecran.parentElement as HTMLElement;
  let attente = 0;
  zone.addEventListener('pointermove', function (e) {
    if (attente) return;
    attente = requestAnimationFrame(function () {
      attente = 0;
      const r = zone.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      ecran.style.setProperty('--rx', (-y * 10).toFixed(1) + 'deg');
      ecran.style.setProperty('--ry', (x * 14).toFixed(1) + 'deg');
    });
  });
  zone.addEventListener('pointerleave', function () {
    ecran.style.removeProperty('--rx');
    ecran.style.removeProperty('--ry');
  });
}
