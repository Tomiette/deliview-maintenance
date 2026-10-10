// Accueil, « Votre activité livraison depuis votre poche » (pastille « App Deliview », aperçu validé par Tom le 10 octobre
// 2026) : l'interface de l'app posée sur la photo d'un vrai téléphone, avec quatre onglets et la liste des questions à
// côté. Utilisé par components/accueil/AccueilAppli.astro.
// Chiffres et noms = compte de démonstration (« Compte démo » en en-tête de l'écran), concurrents anonymisés : jamais un
// vrai client. Les heures de l'onglet Alertes (fermé depuis 19 h 42) sont les mêmes que dans « La solution »
// (lib/accueil-solution.ts, cas « Fermé en plein service ») : changer les deux ensemble.
//
// Les textes sont des fragments HTML, insérés tels quels (set:html) : ils gardent les &nbsp; de l'aperçu, pour que le
// HTML produit reste identique octet pour octet. Constantes écrites ici seulement, jamais une saisie.

export type PlateformeAppli = 'uber-eats' | 'deliveroo';

// Logo (images/accueil/, 96 × 96) et nom affiché.
export const PLATEFORMES_APPLI: Record<PlateformeAppli, { logo: string; nom: string }> = {
  'uber-eats': { logo: '/images/accueil/logo-uber-eats-96.webp', nom: 'Uber&nbsp;Eats' },
  deliveroo: { logo: '/images/accueil/logo-deliveroo-96.webp', nom: 'Deliveroo' },
};

export interface ModuleAppli {
  /** Nom de l'onglet, de l'écran et de la petite ligne en capitales de la liste. */
  nom: string;
  /** Sous-titre de l'écran dans le téléphone. */
  sousTitre: string;
  /** La question du restaurateur (en gras dans la liste). */
  question: string;
  /** Phrase dépliée sous la question quand l'élément est choisi. */
  description: string;
  /** Contenu du pictogramme (svg 24 × 24, trait), le même dans la barre d'onglets et dans la liste. */
  icone: string;
}

// Dans l'ordre des onglets : data-onglet, data-ecran et data-choix valent 0 à 3. scripts/accueil/appli.ts compte les
// éléments de la liste ; styles/accueil/appli.css prévoit 4 onglets (grille de la barre, curseur, écrans affichés).
export const MODULES_APPLI: ModuleAppli[] = [
  {
    nom: 'Concurrents',
    sousTitre: 'Cette semaine dans votre zone',
    question: '«&nbsp;Que font mes concurrents&nbsp;?&nbsp;»',
    description: 'Suivez les restaurants de votre zone&nbsp;: leurs prix, leurs promos et leurs notes, dès qu’ils changent.',
    icone: '<path d="M12 22s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"></path><circle cx="12" cy="10" r="2.5"></circle>',
  },
  {
    nom: 'Visibilité',
    sousTitre: 'Votre place dans la zone',
    question: '«&nbsp;Est-ce que les clients me voient&nbsp;?&nbsp;»',
    description: 'Mesurez votre visibilité sur les plateformes&nbsp;: votre note, vos avis et votre place dans le classement de la zone.',
    icone: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle>',
  },
  {
    nom: 'Rentabilité',
    sousTitre: 'Cette semaine',
    question: 'Analysez l’efficacité de vos actions',
    description: 'Chaque promo, chaque prix changé&nbsp;: vous voyez ce qu’il a rapporté. Vous gardez ce qui marche, vous arrêtez le reste.',
    icone: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline>',
  },
  {
    nom: 'Alertes',
    sousTitre: 'Vos restaurants en ce moment',
    question: '«&nbsp;Mon restaurant est-il bien ouvert&nbsp;?&nbsp;»',
    description: 'Si votre tablette Uber&nbsp;Eats ou Deliveroo s’éteint en plein service, vous recevez une alerte sur votre téléphone. Vous relancez votre restaurant avant de perdre des commandes.',
    icone: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.7 21a2 2 0 0 1-3.4 0"></path>',
  },
];

/** Écran Concurrents : ce qui a changé chez les voisins, du plus récent au plus ancien (le premier est mis en avant). */
export const CONCURRENTS_APPLI: { plateforme: PlateformeAppli; nom: string; changement: string; quand: string; neuf?: boolean }[] = [
  { plateforme: 'uber-eats', nom: 'Concurrent C', changement: 'lance «&nbsp;1 acheté = 1 offert&nbsp;»', quand: 'samedi · 19&nbsp;h&nbsp;36', neuf: true },
  { plateforme: 'deliveroo', nom: 'Concurrent G', changement: 'passe de 4,5 à 4,4&nbsp;★', quand: 'vendredi · 21&nbsp;h&nbsp;10' },
  { plateforme: 'uber-eats', nom: 'Concurrent T', changement: 'offre la livraison', quand: 'jeudi · 12&nbsp;h&nbsp;05' },
];

/** Écran Visibilité : note, place dans le classement de la zone, et remplissage de la jauge (0 à 1, écrit dans --p). */
export const VISIBILITE_APPLI: { plateforme: PlateformeAppli; note: string; rang: number; sur: number; jauge: string }[] = [
  { plateforme: 'uber-eats', note: '4,4&nbsp;★', rang: 8, sur: 14, jauge: '.54' },
  { plateforme: 'deliveroo', note: '4,1&nbsp;★', rang: 4, sur: 8, jauge: '.43' },
];

/** Écran Rentabilité : ventes de la semaine (les deux plateformes), ce que chaque action a rapporté, ce qu'il reste. */
export const RENTABILITE_APPLI = {
  ventes: '3&nbsp;704&nbsp;€',
  evolution: '↗ +30&nbsp;%',
  actions: [
    { texte: 'Promo du midi relancée', gain: '+&nbsp;420&nbsp;€' },
    { texte: 'Prix ajustés à la zone', gain: '+&nbsp;96&nbsp;€' },
  ],
  reste: '2&nbsp;224&nbsp;€',
};

/** Écran Alertes et notification : un restaurant ouvert, l'autre fermé parce que sa tablette ne répond plus. */
export const ALERTE_APPLI: { ouvert: PlateformeAppli; ferme: PlateformeAppli; depuis: string; habituellement: string } = {
  ouvert: 'uber-eats',
  ferme: 'deliveroo',
  depuis: '19&nbsp;h&nbsp;42',
  habituellement: '22&nbsp;h&nbsp;50',
};
