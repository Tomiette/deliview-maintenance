// Accueil, « Avant, après » (aperçu validé par Tom le 10 octobre 2026) : le classement d'une appli de livraison où
// « Pizza Démo » remonte de la 6e à la 1re place. Utilisé par components/accueil/AccueilClassement.astro.
// Restaurant de démonstration, jamais un vrai client ; les cinq concurrents sont des silhouettes sans nom.
// Constantes écrites ici seulement, jamais une saisie.
//
// Le nombre de lignes compte : scripts/accueil/classement.ts compte les concurrents (Pizza Démo part de la place
// concurrents + 1), mais le « 6e » écrit dans le HTML, la hauteur de la liste (.dvc-liste, 6 rangs dans
// styles/accueil/classement.css) et les phrases lues par les lecteurs d'écran (« 6e position ») supposent 5 concurrents.

/** Concurrents anonymes, de haut en bas : largeur des deux lignes grises (nom, puis détail). */
export const CONCURRENTS_CLASSEMENT: { nom: string; detail: string }[] = [
  { nom: '62%', detail: '40%' },
  { nom: '54%', detail: '46%' },
  { nom: '70%', detail: '36%' },
  { nom: '48%', detail: '42%' },
  { nom: '58%', detail: '34%' },
];

/** Restaurant de démonstration qui remonte, avec l'offre lancée par Deliview. */
export const RESTAURANT_CLASSEMENT = {
  nom: 'Pizza Démo',
  detail: 'Pizzeria · 25-35 min',
  offre: '1 acheté = 1 offert',
  photo: '/images/accueil/pizza-110.webp',
};

/** Ce que Deliview fait, dans l'ordre où les actions s'allument (data-action="1" à "3"). */
export const ACTIONS_CLASSEMENT = ['Menu optimisé', 'Offre lancée au bon moment', 'Prix ajustés à la zone'];
