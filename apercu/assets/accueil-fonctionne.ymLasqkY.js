// Accueil de l'aperçu : « Comment ça marche ». Les étapes s'allument une fois quand le bloc arrive à l'écran ; les
// points circulent entre les étapes tant qu'il est visible. Rien ne bouge si le visiteur réduit les animations.
var flux = document.querySelector('[data-fonctionne]');
if (flux && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  flux.classList.add('dvh-anime');
  new IntersectionObserver(function (e, o) {
    if (e[0].isIntersecting) { flux.classList.add('dvh-joue'); o.disconnect(); }
  }, { threshold: 0.3 }).observe(flux);
}
