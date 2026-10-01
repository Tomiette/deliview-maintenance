// Données du site Deliview : coordonnées, navigation, piliers et fonctionnalités.
// Une fonctionnalité non livrée porte le statut « bientot » : l'étiquette « Bientôt » s'affiche partout.

export const SITE = {
  nom: 'Deliview',
  url: 'https://www.deliview.fr',
  // Même phrase partout (accueil, Qui sommes-nous, données structurées, LinkedIn).
  definition:
    'Deliview est un logiciel français qui réunit vos données Uber Eats et Deliveroo sur une seule tablette pour rendre votre livraison plus rentable.',
  email: 'tom@deliview.fr',
  telephone: '06 32 37 79 88',
  telephoneLien: '+33632377988',
  linkedinTom: 'https://www.linkedin.com/in/tomvoisin/',
  app: '/app/',
  // Fonction Supabase qui enregistre les demandes de démo (validation côté serveur).
  formulaire: 'https://osczxtxtxrjbjnozreun.supabase.co/functions/v1/lead',
  // Lien de prise de rendez-vous (Cal.com) : vide tant que Tom ne l'a pas créé.
  rendezVous: '',
};

// Adresse d'une page du site, préfixée par la base (aperçu publié sous /apercu/).
export function lien(chemin: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(chemin)) return chemin;
  return base + (chemin.startsWith('/') ? chemin : '/' + chemin);
}

// Illustrations générées par IA (Canva). Toujours affichées avec la mention « Illustration générée par IA » :
// elles montrent des situations de restaurateurs, jamais des clients de Deliview.
// `largeurs` : fichiers présents dans public/images/ia/<nom>-<largeur>.webp.
export const IMAGES_IA = {
  'rush-tablettes': { largeurs: [600], largeur: 600, hauteur: 400 },
  'une-tablette': { largeurs: [600], largeur: 600, hauteur: 400 },
  pizzeria: { largeurs: [533], largeur: 533, hauteur: 400 },
  burger: { largeurs: [533], largeur: 533, hauteur: 400 },
  'dark-kitchen': { largeurs: [600], largeur: 600, hauteur: 450 },
} as const;
export type ImageIA = keyof typeof IMAGES_IA;

export type Statut = 'disponible' | 'bientot';

export interface Fonctionnalite {
  titre: string;
  texte: string;
  statut: Statut;
}

export interface Pilier {
  slug: string;
  surtitre: string;
  titre: string;
  phrase: string;
  statut: Statut | 'partiel';
  description: string;
  meta: { title: string; description: string };
  // `src` : chemin sans extension (fichiers -800.webp et -1600.webp).
  capture?: { src: string; alt: string; largeur: number; hauteur: number };
  // Pilier sans écran à montrer (bientôt) : illustration IA de la situation qu'il règle.
  illustration?: { nom: ImageIA; alt: string };
  fonctionnalites: Fonctionnalite[];
}

export const PILIERS: Pilier[] = [
  {
    slug: 'prix-et-concurrence',
    surtitre: 'Prix et concurrence',
    titre: 'Vos prix face à ceux de votre quartier, plat par plat',
    phrase: 'Votre margherita face aux margheritas des restaurants autour de vous, à taille égale, sur les deux plateformes.',
    statut: 'disponible',
    description:
      'Deliview retrouve vos fiches Uber Eats et Deliveroo, choisit jusqu’à 10 restaurants de votre secteur autour de vous et compare chaque plat au même plat chez eux.',
    meta: {
      title: 'Prix des concurrents Uber Eats et Deliveroo | Deliview',
      description:
        'Vos prix face à ceux des restaurants de votre quartier, plat par plat, sur Uber Eats et Deliveroo. Médiane, écart et sources. Demandez une démo.',
    },
    capture: { src: '/images/capture-concurrence', alt: 'Classement des restaurants de la zone dans Deliview : note, prix médian, avis et distance de chaque concurrent', largeur: 1600, hauteur: 1000 },
    fonctionnalites: [
      { titre: 'Chaque plat comparé au même plat', texte: 'Même type, même taille : une pizza 33 cm face à des pizzas 33 cm. Vous voyez la médiane, la fourchette, l’écart et la fiche d’où vient chaque prix.', statut: 'disponible' },
      { titre: 'Jusqu’à 10 concurrents autour de vous', texte: 'Deliview repère les restaurants de votre secteur sur les deux plateformes, vérifie leur adresse et calcule leur distance.', statut: 'disponible' },
      { titre: 'Les concurrents que vous voulez suivre', texte: 'Ajoutez jusqu’à 3 fiches à surveiller à coup sûr, même plus loin ou d’une autre cuisine.', statut: 'disponible' },
      { titre: 'Les promos de la zone', texte: 'Les offres affichées par vos concurrents, avec le prix réellement payé quand la remise est chiffrée sur la fiche.', statut: 'disponible' },
      { titre: 'Une alerte quand ça bouge', texte: 'Nouvelle promo, prix changé, note qui bouge, nouveau concurrent : chaque analyse vous montre ce qui a changé depuis la précédente.', statut: 'disponible' },
    ],
  },
  {
    slug: 'carte-et-marge',
    surtitre: 'Carte et marge',
    titre: 'Sachez quels plats vous pouvez vendre plus cher',
    phrase: 'Chaque plat de votre carte classé : sous-évalué, bien placé ou trop cher, avec un prix proposé et ses sources.',
    statut: 'partiel',
    description:
      'L’optimiseur de carte passe toute votre carte en revue. Quand au moins 2 concurrents vendent le même plat, il propose un prix et montre ce que le changement rapporte pour 100 ventes.',
    meta: {
      title: 'Optimiser vos prix sur Uber Eats et Deliveroo | Deliview',
      description:
        'Chaque plat de votre carte face aux prix de votre zone : sous-évalué, bien placé ou trop cher, avec un prix proposé et ses sources. Demandez une démo.',
    },
    capture: { src: '/images/capture-carte', alt: 'Optimiseur de carte Deliview : chaque plat avec votre prix, la médiane de la zone, l’écart, un statut et le prix proposé', largeur: 1600, hauteur: 1000 },
    fonctionnalites: [
      { titre: 'Toute votre carte passée en revue', texte: 'Chaque plat reçoit un statut. Une recette unique est située parmi les plats de sa famille chez vos concurrents : pizzas, pâtes, desserts, boissons.', statut: 'disponible' },
      { titre: 'Un prix proposé, avec ses sources', texte: 'Quand au moins 2 concurrents vendent le même plat, Deliview propose un prix et cite chaque plat comparé.', statut: 'disponible' },
      { titre: 'L’impact pour 100 ventes', texte: 'Ce que change un nouveau prix pour 100 ventes du plat. Pas d’estimation de vos volumes : vous les connaissez mieux que nous.', statut: 'disponible' },
      { titre: 'Vos décisions gardées', texte: 'Vous validez un prix, Deliview le note avec la raison, pour le reporter dans votre back-office.', statut: 'disponible' },
      { titre: 'Votre marge réelle par plateforme', texte: 'Commissions, remises et frais déduits, plateforme par plateforme, avec la connexion de vos comptes.', statut: 'bientot' },
    ],
  },
  {
    slug: 'reputation',
    surtitre: 'Réputation',
    titre: 'Votre note face à celles de votre zone',
    phrase: 'Votre place au classement des notes de votre zone, sur Uber Eats comme sur Deliveroo.',
    statut: 'partiel',
    description:
      'Deliview compare votre note et votre nombre d’avis à ceux des restaurants autour de vous, plateforme par plateforme. La lecture et la réponse aux avis arriveront avec la connexion de vos comptes.',
    meta: {
      title: 'Note Uber Eats et Deliveroo face à votre zone | Deliview',
      description:
        'Votre note et votre nombre d’avis comparés aux restaurants de votre zone, sur Uber Eats et Deliveroo. Bientôt : vos avis et vos réponses au même endroit.',
    },
    capture: { src: '/images/capture-avis', alt: 'Classement des notes de la zone dans Deliview : votre note, la moyenne de la zone et l’écart', largeur: 1600, hauteur: 1000 },
    fonctionnalites: [
      { titre: 'Votre place au classement des notes', texte: 'Votre note face à celles des restaurants de votre zone, sur chaque plateforme, avec le meilleur et le plus faible.', statut: 'disponible' },
      { titre: 'Le nombre d’avis comparé', texte: 'Combien d’avis vous avez face à vos voisins : un critère que les clients regardent avant de commander.', statut: 'disponible' },
      { titre: 'Vos avis Uber Eats et Deliveroo au même endroit', texte: 'Tous les avis réunis, les avis sans réponse mis en avant.', statut: 'bientot' },
      { titre: 'Des réponses proposées, validées par vous', texte: 'Une réponse rédigée pour chaque avis, que vous relisez avant envoi.', statut: 'bientot' },
      { titre: 'Les réclamations suivies', texte: 'Commande en retard, plat manquant : chaque réclamation et sa réponse au même endroit.', statut: 'bientot' },
    ],
  },
  {
    slug: 'commandes',
    surtitre: 'Commandes et opérations',
    titre: 'Vos commandes Uber Eats et Deliveroo sur la même tablette',
    phrase: 'Les commandes des deux plateformes sur la même tablette, et votre menu modifié une seule fois.',
    statut: 'bientot',
    description:
      'C’est la suite de Deliview : toutes vos données livraison sur une seule tablette. Les commandes des deux plateformes, le menu et les ruptures gérés une fois pour toutes, le chiffre d’affaires et la TVA par plateforme. Elle arrive avec les accès officiels d’Uber Eats et de Deliveroo.',
    meta: {
      title: 'Commandes Uber Eats et Deliveroo sur une tablette | Deliview',
      description:
        'Bientôt dans Deliview : les commandes Uber Eats et Deliveroo sur une seule tablette, un menu modifié une fois, la TVA par plateforme. Rejoignez le pilote.',
    },
    illustration: {
      nom: 'rush-tablettes',
      alt: 'Comptoir de pizzeria en plein service : trois tablettes de commande côte à côte, des tickets et des sacs de livraison',
    },
    fonctionnalites: [
      { titre: 'Les commandes des deux plateformes sur une seule tablette', texte: 'Fini les tablettes qui sonnent chacune de leur côté en plein rush.', statut: 'bientot' },
      { titre: 'Un menu modifié une fois, partout', texte: 'Un prix ou un plat changé dans Deliview change sur Uber Eats et sur Deliveroo.', statut: 'bientot' },
      { titre: 'Ruptures et horaires en un geste', texte: 'Un plat en rupture retiré des deux plateformes d’un coup.', statut: 'bientot' },
      { titre: 'Chiffre d’affaires et TVA par plateforme', texte: 'Ce que chaque plateforme vous rapporte vraiment, et le rapport de TVA prêt pour votre comptable.', statut: 'bientot' },
      { titre: 'Uber Direct : livrer depuis votre propre site', texte: 'Vos clients commandent sur votre site, un livreur Uber Direct livre : vous payez la course, pas la commission de la marketplace.', statut: 'bientot' },
    ],
  },
];

export const NAV = [
  { libelle: 'Solution', href: '/solution/', menu: true },
  { libelle: 'Intégrations', href: '/integrations/' },
  { libelle: 'Tarifs', href: '/tarifs/' },
  { libelle: 'Ressources', href: '/ressources/' },
];

export const PLATEFORMES = [
  {
    slug: 'uber-eats',
    nom: 'Uber Eats',
    statut: 'disponible' as Statut,
    resume: 'Votre fiche et celles de vos concurrents analysées : prix, notes, avis, offres.',
    disponible: ['Votre fiche retrouvée à partir du nom et de la ville', 'Prix de toute la carte, notes, nombre d’avis, offres affichées', 'Fiches des concurrents de votre zone, avec leur distance'],
    bientot: ['Commandes en temps réel', 'Menu, prix et ruptures modifiés depuis Deliview', 'Avis et réponses', 'Chiffre d’affaires et commissions'],
  },
  {
    slug: 'deliveroo',
    nom: 'Deliveroo',
    statut: 'disponible' as Statut,
    resume: 'Les mêmes analyses que sur Uber Eats, et les écarts entre vos deux fiches.',
    disponible: ['Votre fiche retrouvée à partir du nom et de la ville', 'Prix de toute la carte, notes, nombre d’avis, offres affichées', 'Écarts de prix entre votre fiche Deliveroo et votre fiche Uber Eats'],
    bientot: ['Commandes en temps réel', 'Menu, prix et ruptures modifiés depuis Deliview', 'Avis et réponses', 'Chiffre d’affaires et commissions'],
  },
  {
    slug: 'uber-direct',
    nom: 'Uber Direct',
    statut: 'bientot' as Statut,
    resume: 'Livrer les commandes de votre propre site avec les livreurs Uber : vous payez la course, pas la commission de la marketplace.',
    disponible: [],
    bientot: ['Commandes passées sur votre site, livrées par Uber Direct', 'Suivi des livraisons au même endroit que vos commandes Uber Eats et Deliveroo', 'Coût de livraison par commande, comparé aux commissions des plateformes'],
  },
];

// Étiquette affichée pour le statut d'un pilier ou d'une fonctionnalité.
export function libelleStatut(s: Statut | 'partiel'): string {
  return s === 'disponible' ? 'Disponible' : s === 'partiel' ? 'Disponible en partie' : 'Bientôt';
}

export const THEMES: Record<string, string> = {
  'prix-et-concurrence': 'Prix et concurrence',
  'carte-et-marge': 'Carte et marge',
  reputation: 'Réputation',
  commandes: 'Commandes et opérations',
};

// Données structurées du logiciel (sans prix tant qu'aucun tarif n'est publié).
export function jsonldLogiciel(description: string, url: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Deliview',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'fr-FR',
    description,
    url,
    publisher: { '@type': 'Organization', name: 'Deliview', url: SITE.url },
  };
}

// Date en toutes lettres : « 1er octobre 2026 », « 12 octobre 2026 ».
export function dateFr(d: Date): string {
  const date = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' }).format(d);
  return date.replace(/^1 /, '1er ');
}

// Temps de lecture (230 mots par minute), arrondi à la minute supérieure.
export function tempsLecture(texte: string): number {
  return Math.max(1, Math.ceil(texte.split(/\s+/).filter(Boolean).length / 230));
}
