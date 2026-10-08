// Tableaux des articles et des pages légales (8 octobre 2026, audit responsive) : sur téléphone, un tableau plus large
// que l'écran défile sans aucun indice. Sous chaque tableau qui dépasse, une mention « Faites glisser le tableau pour
// voir la suite », affichée sous 640 px seulement (global.css) ; recalculée quand la largeur change (rotation).
const tableaux = Array.from(document.querySelectorAll<HTMLElement>('.dv-tableau'));

function mettreAJour() {
  tableaux.forEach((t) => {
    const depasse = t.scrollWidth > t.clientWidth + 1;
    let aide = t.nextElementSibling;
    if (!aide || !aide.classList.contains('dv-tableau-aide')) {
      if (!depasse) return;
      aide = document.createElement('p');
      aide.className = 'dv-tableau-aide';
      aide.setAttribute('aria-hidden', 'true');
      aide.textContent = 'Faites glisser le tableau pour voir la suite';
      t.after(aide);
    }
    aide.toggleAttribute('hidden', !depasse);
  });
}

if (tableaux.length) {
  mettreAJour();
  let largeur = window.innerWidth;
  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth === largeur) return;
      largeur = window.innerWidth;
      mettreAJour();
    },
    { passive: true },
  );
  // Les polices définitives peuvent élargir un tableau après le premier calcul.
  document.fonts?.ready.then(mettreAJour);
}
