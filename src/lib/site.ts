// Données du site Deliview : coordonnées, navigation, piliers et fonctionnalités.
// Le site ne présente que ce que Deliview fait aujourd'hui (décision de Tom, 2 octobre 2026).
// Textes marketing : jamais de mention de la façon dont les données sont obtenues (décision de Tom, 2 octobre 2026).

export const SITE = {
  nom: 'Deliview',
  url: 'https://www.deliview.fr',
  // Slogan définitif (décision de Tom, 1er octobre 2026) : hero, pied de page, Qui sommes-nous, données structurées.
  slogan: 'Le partenaire des restaurants en livraison',
  // Même texte partout (hero de l'accueil, Qui sommes-nous, pied de page, données structurées, LinkedIn).
  // Direction de copywriting fixée par Tom le 1er octobre 2026.
  definition:
    'Deliview est un logiciel français qui réunit vos données Uber Eats et Deliveroo sur une seule tablette. Vous voyez ce que font vos concurrents, vous ajustez vos prix et vos promos, et vous rendez votre activité livraison plus rentable.',
  // Argument central (décision de Tom, 2 octobre 2026).
  argument: 'Deliview centralise vos données de livraison Uber Eats et Deliveroo.',
  // Seul contact public depuis le 2 octobre 2026. Le numéro de Tom n'apparaît plus que dans les mentions légales (LCEN).
  email: 'tom.voisin@deliview.fr',
  linkedinTom: 'https://www.linkedin.com/in/tomvoisin/',
  linkedinEntreprise: 'https://www.linkedin.com/company/deliview/',
  // Vérification de propriété : coller ici le code donné par Google Search Console (balise « google-site-verification »)
  // et par Bing Webmaster Tools (balise « msvalidate.01 »). Vide = balise absente.
  verificationGoogle: 'RZtrbAITvqB2gViWoeBinc8GKOVd3zhBlAaoINAyNKM',
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

export type NomIcone =
  | 'prix' | 'zone' | 'alerte' | 'note' | 'carte' | 'commandes' | 'check' | 'fleche' | 'telephone' | 'horloge'
  | 'bouclier' | 'source' | 'equipe' | 'promo' | 'plateformes' | 'europe' | 'tablette' | 'oeil' | 'courbe' | 'calcul';

// Une capture réelle de l'app (compte d'essai, noms anonymisés) : fichiers public<src>-<largeur>.webp.
export interface CaptureApp {
  src: string;
  largeurs: number[];
  largeur: number;
  hauteur: number;
  alt: string;
}

// Modèle unique de fonctionnalité (décision de Tom, 2 octobre 2026) : nom, bénéfice en une phrase, 3 points au plus,
// une vraie capture et un exemple chiffré tiré d'une vraie analyse, anonymisé (restaurant, ville, plateforme, date).
export interface Fonctionnalite {
  id: string;
  icone: NomIcone;
  nom: string;
  benefice: string;
  points: string[];
  capture: CaptureApp;
  exemple: { texte: string; contexte: string };
}

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
  fonctionnalites: Fonctionnalite[];
}

const ANALYSE_DU = 'analyse du 1er octobre 2026';

export const FONCTIONNALITES: Record<string, Fonctionnalite> = {
  'pricing-menu': {
    id: 'pricing-menu',
    icone: 'carte',
    nom: 'Pricing Menu',
    benefice: 'Repérez les plats vendus trop bas et ce qu’un meilleur prix rapporte.',
    points: [
      'Chaque plat classé : sous-évalué, bien placé ou trop cher',
      'Un prix proposé dès que 2 concurrents vendent le même plat',
      'Le gain calculé pour 100 ventes du plat',
    ],
    capture: { src: '/images/capture-carte', largeurs: [800, 1600], largeur: 1600, hauteur: 1000, alt: 'Pricing Menu dans Deliview : score de positionnement, plats à augmenter, plats trop chers et gain pour 100 ventes, puis chaque plat avec votre prix, la médiane de la zone et le prix suggéré' },
    exemple: { texte: 'Margherita à 10,50 €. Médiane de la zone : 15,00 € chez 5 concurrents.', contexte: `Pizzeria à Chartres, Deliveroo, ${ANALYSE_DU}` },
  },
  'optimiseur-menu': {
    id: 'optimiseur-menu',
    icone: 'source',
    nom: 'Optimiseur menu',
    benefice: 'Des fiches de plats qui donnent envie de commander.',
    points: [
      'Photos et descriptions passées en revue, plat par plat',
      'Comparées aux fiches des restaurants de votre zone',
      'Un modèle de description à suivre pour chaque plat',
    ],
    capture: { src: '/images/capture-optimiseur', largeurs: [800, 1600], largeur: 1600, hauteur: 1000, alt: 'Optimiseur menu dans Deliview : plats à retravailler, part des plats avec photo et avec une vraie description face à la zone, puis la liste des plats à reprendre' },
    exemple: { texte: '8 plats sur 33 sans description, soit 24 %. Chez 9 concurrents : 5 %.', contexte: `Restaurant de burgers à Paris, Deliveroo, ${ANALYSE_DU}` },
  },
  'prix-concurrents': {
    id: 'prix-concurrents',
    icone: 'prix',
    nom: 'Prix des concurrents',
    benefice: 'Vos prix face à ceux des restaurants qui livrent les mêmes rues.',
    points: [
      'Jusqu’à 20 restaurants de votre secteur, avec leur distance',
      'Chaque plat face au même plat, à taille égale',
      'Jusqu’à 3 concurrents de votre choix en plus',
    ],
    capture: { src: '/images/capture-concurrence', largeurs: [800, 1600], largeur: 1600, hauteur: 1000, alt: 'Concurrence dans Deliview : chaque restaurant de la zone avec sa note, son prix médian, son nombre d’avis et sa distance' },
    exemple: { texte: 'Burger à 14,90 €. Médiane de la zone : 11,15 € chez 9 concurrents.', contexte: `Restaurant de burgers à Paris, Uber Eats, ${ANALYSE_DU}` },
  },
  'promos-zone': {
    id: 'promos-zone',
    icone: 'promo',
    nom: 'Promos de la zone',
    benefice: 'Voyez les offres de vos voisins avant de lancer les vôtres.',
    points: [
      'Chaque offre affichée par vos concurrents',
      'Le prix réellement payé quand la remise est chiffrée',
      'Ce qui a changé depuis la dernière analyse',
    ],
    capture: { src: '/images/capture-promos', largeurs: [800, 1300], largeur: 1312, hauteur: 403, alt: 'Promotions actives chez vos concurrents dans Deliview : chaque offre avec le restaurant, sa note, son prix médian et sa distance' },
    exemple: { texte: '10 concurrents sur 14 affichaient une promo. Le restaurant n’en avait aucune.', contexte: `Restaurant de burgers à Paris, Uber Eats, ${ANALYSE_DU}` },
  },
  'note-avis': {
    id: 'note-avis',
    icone: 'note',
    nom: 'Note et avis',
    benefice: 'Votre note face à celle de vos voisins, sur chaque plateforme.',
    points: [
      'Votre place au classement des notes de la zone',
      'Votre nombre d’avis face au leur',
      'Uber Eats et Deliveroo, chacun de son côté',
    ],
    capture: { src: '/images/capture-avis', largeurs: [800, 1600], largeur: 1600, hauteur: 1000, alt: 'Classement des notes de la zone dans Deliview : votre note, la moyenne de la zone et l’écart' },
    exemple: { texte: '4,4 sur 169 avis, pour 4,2 en moyenne dans la zone : 2e sur 5.', contexte: `Pizzeria à Chartres, Deliveroo, ${ANALYSE_DU}` },
  },
};

export const PILIERS: Pilier[] = [
  {
    slug: 'carte-et-marge',
    icone: 'carte',
    surtitre: 'Carte et marge',
    titre: 'Vendez chaque plat au bon prix',
    phrase: 'Les plats vendus trop bas repérés, avec un prix proposé et ses sources.',
    statut: 'disponible',
    description: 'Chaque plat de votre carte face au même plat dans votre zone. Vous voyez ce qu’un meilleur prix vous rapporte.',
    meta: {
      title: 'Optimiser vos prix sur Uber Eats et Deliveroo | Deliview',
      description:
        'Chaque plat de votre carte face aux prix de votre zone : sous-évalué, bien placé ou trop cher, avec un prix proposé et ses sources. Demandez une démo.',
    },
    fonctionnalites: [FONCTIONNALITES['pricing-menu'], FONCTIONNALITES['optimiseur-menu']],
  },
  {
    slug: 'prix-et-concurrence',
    icone: 'prix',
    surtitre: 'Prix et concurrence',
    titre: 'Vos prix et vos promos face à votre quartier',
    phrase: 'Les prix et les offres des restaurants autour de vous, plat par plat.',
    statut: 'disponible',
    description: 'Jusqu’à 20 restaurants de votre secteur, sur Uber Eats et Deliveroo. Vous voyez leurs prix et leurs promos avant de fixer les vôtres.',
    meta: {
      title: 'Prix des concurrents Uber Eats et Deliveroo | Deliview',
      description:
        'Vos prix et vos promos face à ceux des restaurants de votre quartier, plat par plat, sur Uber Eats et Deliveroo. Demandez une démo.',
    },
    fonctionnalites: [FONCTIONNALITES['prix-concurrents'], FONCTIONNALITES['promos-zone']],
  },
  {
    slug: 'reputation',
    icone: 'note',
    surtitre: 'Réputation',
    titre: 'Votre note face à celles de votre zone',
    phrase: 'Votre place au classement des notes, sur Uber Eats comme sur Deliveroo.',
    statut: 'disponible',
    description: 'Votre note et votre nombre d’avis face aux restaurants autour de vous, plateforme par plateforme.',
    meta: {
      title: 'Note Uber Eats et Deliveroo face à votre zone | Deliview',
      description:
        'Votre note et votre nombre d’avis comparés aux restaurants de votre zone, sur Uber Eats et Deliveroo. Demandez une démo.',
    },
    fonctionnalites: [FONCTIONNALITES['note-avis']],
  },
];

// « Ressources » ouvre un menu : articles, questions fréquentes, Qui sommes-nous (décision de Tom, 2 octobre 2026).
export const NAV = [
  { libelle: 'Notre solution', href: '/solution/', menu: 'solution' },
  { libelle: 'Intégrations', href: '/integrations/' },
  { libelle: 'Tarifs', href: '/tarifs/' },
  { libelle: 'Ressources', href: '/ressources/', menu: 'ressources' },
];

export const MENU_RESSOURCES = [
  { libelle: 'Articles et guides', phrase: 'Prix, commissions, promos, notes : des guides sourcés.', href: '/ressources/' },
  { libelle: 'Questions fréquentes', phrase: 'Prix, fonctionnement, engagement.', href: '/questions-frequentes/' },
  { libelle: 'Qui sommes-nous', phrase: 'Le projet, le fondateur et la construction de Deliview.', href: '/qui-sommes-nous/' },
];

export const PLATEFORMES = [
  {
    slug: 'uber-eats',
    nom: 'Uber Eats',
    statut: 'disponible' as Statut,
    resume: 'Vos prix, votre note et vos offres face à vos concurrents Uber Eats.',
    disponible: ['Prix de toute votre carte, note, nombre d’avis, offres', 'Les mêmes données chez vos concurrents, avec leur distance', 'Les plats à revoir, avec un prix proposé'],
  },
  {
    slug: 'deliveroo',
    nom: 'Deliveroo',
    statut: 'disponible' as Statut,
    resume: 'Les mêmes analyses que sur Uber Eats, et les écarts entre vos deux cartes.',
    disponible: ['Prix de toute votre carte, note, nombre d’avis, offres', 'Les mêmes données chez vos concurrents, avec leur distance', 'Les écarts de prix entre vos cartes Deliveroo et Uber Eats'],
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
  // Thème d'articles (service, tablettes, TVA) : ce n'est pas une fonctionnalité de Deliview.
  commandes: 'Gestion au quotidien',
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
