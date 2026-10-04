// Données du site Deliview : coordonnées, navigation, piliers et fonctionnalités.
import type { NomIcone } from './registre-icones';
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
    'Deliview est un logiciel français qui réunit vos données Uber Eats et Deliveroo sur une seule tablette. Vous voyez ce que font vos concurrents, vous ajustez vos prix, vos promos, et vous rendez votre activité livraison plus rentable.',
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

// Montant en euros, typographie française : « 10,50 € », « 1 250 € » (espaces insécables).
export function euros(n: number, decimales = 2): string {
  const nombre = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: decimales, maximumFractionDigits: decimales }).format(n);
  return nombre.replace(/[ \s]/g, ' ') + ' €';
}

// Écart en pourcentage d'un prix face à la médiane de sa zone, arrondi, avec le vrai signe moins : « −28 % ».
export function ecart(prix: number, mediane: number): string {
  const e = Math.round(((prix - mediane) / mediane) * 100);
  return `${e < 0 ? '−' : e > 0 ? '+' : ''}${Math.abs(e)} %`;
}

// Exemple réel du ticket de comparaison (accueil), tiré d'une vraie analyse Pricing Menu, restaurant anonymisé :
// une pizzeria sur Uber Eats, relevé du 1er octobre 2026.
export interface ExempleComparaison {
  plat: string;
  plateforme: string;
  votrePrix: number;
  mediane: number;
  concurrents: number;
  // Date du relevé, AAAA-MM-JJ.
  releve: string;
  prixPropose: number;
  gainPour100: number;
}
export const EXEMPLE_MARGHERITA: ExempleComparaison = {
  plat: 'Margherita',
  plateforme: 'Uber Eats',
  votrePrix: 10.5,
  mediane: 14.5,
  concurrents: 5,
  releve: '2026-10-01',
  prixPropose: 12.5,
  gainPour100: 200,
};

export type Statut = 'disponible' | 'bientot';

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
// Bulle flottante devant une capture : uniquement des chiffres visibles sur cette capture.
export interface BulleCapture {
  sur?: string;
  titre?: string;
  fleche?: [string, string];
  gain?: string;
  chiffre?: string;
  etoile?: boolean;
  texte?: string;
}

export interface Fonctionnalite {
  id: string;
  icone: NomIcone;
  nom: string;
  benefice: string;
  points: string[];
  capture: CaptureApp;
  bulle: BulleCapture;
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
  // Carte fonctionnalité du pilier (accueil, page Solution) : bénéfice en une phrase, 3 points, vraie capture.
  // Textes repris des maquettes validées le 2 octobre 2026.
  carte: { benefice: string; points: string[]; capture: CaptureApp };
}

const ANALYSE_DU = 'analyse du 1er octobre 2026';
// Captures de l'app (refonte en relief, 3 octobre 2026) : compte d'essai, analyse réelle d'un restaurant de burgers
// à Paris (2 octobre 2026), noms anonymisés (« Burger Démo », « Concurrent A, B… »), aucune vente affichée.
export const ANONYME = 'Restaurant anonymisé.';

export const FONCTIONNALITES: Record<string, Fonctionnalite> = {
  'pricing-menu': {
    id: 'pricing-menu',
    icone: 'etiquette-prix',
    nom: 'Pricing Menu',
    benefice: 'Repérez les plats vendus trop bas et ce qu’un meilleur prix rapporte.',
    points: [
      'Chaque plat classé : sous-évalué, bien placé ou trop cher',
      'Un prix proposé dès que 2 concurrents vendent le même plat',
      'Le gain calculé pour 100 ventes du plat',
    ],
    capture: { src: '/images/scene-carte', largeurs: [800, 1200, 1600], largeur: 1600, hauteur: 1000, alt: `Ma carte dans Deliview : 21 plats moins chers que chez les concurrents, 17 plus chers que la zone, puis les plats à monter avec le prix conseillé et le gain, Uber Eats et Deliveroo dans la même liste. ${ANONYME}` },
    bulle: { sur: 'Dips Bacon · Deliveroo', fleche: ['4,30 €', '5,60 €'], gain: '+1,30 €' },
    exemple: { texte: 'Margherita à 10,50 €. Médiane de la zone : 15,00 € chez 5 concurrents.', contexte: `Pizzeria à Chartres, Deliveroo, ${ANALYSE_DU}` },
  },
  'optimiseur-menu': {
    id: 'optimiseur-menu',
    icone: 'appareil-photo',
    nom: 'Optimiseur menu',
    benefice: 'Des fiches de plats qui donnent envie de commander.',
    points: [
      'Photos et descriptions passées en revue, plat par plat',
      'Comparées aux restaurants de votre zone',
      'Un modèle de description à suivre pour chaque plat',
    ],
    capture: { src: '/images/scene-presentation', largeurs: [800, 1200, 1600], largeur: 1600, hauteur: 1000, alt: `Présentation de la carte dans Deliview : 24 plats sur 37 à retravailler sur Uber Eats, par lesquels commencer, puis chaque plat avec ce qui lui manque (description absente ou trop courte). ${ANONYME}` },
    bulle: { chiffre: '24 plats sur 37', texte: 'à retravailler sur Uber Eats' },
    exemple: { texte: '8 plats sur 33 sans description, soit 24 %. Chez 9 concurrents : 5 %.', contexte: `Restaurant de burgers à Paris, Deliveroo, ${ANALYSE_DU}` },
  },
  'prix-concurrents': {
    id: 'prix-concurrents',
    icone: 'loupe-zone',
    nom: 'Prix des concurrents',
    benefice: 'Vos prix face à ceux des restaurants qui livrent les mêmes rues.',
    points: [
      'Jusqu’à 20 restaurants de votre secteur, avec leur distance',
      'Chaque plat face au même plat, à taille égale',
      'Jusqu’à 3 concurrents de votre choix en plus',
    ],
    capture: { src: '/images/scene-actions', largeurs: [800, 1200, 1600], largeur: 1600, hauteur: 1000, alt: `Actions proposées par Deliview : chaque plat moins cher que chez les concurrents, avec le prix des concurrents pour le même plat et le gain par article ou par commande. ${ANONYME}` },
    bulle: { sur: 'Milkshake Vanille · Uber Eats', fleche: ['6,40 €', '7,60 €'], gain: '+1,20 € par commande' },
    exemple: { texte: 'Burger à 14,90 €. Médiane de la zone : 11,15 € chez 9 concurrents.', contexte: `Restaurant de burgers à Paris, Uber Eats, ${ANALYSE_DU}` },
  },
  'promos-zone': {
    id: 'promos-zone',
    icone: 'ticket',
    nom: 'Promos de la zone',
    benefice: 'Voyez les offres de vos voisins avant de lancer les vôtres.',
    points: [
      'Chaque offre affichée par vos concurrents',
      'Le prix réellement payé quand la remise est chiffrée',
      'Ce qui a changé depuis la dernière analyse',
    ],
    capture: { src: '/images/scene-promos', largeurs: [800, 1200, 1600], largeur: 1600, hauteur: 1000, alt: `Promotions de la zone dans Deliview : 11 restaurants sur 15 en promo sur Uber Eats, 4 sur 10 sur Deliveroo, les offres les plus courantes et qui les affiche. ${ANONYME}` },
    bulle: { chiffre: '11 sur 15', texte: 'restaurants en promo sur Uber Eats' },
    exemple: { texte: '10 concurrents sur 14 affichaient une promo. Le restaurant n’en avait aucune.', contexte: `Restaurant de burgers à Paris, Uber Eats, ${ANALYSE_DU}` },
  },
  'note-avis': {
    id: 'note-avis',
    icone: 'etoile',
    nom: 'Note et avis',
    benefice: 'Votre note face à celle de vos voisins, sur chaque plateforme.',
    points: [
      'Votre place au classement des notes de la zone',
      'Votre nombre d’avis face au leur',
      'Uber Eats et Deliveroo, chacun de son côté',
    ],
    capture: { src: '/images/scene-notes', largeurs: [800, 1200, 1600], largeur: 1600, hauteur: 1000, alt: `Notes de la zone dans Deliview : 4,2 sur Uber Eats (8e sur 14, moyenne de la zone 4,1) et 4,3 sur Deliveroo (4e sur 8), l’écart et le classement par note. ${ANONYME}` },
    bulle: { chiffre: '4,2', etoile: true, texte: '8e sur 14 · Uber Eats' },
    exemple: { texte: '4,4 sur 169 avis, pour 4,2 en moyenne dans la zone : 2e sur 5.', contexte: `Pizzeria à Chartres, Deliveroo, ${ANALYSE_DU}` },
  },
};

export const PILIERS: Pilier[] = [
  {
    slug: 'carte-et-marge',
    icone: 'ardoise',
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
    carte: {
      benefice: FONCTIONNALITES['pricing-menu'].benefice,
      points: [FONCTIONNALITES['pricing-menu'].points[0], FONCTIONNALITES['pricing-menu'].points[1], 'Photos et descriptions de vos plats passées en revue'],
      capture: FONCTIONNALITES['pricing-menu'].capture,
    },
  },
  {
    slug: 'prix-et-concurrence',
    icone: 'loupe-zone',
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
    carte: {
      benefice: FONCTIONNALITES['prix-concurrents'].benefice,
      points: [FONCTIONNALITES['prix-concurrents'].points[0], FONCTIONNALITES['prix-concurrents'].points[1], 'Les promos de vos voisins, avant de lancer les vôtres'],
      capture: FONCTIONNALITES['prix-concurrents'].capture,
    },
  },
  {
    slug: 'reputation',
    icone: 'etoile',
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
    carte: {
      benefice: FONCTIONNALITES['note-avis'].benefice,
      points: FONCTIONNALITES['note-avis'].points,
      capture: FONCTIONNALITES['note-avis'].capture,
    },
  },
];

// Une vraie carte de l'app par pilier (cartes des piliers, articles) et par plateforme (pages Intégrations).
export const FRAGMENTS: Record<string, CaptureApp> = {
  'prix-et-concurrence': {
    src: '/images/frag-action-milkshake',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 610,
    alt: `Action proposée par Deliview : passer un milkshake de 6,40 € à 7,60 €, entre 7,73 € et 8,75 € chez 3 concurrents, soit 1,20 € de plus par commande. ${ANONYME}`,
  },
  'carte-et-marge': {
    src: '/images/frag-a-monter',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 596,
    alt: `Plats à monter dans Deliview, avec les prix des concurrents : dips bacon de 4,30 € à 5,60 €, 1,30 € de plus ; milkshake de 6,40 € à 7,60 €, 1,20 € de plus. ${ANONYME}`,
  },
  reputation: {
    src: '/images/frag-notes-ue',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 557,
    alt: `Note Uber Eats dans Deliview : 4,2 sur plus de 2 000 avis, moyenne de la zone 4,1, 8e sur 14, et la note à atteindre pour entrer dans le top 3. ${ANONYME}`,
  },
  'uber-eats': {
    src: '/images/frag-position-ue',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 538,
    alt: `Position Uber Eats dans Deliview : note 4,2, 8e sur 14 (moyenne de la zone 4,1), prix médian 14,40 €, 52 % au-dessus de la zone, aucune offre quand 10 concurrents sur 14 en ont une. ${ANONYME}`,
  },
  deliveroo: {
    src: '/images/frag-position-dr',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 538,
    alt: `Position Deliveroo dans Deliview : note 4,3, 4e sur 8 (moyenne de la zone 4,3), prix médian 12,90 €, 30 % au-dessus de la zone, aucune offre quand 4 concurrents sur 9 en ont une. ${ANONYME}`,
  },
};

// Accueil de l'app, Uber Eats et Deliveroo côte à côte (page Intégrations, pilier Prix et concurrence).
export const CAPTURE_POSITION: CaptureApp = {
  src: '/images/scene-position',
  largeurs: [800, 1200, 1600],
  largeur: 1600,
  hauteur: 1000,
  alt: `Accueil de Deliview : la position du restaurant face à sa zone, Uber Eats et Deliveroo côte à côte (note, prix médian, offres), puis ce qui a changé chez les concurrents cette semaine. ${ANONYME}`,
};

// « Ressources » ouvre un menu : articles, questions fréquentes, Qui sommes-nous (décision de Tom, 2 octobre 2026).
export const NAV = [
  { libelle: 'Notre solution', href: '/solution/', menu: 'solution' },
  { libelle: 'Intégrations', href: '/integrations/' },
  { libelle: 'Tarifs', href: '/tarifs/' },
  { libelle: 'Parrainage', href: '/parrainage/' },
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
  // Répartition des fonctionnalités (4 octobre 2026, demande de Tom) : Essentiel pour voir clair et corriger ses prix
  // sur un restaurant ; Pro pour agir (promos, photos, relance, assistant) sur plusieurs restaurants ; Premium pour
  // un réseau, avec Tom à vos côtés. Les limites ne sont pas encore appliquées dans l'app.
  {
    slug: 'essentiel',
    nom: 'Essentiel',
    prix: 59,
    restaurants: '1 restaurant',
    pour: 'Suivez vos concurrents, soignez votre visibilité et vendez chaque plat au bon prix',
    inclus: [
      'Vos ventes Uber Eats et Deliveroo sur un seul écran, et ce qui vous reste',
      'Votre classement sur Uber Eats et Deliveroo',
      'Jusqu’à 20 concurrents suivis : prix, promos, notes',
      'Chaque plat comparé à la zone, prix proposé avec ses sources',
      'Vous validez un prix, Deliview le met en ligne',
      'Photos et descriptions de vos plats passées en revue',
      'Alerte si votre restaurant est fermé pendant le service',
      '1 analyse complète par semaine',
      '2 accès : vous et votre gérant',
    ],
  },
  {
    slug: 'pro',
    nom: 'Pro',
    prix: 149,
    restaurants: 'Jusqu’à 5 restaurants',
    pour: 'Pilotez la rentabilité de tous vos restaurants et gardez une longueur d’avance sur vos concurrents',
    recommandee: true,
    base: 'Tout Essentiel, plus :',
    inclus: [
      'Tous vos restaurants sur un seul écran',
      'Promos conseillées sur vos heures creuses, mises en ligne pour vous',
      'Nouvelles photos de vos plats, préparées à partir des vôtres',
      'Restaurant fermé en plein service : Deliview le relance sous 5 min',
      'Assistant Deliview et rapport PDF pour vos équipes',
      '3 concurrents de votre choix suivis de près',
      'Analyses à la demande, sans limite',
      'Jusqu’à 10 accès pour vos équipes',
    ],
  },
  {
    slug: 'premium',
    nom: 'Premium',
    prix: 349,
    restaurants: 'Jusqu’à 10 restaurants',
    pour: 'Tous vos restaurants plus rentables, avec Tom à vos côtés',
    base: 'Tout Pro, plus :',
    inclus: ['Un point chaque mois avec Tom sur vos prix et vos promos', 'Historique de vos décisions de prix', 'Accès illimités pour vos équipes'],
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

// Ordinaux en exposant pour l'affichage HTML (« 1<sup>er</sup> », « 2<sup>e</sup> ») ; le texte est échappé avant.
export function exposants(texte: string): string {
  const sur = texte.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return sur.replace(/\b(1)(er|re)\b/g, '$1<sup>$2</sup>').replace(/\b(\d+)(e)\b/g, '$1<sup>$2</sup>');
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
