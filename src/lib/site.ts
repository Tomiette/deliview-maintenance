// Données du site Deliview : coordonnées, navigation, piliers et fonctionnalités.
// Le site ne présente que ce que Deliview fait aujourd'hui (décision de Tom, 2 octobre 2026).

export const SITE = {
  nom: 'Deliview',
  url: 'https://www.deliview.fr',
  // Slogan définitif (décision de Tom, 1er octobre 2026) : hero, pied de page, Qui sommes-nous, données structurées.
  slogan: 'Le partenaire des restaurants en livraison',
  // Même texte partout (hero de l'accueil, Qui sommes-nous, pied de page, données structurées, LinkedIn).
  // Direction de copywriting fixée par Tom le 1er octobre 2026.
  definition:
    'Deliview est un logiciel français qui réunit vos données Uber Eats et Deliveroo sur une seule tablette. Vous voyez ce que font vos concurrents, vous ajustez vos prix et vos promos, et vous rendez votre activité livraison plus rentable.',
  email: 'tom@deliview.fr',
  telephone: '06 32 37 79 88',
  telephoneLien: '+33632377988',
  linkedinTom: 'https://www.linkedin.com/in/tomvoisin/',
  linkedinEntreprise: 'https://www.linkedin.com/company/deliview/',
  // Vérification de propriété : coller ici le code donné par Google Search Console (balise « google-site-verification »)
  // et par Bing Webmaster Tools (balise « msvalidate.01 »). Vide = balise absente.
  verificationGoogle: '',
  verificationBing: '',
  // Clé IndexNow (Bing, Yandex, Seznam, Naver…) : publiée dans public/<clé>.txt, utilisée par scripts/indexnow.mjs.
  indexNowCle: '74123aaa61c2c6e91a57994f5aed762b',
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

// Illustrations générées par IA (Canva), sans mention sur l'image depuis le 2 octobre 2026 (choix de Tom) ;
// leur origine est indiquée dans les mentions légales. Elles montrent des situations de restaurateurs, jamais des clients de Deliview.
// `largeurs` : fichiers présents dans public/images/ia/<nom>-<largeur>.webp.
export const IMAGES_IA = {
  'rush-tablettes': { largeurs: [800, 1536], largeur: 1536, hauteur: 1024 },
  'une-tablette': { largeurs: [800, 1536], largeur: 1536, hauteur: 1024 },
  pizzeria: { largeurs: [800, 1536], largeur: 1536, hauteur: 1152 },
  burger: { largeurs: [800, 1536], largeur: 1536, hauteur: 1152 },
  'dark-kitchen': { largeurs: [800, 1536], largeur: 1536, hauteur: 1152 },
  livreur: { largeurs: [960, 1680], largeur: 1680, hauteur: 944 },
} as const;
export type ImageIA = keyof typeof IMAGES_IA;

export type Statut = 'disponible' | 'bientot';

export interface Fonctionnalite {
  titre: string;
  texte: string;
  statut: Statut;
}

export type NomIcone =
  | 'prix' | 'zone' | 'alerte' | 'note' | 'carte' | 'commandes' | 'check' | 'fleche' | 'telephone' | 'horloge'
  | 'bouclier' | 'source' | 'equipe' | 'promo' | 'plateformes' | 'europe' | 'tablette' | 'oeil' | 'courbe' | 'calcul';

export interface Pilier {
  slug: string;
  // Icône du méga-menu et des cartes.
  icone: NomIcone;
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
    icone: 'prix',
    surtitre: 'Prix et concurrence',
    titre: 'Vos prix face à ceux de votre quartier, plat par plat',
    phrase: 'Votre margherita face aux margheritas des restaurants autour de vous, à taille égale, sur les deux plateformes.',
    statut: 'disponible',
    description:
      'Deliview retrouve vos fiches Uber Eats et Deliveroo, choisit jusqu’à 20 restaurants de votre secteur autour de vous et compare chaque plat au même plat chez eux.',
    meta: {
      title: 'Prix des concurrents Uber Eats et Deliveroo | Deliview',
      description:
        'Vos prix face à ceux des restaurants de votre quartier, plat par plat, sur Uber Eats et Deliveroo. Médiane, écart et sources. Demandez une démo.',
    },
    capture: { src: '/images/capture-concurrence', alt: 'Classement des restaurants de la zone dans Deliview : note, prix médian, avis et distance de chaque concurrent', largeur: 1600, hauteur: 1000 },
    fonctionnalites: [
      { titre: 'Chaque plat comparé au même plat', texte: 'Même type, même taille : une pizza 33 cm face à des pizzas 33 cm. Vous voyez la médiane, la fourchette, l’écart et la fiche d’où vient chaque prix.', statut: 'disponible' },
      { titre: 'Jusqu’à 20 concurrents autour de vous', texte: 'Deliview repère les restaurants de votre secteur sur les deux plateformes, vérifie leur adresse et calcule leur distance.', statut: 'disponible' },
      { titre: 'Les concurrents que vous voulez suivre', texte: 'Ajoutez jusqu’à 3 fiches à surveiller à coup sûr, même plus loin ou d’une autre cuisine.', statut: 'disponible' },
      { titre: 'Les promos de la zone', texte: 'Les offres affichées par vos concurrents, avec le prix réellement payé quand la remise est chiffrée sur la fiche.', statut: 'disponible' },
      { titre: 'Une alerte quand ça bouge', texte: 'Nouvelle promo, prix changé, note qui bouge, nouveau concurrent : chaque analyse vous montre ce qui a changé depuis la précédente.', statut: 'disponible' },
    ],
  },
  {
    slug: 'carte-et-marge',
    icone: 'carte',
    surtitre: 'Carte et marge',
    titre: 'Sachez quels plats vous pouvez vendre plus cher',
    phrase: 'Chaque plat de votre carte classé : sous-évalué, bien placé ou trop cher, avec un prix proposé et ses sources.',
    statut: 'disponible',
    description:
      'Pricing Menu passe toute votre carte en revue. Quand au moins 2 concurrents vendent le même plat, il propose un prix et montre ce que le changement rapporte pour 100 ventes.',
    meta: {
      title: 'Optimiser vos prix sur Uber Eats et Deliveroo | Deliview',
      description:
        'Chaque plat de votre carte face aux prix de votre zone : sous-évalué, bien placé ou trop cher, avec un prix proposé et ses sources. Demandez une démo.',
    },
    capture: { src: '/images/capture-carte', alt: 'Pricing Menu de Deliview : chaque plat avec votre prix, la médiane de la zone, l’écart, un statut et le prix proposé', largeur: 1600, hauteur: 1000 },
    fonctionnalites: [
      { titre: 'Toute votre carte passée en revue', texte: 'Chaque plat reçoit un statut. Une recette unique est située parmi les plats de sa famille chez vos concurrents : pizzas, pâtes, desserts, boissons.', statut: 'disponible' },
      { titre: 'Un prix proposé, avec ses sources', texte: 'Quand au moins 2 concurrents vendent le même plat, Deliview propose un prix et cite chaque plat comparé.', statut: 'disponible' },
      { titre: 'L’impact pour 100 ventes', texte: 'Ce que change un nouveau prix pour 100 ventes du plat. Pas d’estimation de vos volumes : vous les connaissez mieux que nous.', statut: 'disponible' },
      { titre: 'Vos décisions gardées', texte: 'Vous validez un prix, Deliview le note avec la raison, pour le reporter dans votre back-office.', statut: 'disponible' },
      { titre: 'Optimiseur menu : des fiches qui donnent envie', texte: 'Photo manquante, description absente ou qui répète le nom du plat : chaque plat passé en revue, comparé aux fiches de votre zone, avec les mieux présentées comme exemples.', statut: 'disponible' },
    ],
  },
  {
    slug: 'reputation',
    icone: 'note',
    surtitre: 'Réputation',
    titre: 'Votre note face à celles de votre zone',
    phrase: 'Votre place au classement des notes de votre zone, sur Uber Eats comme sur Deliveroo.',
    statut: 'disponible',
    description:
      'Deliview compare votre note et votre nombre d’avis à ceux des restaurants autour de vous, plateforme par plateforme.',
    meta: {
      title: 'Note Uber Eats et Deliveroo face à votre zone | Deliview',
      description:
        'Votre note et votre nombre d’avis comparés aux restaurants de votre zone, sur Uber Eats et Deliveroo. Demandez une démo.',
    },
    capture: { src: '/images/capture-avis', alt: 'Classement des notes de la zone dans Deliview : votre note, la moyenne de la zone et l’écart', largeur: 1600, hauteur: 1000 },
    fonctionnalites: [
      { titre: 'Votre place au classement des notes', texte: 'Votre note face à celles des restaurants de votre zone, sur chaque plateforme, avec le meilleur et le plus faible.', statut: 'disponible' },
      { titre: 'Le nombre d’avis comparé', texte: 'Combien d’avis vous avez face à vos voisins : un critère que les clients regardent avant de commander.', statut: 'disponible' },
    ],
  },
];

export const NAV = [
  { libelle: 'Notre solution', href: '/solution/', menu: true },
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
  },
  {
    slug: 'deliveroo',
    nom: 'Deliveroo',
    statut: 'disponible' as Statut,
    resume: 'Les mêmes analyses que sur Uber Eats, et les écarts entre vos deux fiches.',
    disponible: ['Votre fiche retrouvée à partir du nom et de la ville', 'Prix de toute la carte, notes, nombre d’avis, offres affichées', 'Écarts de prix entre votre fiche Deliveroo et votre fiche Uber Eats'],
  },
];

// Les 3 abonnements, selon le nombre de restaurants. Prix HT par mois, sans engagement, mise en place offerte.
// Benchmark (1er octobre 2026) : Otter 34/49/89 €, Fooderise 49/99 €, HubRise 35 €, Deliverect 79/119/199 € par établissement.
export interface Offre {
  slug: string;
  nom: string;
  prix: number;
  restaurants: string;
  pour: string;
  recommandee?: boolean;
  base?: string;
  inclus: string[];
}

export const OFFRES: Offre[] = [
  {
    slug: 'essentiel',
    nom: 'Essentiel',
    prix: 59,
    restaurants: '1 restaurant',
    pour: 'Pour vendre chaque plat au bon prix',
    inclus: [
      'Vos fiches Uber Eats et Deliveroo réunies sur un seul écran',
      'Jusqu’à 20 concurrents de votre zone analysés',
      'Pricing Menu : chaque plat comparé, prix proposé avec ses sources',
      'Optimiseur menu : photos et descriptions de vos plats passées en revue',
      'Promos des concurrents et classement des notes',
      'Ce qui a changé depuis la dernière analyse',
      '1 analyse complète par semaine',
      '2 accès : vous et votre gérant',
    ],
  },
  {
    slug: 'pro',
    nom: 'Pro',
    prix: 149,
    restaurants: 'Jusqu’à 5 restaurants',
    pour: 'Pour piloter la rentabilité de plusieurs restaurants',
    recommandee: true,
    base: 'Tout Essentiel, plus :',
    inclus: [
      'Analyses à la demande, sans limite',
      '3 concurrents de votre choix suivis par restaurant',
      'Assistant Deliview : vos questions sur votre zone',
      'Historique de vos décisions de prix',
      'Jusqu’à 10 accès pour vos équipes',
    ],
  },
  {
    slug: 'premium',
    nom: 'Premium',
    prix: 349,
    restaurants: 'Jusqu’à 10 restaurants',
    pour: 'Pour un groupe de restaurants, avec un suivi chaque mois',
    base: 'Tout Pro, plus :',
    inclus: ['Accès illimités pour vos équipes', 'Un point chaque mois avec Tom sur vos prix'],
  },
];

// Prix d'entrée, repris dans le hero, le simulateur et les métas.
export const PRIX_ENTREE = OFFRES[0].prix;

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

// Données structurées du logiciel, avec la fourchette des offres publiques (la page Tarifs détaille chaque offre).
export function jsonldLogiciel(description: string, url: string): Record<string, unknown> {
  const prix = OFFRES.map((o) => o.prix);
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Deliview',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Logiciel pour restaurants sur Uber Eats et Deliveroo',
    operatingSystem: 'Web',
    inLanguage: 'fr-FR',
    countriesSupported: 'FR',
    description,
    url,
    publisher: { '@type': 'Organization', name: 'Deliview', url: SITE.url },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: Math.min(...prix),
      highPrice: Math.max(...prix),
      offerCount: OFFRES.length,
      url: SITE.url + '/tarifs/',
    },
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
