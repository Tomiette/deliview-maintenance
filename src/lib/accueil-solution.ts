// Accueil, « La solution » (aperçu validé par Tom le 10 octobre 2026) : les quatre situations où un restaurant perd de
// l'argent sans le voir. Pour chacune : l'alerte « Repéré par Deliview », puis les deux voies, Autonomie (« Vous
// décidez », le restaurateur clique) et Délégation (« On s'en occupe », Tom le fait), qui mènent au même résultat.
// Utilisé par components/accueil/AccueilSolution.astro, qui boucle sur ce tableau (un onglet et un panneau par cas).
// Phrases des voies = page Tarifs. Chiffres = compte de démonstration (exemples illustratifs, jamais un vrai client).
// Les heures du cas « Fermé » (19 h 42) sont les mêmes que dans l'onglet Alertes de l'app (section App Deliview).
//
// Les textes sont des fragments HTML, insérés tels quels (set:html) : ils gardent les &nbsp; et <sup> de l'aperçu,
// pour que le HTML produit reste identique octet pour octet. Constantes écrites ici seulement, jamais une saisie.

export type PlateformeSolution = 'uber-eats' | 'deliveroo';

// Logo (images/accueil/, 96 × 96) et nom affiché dans l'alerte.
export const PLATEFORMES_SOLUTION: Record<PlateformeSolution, { logo: string; nom: string }> = {
  'uber-eats': { logo: '/images/accueil/logo-uber-eats-96.webp', nom: 'Uber&nbsp;Eats' },
  deliveroo: { logo: '/images/accueil/logo-deliveroo-96.webp', nom: 'Deliveroo' },
};

export interface CasSolution {
  /** Libellé de l'onglet. */
  onglet: string;
  /** Contenu du pictogramme de l'onglet (svg 24 × 24, trait). */
  icone: string;
  plateforme: PlateformeSolution;
  /** Alerte : titre (h3), ligne de détail, puis explication (masquée sous 640 px). */
  titre: string;
  meta: string;
  texte: string;
  /** Même résultat affiché dans les deux voies. */
  resultat: string;
  /** Autonomie : le bouton avant le clic, puis après, et la phrase de la voie. */
  bouton: string;
  boutonFait: string;
  phraseAutonomie: string;
  /** Délégation : la bulle de Tom une fois fait, et la phrase de la voie. */
  bulle: string;
  phraseDelegation: string;
}

export const CAS_SOLUTION: CasSolution[] = [
  {
    onglet: 'Remboursement retenu',
    icone: '<path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"></path><line x1="9" y1="8" x2="15" y2="8"></line><line x1="9" y1="12" x2="15" y2="12"></line>',
    plateforme: 'uber-eats',
    titre: '31,20&nbsp;€ retenus sur votre versement',
    meta: 'Commande n°&nbsp;A41F2 · 1<sup>er</sup>&nbsp;octobre',
    texte: 'Le client dit qu’il manquait un plat. La plateforme l’a remboursé avec votre argent.',
    resultat: '31,20&nbsp;€ réclamés',
    bouton: 'Contester',
    boutonFait: 'Contestation envoyée',
    phraseAutonomie: 'Deliview le repère. Vous le contestez en un clic.',
    bulle: 'Contesté pour vous',
    phraseDelegation: 'Deliview le repère et le conteste pour vous.',
  },
  {
    onglet: 'Prix sous la zone',
    icone: '<path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"></path><circle cx="7" cy="7" r="1.5"></circle>',
    plateforme: 'deliveroo',
    titre: 'Dips Bacon à 4,30&nbsp;€',
    meta: 'Concurrents de la zone&nbsp;: 6,20 à 7,50&nbsp;€',
    texte: 'Vous êtes le moins cher de votre zone sans le savoir. Chaque commande vous coûte de la marge.',
    resultat: '+1,30&nbsp;€ par commande',
    bouton: 'Passer à 5,60&nbsp;€',
    boutonFait: 'Prix appliqué',
    phraseAutonomie: 'Deliview propose un prix. Il passe en ligne après votre accord.',
    bulle: 'Prix ajusté pour vous',
    phraseDelegation: 'Deliview ajuste le prix selon la stratégie fixée avec vous.',
  },
  {
    onglet: 'Fermé en plein service',
    icone: '<path d="M18.4 6.6a9 9 0 1 1-12.8 0"></path><line x1="12" y1="2" x2="12" y2="12"></line>',
    plateforme: 'deliveroo',
    titre: 'Fermé depuis 19&nbsp;h&nbsp;42',
    meta: 'D’habitude, vous êtes ouvert jusqu’à 22&nbsp;h&nbsp;50',
    texte: 'Votre restaurant a disparu de l’appli en plein service, et personne en cuisine ne l’a vu.',
    resultat: 'De nouveau en ligne',
    bouton: 'Relancer mon restaurant',
    boutonFait: 'Restaurant relancé',
    phraseAutonomie: 'Deliview vous prévient. Vous le relancez en un clic.',
    bulle: 'Relancé pour vous',
    phraseDelegation: 'Deliview le relance pour vous, selon les règles fixées ensemble.',
  },
  {
    onglet: 'Aucune offre en ligne',
    icone: '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>',
    plateforme: 'uber-eats',
    titre: 'Vous n’affichez aucune offre',
    meta: '11 restaurants sur 15 en ont une dans votre zone',
    texte: 'Le plus souvent «&nbsp;1 acheté = 1 offert&nbsp;». Les clients qui comparent passent chez eux.',
    resultat: 'Offre en ligne',
    bouton: 'Lancer l’offre conseillée',
    boutonFait: 'Offre en ligne',
    phraseAutonomie: 'Deliview propose l’offre. Vous validez, Deliview l’applique.',
    bulle: 'Offre lancée pour vous',
    phraseDelegation: 'Promos et publicités lancées chaque mois, dans votre budget.',
  },
];
