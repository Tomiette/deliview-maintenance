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
  // Direction de copywriting fixée par Tom le 1er octobre 2026, texte revu le 6 octobre 2026 (« un seul écran »).
  definition:
    'Deliview est un logiciel français qui centralise vos chiffres Uber Eats et Deliveroo sur un seul écran. Vous voyez ce que font vos concurrents, vous ajustez vos prix, vos promos, et votre activité livraison devient plus rentable.',
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

// Captures de l'app : analyse réelle d'un restaurant de burgers à Paris (2 octobre 2026), noms anonymisés
// (« Burger Démo », « Concurrent A, B… », produits de marque renommés).
export const ANONYME = 'Restaurant anonymisé.';

// Compte de démonstration de l'app (« Pizza Démo », chiffres fictifs) : écrans du 6 octobre 2026.
export const DEMO = 'Compte de démonstration, chiffres fictifs.';
// Captures du 7 octobre 2026 qui montrent des ventes : ventes inventées, ajoutées à l'analyse réelle anonymisée.
export const VENTES_FICTIVES = 'Ventes fictives, concurrents réels anonymisés.';

// Une vraie carte de l'app par fonction (pages des fonctions, articles) et par plateforme (pages Intégrations).
// Refaites le 7 octobre 2026 sur l'app du jour (demande de Tom : « met à jour […] les photos si c'est nécessaire ») :
// les cartes du 3 octobre montraient encore l'ancienne app (« Ma carte », « Noter »).
export const FRAGMENTS: Record<string, CaptureApp> = {
  prix: {
    src: '/images/frag-prix-a-monter',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 849,
    alt: `Plats à monter dans Deliview, prix conseillé à mi-chemin de la zone : dips bacon de 4,30 € à 5,60 € sur Deliveroo, soit 1,30 € de plus ; milkshake vanille de 6,40 € à 7,60 € ; sodas de 3,50 € à 4,50 €, avec les prix des concurrents. ${ANONYME}`,
  },
  promotions: {
    src: '/images/frag-promo-creux',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 784,
    alt: `Offre conseillée par Deliview pour remplir un creux : « 1 acheté = 1 offert » le mardi midi, où le restaurant fait 2,8 commandes par jour contre 13,2 les autres midis, avec son coût, les plateformes où elle existe et l’objectif à suivre. ${VENTES_FICTIVES}`,
  },
  avis: {
    src: '/images/frag-notes-zone',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 755,
    alt: `Note Uber Eats dans Deliview : 4,2 pour plus de 2 000 avis, moyenne de la zone 4,1, à 0,4 point du top 3, puis le classement des restaurants de la zone par note. ${ANONYME}`,
  },
  'uber-eats': {
    src: '/images/frag-classement-ue',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 562,
    alt: `Classement Uber Eats dans Deliview : 8e sur 14 par note dans la zone, note 4,2 pour une moyenne de 4,1, aucune offre quand 10 concurrents sur 14 en ont une, prix 52 % au-dessus de la zone. ${ANONYME}`,
  },
  deliveroo: {
    src: '/images/frag-classement-dr',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 562,
    alt: `Classement Deliveroo dans Deliview : 4e sur 8 par note dans la zone, note 4,3 pour une moyenne de 4,3, aucune offre quand 4 concurrents sur 9 en ont une, prix 30 % au-dessus de la zone. ${ANONYME}`,
  },
  // Contestations › En cours et Terminées (7 octobre 2026) : envoyées à Uber 5 et 6 min après la demande, une refusée.
  contestations: {
    src: '/images/frag-suivi-contestations',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 928,
    alt: `Suivi des contestations dans Deliview : 2 envoyées à Uber Eats, réponse à venir ; 3 terminées, 2 acceptées et 1 refusée par Uber, 41,50 € récupérés. ${DEMO}`,
  },
  // Rapport PDF de l'équipe (app du 3 octobre 2026), première page sans son pied de page : restaurant exemple, ventes fictives.
  rapport: {
    src: '/images/frag-rapport',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 1051,
    alt: 'Rapport de la semaine préparé par Deliview, en PDF : 5 716 € de ventes TTC, 219 commandes, panier moyen 26,10 €, part d’Uber Eats et de Deliveroo, ventes jour par jour, ce qui reste après commission et offres, meilleurs moments et notes des clients. Restaurant exemple, ventes fictives.',
  },
};

// Une image refaite change de nom de fichier : les navigateurs gardent les images 7 jours (.htaccess), un même nom
// garderait l'ancienne version chez les visiteurs déjà venus (7 octobre 2026, photo des tablettes restée barrée).
// Écrans de l'app sur appareils (6 octobre 2026, demande de Tom : « des écrans sur des tablettes, des captures, varier ») :
// téléphones et tablette du compte de démonstration « Pizza Démo » (app du 6 octobre, chiffres fictifs). 7 octobre 2026 :
// Menu › Prix, Promotions (À lancer, La zone), Concurrents › Notes et le classement de l'accueil refaits sur l'app du
// jour, avec l'analyse réelle anonymisée (« Burger Démo ») ; les anciens écrans d'ordinateur (scene-*) montraient
// l'app du 3 octobre. Les bulles ne reprennent que des chiffres de leur écran.
export const ECRANS: Record<string, CaptureApp> = {
  contestations: {
    src: '/images/ecrans/telephone-contester',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 1731,
    alt: `Écran Contestations de Deliview sur téléphone : 86,40 € à récupérer sur 3 remboursements Uber Eats, premier délai le 30 octobre, bouton « Tout contester », envoi sous 10 min, puis chaque commande à contester. ${DEMO}`,
  },
  assistant: {
    src: '/images/ecrans/telephone-assistant',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 1731,
    alt: `Écran Assistant de Deliview sur téléphone : des questions prêtes (« Combien j’ai vendu la semaine dernière ? », « Quels sont mes creux ? ») et le champ pour poser la vôtre. ${DEMO}`,
  },
  objectifs: {
    src: '/images/ecrans/telephone-objectifs',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 1731,
    alt: `Écran Objectifs de Deliview sur téléphone : 5 458 € de ventes sur 6 000 € visés (90 %), 216 commandes sur 230, panier moyen 25,27 € sur 26 €. ${DEMO}`,
  },
  fermeture: {
    src: '/images/ecrans/telephone-fermeture',
    largeurs: [400, 800],
    largeur: 800,
    hauteur: 1731,
    alt: `Accueil de Deliview sur téléphone : bandeau « Fermé sur Deliveroo depuis 19 h 42 » avec le bouton « Relancer mon restaurant », puis les ventes de la semaine. ${DEMO}`,
  },
  avisTablette: {
    src: '/images/ecrans/tablette-avis',
    largeurs: [700, 1200],
    largeur: 1200,
    hauteur: 834,
    alt: `Écran Avis de Deliview sur tablette : les avis à répondre, les moins bonnes notes d’abord, chacun avec la réponse préparée par Deliview et le bouton Envoyer. ${DEMO}`,
  },
  objectifsOrdinateur: {
    src: '/images/ecrans/navigateur-objectifs',
    largeurs: [800, 1400],
    largeur: 1400,
    hauteur: 875,
    alt: `Écran Objectifs de Deliview sur ordinateur : 5 458 € de ventes sur 6 000 € visés cette semaine (90 %), 216 commandes sur 230 (93 %), panier moyen 25,27 € sur 26 € (97 %). ${DEMO}`,
  },
  prix: {
    src: '/images/ecrans/navigateur-prix',
    largeurs: [800, 1200, 1600],
    largeur: 1600,
    hauteur: 1000,
    alt: `Écran Menu › Prix de Deliview sur ordinateur : 21 plats moins chers que la zone, jusqu’à 1,30 € de plus par commande ; en premier, passez 4 boissons à 4,50 €. Puis chaque plat à monter, avec le prix de la zone, celui des concurrents et le prix conseillé, Uber Eats et Deliveroo dans la même liste. ${ANONYME}`,
  },
  promotionsLancer: {
    src: '/images/ecrans/tablette-promotions-lancer',
    largeurs: [600, 1100],
    largeur: 1100,
    hauteur: 1467,
    alt: `Écran Promotions de Deliview sur tablette : l’offre à lancer pour remplir un creux, « 1 acheté = 1 offert » le mardi midi (2,8 commandes par jour contre 13,2 les autres midis), son coût, les plateformes où elle existe, l’objectif à suivre et le bouton « Programmer cette offre ». ${VENTES_FICTIVES}`,
  },
  promotionsZone: {
    src: '/images/ecrans/navigateur-promotions-zone',
    largeurs: [800, 1200, 1600],
    largeur: 1600,
    hauteur: 1000,
    alt: `Écran Promotions › La zone de Deliview sur ordinateur : sur Uber Eats, 11 restaurants sur 15 ont une offre, le plus souvent « 1 acheté = 1 offert » ; sur Deliveroo, 4 sur 10 ; chaque type d’offre avec les concurrents qui l’affichent. ${ANONYME}`,
  },
  notes: {
    src: '/images/ecrans/navigateur-notes',
    largeurs: [800, 1200, 1600],
    largeur: 1600,
    hauteur: 1000,
    alt: `Écran Concurrents › Notes de Deliview sur ordinateur : 4,2 sur Uber Eats (8e sur 14, moyenne de la zone 4,1) et 4,3 sur Deliveroo (4e sur 8), l’écart avec le top 3 et le classement des restaurants par note. ${ANONYME}`,
  },
  classement: {
    src: '/images/ecrans/navigateur-classement',
    largeurs: [800, 1200, 1600],
    largeur: 1600,
    hauteur: 1000,
    alt: `Accueil de Deliview sur ordinateur : votre classement par note sur Uber Eats (8e sur 14) et sur Deliveroo (4e sur 8), côte à côte, avec la note du top 3, les offres et les prix face à la zone, puis ce qui a changé chez vos concurrents. ${ANONYME}`,
  },
};

// Vitrine d'une fonction : un appareil avec une vraie capture, posé sur un plateau, et des bulles. Positions en % du
// plateau (x depuis la droite si `droite`) ; `bureau` : bulle masquée sous 768 px.
export type TypeAppareil = 'telephone' | 'tablette' | 'navigateur';
export interface PlaceAppareil {
  x: number;
  y: number;
  largeur: number;
  rotation?: number;
}
export interface BullePlacee {
  bulle: BulleCapture;
  x: number;
  y: number;
  xm?: number;
  ym?: number;
  droite?: boolean;
  bureau?: boolean;
}
export interface VitrineFonction {
  appareil: TypeAppareil;
  capture: CaptureApp;
  // Carte de l'accueil : l'appareil sort du bas du plateau, une bulle.
  carte: { place: PlaceAppareil; bulle: BullePlacee };
  // Page Solution : l'appareil entier, deux bulles au plus.
  page: { ratio: number; ratioMobile?: number; place: PlaceAppareil; placeMobile?: PlaceAppareil; bulles: BullePlacee[] };
}

// Ce que fait Deliview (6 octobre 2026, demande de Tom) : trois leviers de rentabilité, puis ce que Deliview surveille
// pour vous. Repris dans l'accueil, le menu Solution, la page Solution et le pied de page. Uniquement ce que l'app fait.
// Contestations : Uber Eats et Deliveroo depuis le 6 octobre 2026 (offre Pro).
// 7 octobre 2026 (demande de Tom : « fait leur page chacune, tu dois avoir une cohérence ») : chaque fonction a sa page,
// /solution/<slug>/ (contenu dans src/lib/fonctions.ts), et la même capture partout où elle apparaît.
export interface Levier {
  id: string;
  // Adresse de sa page : /solution/<slug>/.
  slug: string;
  icone: NomIcone;
  nom: string;
  // Une ligne (cartes de l'accueil et de la page Solution).
  phrase: string;
  // Quelques mots sous le nom, dans le menu Solution (7 octobre 2026, demande de Tom : « simplifie les sous-menus »).
  menu: string;
  benefice: string;
  points: string[];
  // La fonction sur un appareil (accueil, page Solution, haut de sa page).
  vitrine: VitrineFonction;
}

const BULLE_CREUX: BulleCapture = { sur: 'Votre creux', titre: 'Le mardi midi', texte: '2,8 commandes par jour, contre 13,2' };
const BULLE_PRIX: BulleCapture = { sur: 'Dips Bacon · Deliveroo', fleche: ['4,30 €', '5,60 €'], gain: '+1,30 €' };

export const LEVIERS: Levier[] = [
  {
    id: 'promotions',
    slug: 'promotions',
    icone: 'ticket',
    nom: 'Vos promotions',
    phrase: 'Des offres sur vos heures creuses, et le bilan de chacune.',
    menu: 'Sur vos heures creuses',
    benefice: 'Une stratégie de promotion intelligente, alimentée par l’IA.',
    points: ['Pas d’offre là où vous vendez déjà bien', 'Une offre ciblée sur vos heures creuses', 'Le bilan de chaque offre, pour garder celles qui ramènent des commandes'],
    vitrine: {
      appareil: 'tablette',
      capture: ECRANS.promotionsLancer,
      carte: { place: { x: 8, y: 11, largeur: 60 }, bulle: { bulle: BULLE_CREUX, x: 4, y: 46, droite: true } },
      page: {
        ratio: 1.02,
        place: { x: 21, y: 7, largeur: 58, rotation: -2 },
        bulles: [
          { bulle: BULLE_CREUX, x: 1, y: 62, xm: 2, ym: 66 },
          { bulle: { sur: 'Objectif', titre: '6 commandes par jour', texte: 'au lieu de 2,8' }, x: 1, y: 14, droite: true, bureau: true },
        ],
      },
    },
  },
  {
    id: 'fraude',
    slug: 'fraude-client',
    icone: 'bouclier',
    nom: 'La fraude client',
    phrase: 'Les remboursements injustifiés, contestés en un clic.',
    menu: 'Contestez en un clic',
    benefice: 'Contestez un remboursement Uber Eats ou Deliveroo en un clic.',
    points: ['Le montant et la date limite, commande par commande', 'Le suivi de chaque contestation', 'Récupérez l’argent de la fraude'],
    vitrine: {
      appareil: 'telephone',
      capture: ECRANS.contestations,
      carte: { place: { x: 11, y: 9, largeur: 45 }, bulle: { bulle: { chiffre: '86,40 €', texte: 'à récupérer sur Uber Eats' }, x: 5, y: 26, droite: true } },
      page: {
        ratio: 1.06,
        ratioMobile: 0.88,
        place: { x: 32, y: 6, largeur: 37 },
        placeMobile: { x: 42, y: 6, largeur: 46 },
        bulles: [
          { bulle: { chiffre: '86,40 €', texte: 'à récupérer sur Uber Eats' }, x: 2, y: 22, xm: 2, ym: 56 },
          { bulle: { sur: 'Premier délai', titre: '30 octobre', texte: '3 remboursements à contester' }, x: 1, y: 60, droite: true, bureau: true },
        ],
      },
    },
  },
  {
    id: 'prix',
    slug: 'prix',
    icone: 'etiquette-prix',
    nom: 'Vos prix',
    phrase: 'Chaque plat face au même plat chez vos concurrents.',
    menu: 'Face à vos concurrents',
    benefice: 'Deliview compare chaque plat de votre menu au même plat chez vos concurrents.',
    points: ['Votre Margherita face à celles des restaurants autour de vous', 'Le prix conseillé, et ce qu’il vous rapporte', 'Vous validez, Deliview le met en ligne'],
    vitrine: {
      appareil: 'navigateur',
      capture: ECRANS.prix,
      carte: { place: { x: 8, y: 12, largeur: 112 }, bulle: { bulle: BULLE_PRIX, x: 6, y: 56 } },
      page: {
        ratio: 1.15,
        place: { x: 5, y: 14, largeur: 92 },
        bulles: [
          { bulle: BULLE_PRIX, x: 0, y: 62, xm: 2, ym: 64 },
          { bulle: { chiffre: '21 plats', texte: 'moins chers que la zone' }, x: 0, y: 2, droite: true, bureau: true },
        ],
      },
    },
  },
];

export interface Veille {
  id: string;
  // Adresse de sa page : /solution/<slug>/.
  slug: string;
  icone: NomIcone;
  nom: string;
  phrase: string;
  // Quelques mots sous le nom, dans le menu Solution.
  menu: string;
  texte: string;
  // L'écran de l'app qui le montre, chacun sur son appareil (page Solution).
  vitrine: { appareil: TypeAppareil; capture: CaptureApp; place: PlaceAppareil; placeMobile: PlaceAppareil; bulle?: BullePlacee };
}
export const VEILLE: Veille[] = [
  {
    id: 'fermeture',
    slug: 'fermeture',
    icone: 'boutique-arret',
    nom: 'Fermé en plein service ?',
    phrase: 'Vérifié toutes les 10 minutes, relancé en un clic.',
    menu: 'Relancé en un clic',
    texte: 'Deliview vous prévient, et relance votre restaurant sur Uber Eats et Deliveroo en un clic.',
    vitrine: { appareil: 'telephone', capture: ECRANS.fermeture, place: { x: 30, y: 12, largeur: 40 }, placeMobile: { x: 22, y: 10, largeur: 56 } },
  },
  {
    id: 'avis',
    slug: 'avis',
    icone: 'bulle-etoile',
    nom: 'Vos avis',
    phrase: 'Une réponse prête pour chaque avis.',
    menu: 'Une réponse IA par avis',
    texte: 'Une réponse rédigée par l’IA pour chaque avis. Vous relisez, vous envoyez.',
    vitrine: { appareil: 'tablette', capture: ECRANS.avisTablette, place: { x: 9, y: 14, largeur: 98 }, placeMobile: { x: 6, y: 12, largeur: 124 } },
  },
  {
    id: 'assistant',
    slug: 'assistant-ia',
    icone: 'robot',
    nom: 'Votre assistant IA',
    phrase: 'La réponse à vos questions, tirée de vos chiffres.',
    menu: 'Répond avec vos chiffres',
    texte: 'Une question sur vos ventes, vos prix ou vos concurrents ? Il répond avec vos chiffres et prépare le rapport pour vos équipes.',
    vitrine: {
      appareil: 'telephone',
      capture: ECRANS.assistant,
      place: { x: 52, y: 12, largeur: 38, rotation: 4 },
      placeMobile: { x: 44, y: 10, largeur: 50, rotation: 4 },
      bulle: { bulle: { sur: 'Votre question', titre: 'Quels sont mes creux ?' }, x: 5, y: 34, xm: 3, ym: 30 },
    },
  },
  {
    id: 'objectifs',
    slug: 'objectifs',
    icone: 'cible',
    nom: 'Vos objectifs',
    phrase: 'Le point chaque lundi sur votre téléphone.',
    menu: 'Le point chaque lundi',
    texte: 'Par semaine ou par mois, restaurant par restaurant. Et chaque lundi, le point sur votre téléphone.',
    vitrine: {
      appareil: 'navigateur',
      capture: ECRANS.objectifsOrdinateur,
      place: { x: 8, y: 13, largeur: 110 },
      placeMobile: { x: 6, y: 12, largeur: 130 },
      bulle: { bulle: { chiffre: '90 %', texte: 'de l’objectif de ventes' }, x: 5, y: 44, xm: 4, ym: 50, droite: true },
    },
  },
];

// Les sept fonctions, chacune avec sa page (7 octobre 2026) : menu Solution, pied de page, accueil, page 404, articles,
// plan du site et llms.txt.
export interface FonctionResume {
  id: string;
  slug: string;
  // Nom sans point d'interrogation (« Fermé en plein service »).
  nom: string;
  icone: NomIcone;
  menu: string;
  phrase: string;
  groupe: 'levier' | 'veille';
}
export const FONCTIONS: FonctionResume[] = [
  ...LEVIERS.map((l) => ({ id: l.id, slug: l.slug, nom: l.nom, icone: l.icone, menu: l.menu, phrase: l.phrase, groupe: 'levier' as const })),
  ...VEILLE.map((v) => ({ id: v.id, slug: v.slug, nom: v.nom.replace(/ \?$/, ''), icone: v.icone, menu: v.menu, phrase: v.phrase, groupe: 'veille' as const })),
];
// Adresse de la page d'une fonction, depuis son identifiant (« fraude ») ou son slug (« fraude-client »).
export function cheminFonction(id: string): string {
  const f = FONCTIONS.find((x) => x.id === id || x.slug === id);
  if (!f) throw new Error(`Fonction inconnue : ${id}`);
  return `/solution/${f.slug}/`;
}

// Accueil de l'app, Uber Eats et Deliveroo côte à côte (page Intégrations) ; Menu › Prix (page Uber Eats et Deliveroo).
export const CAPTURE_POSITION: CaptureApp = ECRANS.classement;
export const CAPTURE_PRIX: CaptureApp = ECRANS.prix;

// « Ressources » ouvre un menu : articles, questions fréquentes, Qui sommes-nous (décision de Tom, 2 octobre 2026).
export const NAV = [
  { libelle: 'Solution', href: '/solution/', menu: 'solution' },
  { libelle: 'Tarifs', href: '/tarifs/' },
  { libelle: 'Affiliation', href: '/parrainage/' },
  { libelle: 'Ressources', href: '/ressources/', menu: 'ressources' },
];

// Icônes dessinées du registre (src/lib/registre-icones.ts), affichées à côté de chaque entrée du menu.
// 7 octobre 2026 (demande de Tom) : « Qui suis-je » en premier, « Blog » à la place de « Articles et guides », phrases
// courtes. Les adresses ne changent pas (/qui-sommes-nous/, /ressources/).
export const MENU_RESSOURCES = [
  { libelle: 'Qui suis-je', phrase: 'Le fondateur et l’histoire', href: '/qui-sommes-nous/', icone: 'toque' },
  { libelle: 'Blog', phrase: 'Guides pour restaurateurs', href: '/ressources/', icone: 'ardoise' },
  { libelle: 'Intégrations', phrase: 'Uber Eats et Deliveroo', href: '/integrations/', icone: 'tablette-qui-sonne' },
  { libelle: 'Questions fréquentes', phrase: 'Prix, fonctionnement, engagement', href: '/questions-frequentes/', icone: 'enveloppe' },
] as const;

export const PLATEFORMES = [
  {
    slug: 'uber-eats',
    nom: 'Uber Eats',
    statut: 'disponible' as Statut,
    resume: 'Vos prix, votre note et vos offres face à vos concurrents Uber Eats.',
    disponible: ['Prix de toute votre carte, note, nombre d’avis, offres', 'Les mêmes données chez vos concurrents, avec leur distance', 'Les plats à revoir, avec un prix proposé', 'Vos ventes de la veille chaque jour à 7 h, vos avis et vos remboursements'],
  },
  {
    slug: 'deliveroo',
    nom: 'Deliveroo',
    statut: 'disponible' as Statut,
    resume: 'Les mêmes analyses que sur Uber Eats, et les écarts entre vos deux cartes.',
    disponible: ['Prix de toute votre carte, note, nombre d’avis, offres', 'Les mêmes données chez vos concurrents, avec leur distance', 'Les écarts de prix entre vos cartes Deliveroo et Uber Eats', 'Vos ventes de la veille chaque jour à 7 h, vos avis et vos remboursements'],
  },
];

// Les 3 abonnements, selon le nombre de restaurants. Prix HT par mois, sans engagement, mise en place offerte.
// Benchmark (1er octobre 2026) : Otter 34/49/89 €, Fooderise 49/99 €, HubRise 35 €, Deliverect 79/119/199 € par établissement.
export interface Offre {
  slug: string;
  nom: string;
  prix: number;
  restaurants: string;
  // Nombre de restaurants au plus (simulateur : l'offre qui correspond au nombre saisi).
  maxRestaurants: number;
  pour: string;
  // Page Tarifs (7 octobre 2026) : la situation du restaurateur à qui l'offre s'adresse, sous « Pour vous si ».
  pourVous: string;
  recommandee?: boolean;
  // Titre de la liste des fonctionnalités sur la carte de l'offre (« Inclus : », « Tout Pro, plus : »).
  base: string;
  inclus: LigneOffre[];
}

// Une ligne de la carte d'une offre ; `bientot` : promise par l'offre mais pas encore dans l'app (étiquette « Bientôt »).
export type LigneOffre = string | { texte: string; bientot: true };

export const OFFRES: Offre[] = [
  // Répartition revue le 6 octobre 2026 (demande de Tom) : Essentiel pour suivre et améliorer un restaurant ; Pro pour que
  // Deliview agisse (promos, prix, fraude client) sur 3 restaurants ; Groupe (identifiant « premium », gardé par l'app et
  // Stripe) pour un réseau, avec un point chaque mois avec Tom. Les limites ne sont pas encore appliquées dans l'app.
  // Page Tarifs refaite le 7 octobre 2026 (demande de Tom : « répartit les features de manière simple, écrite de manière
  // concise ») : mêmes fonctionnalités, en lignes courtes ; Essentiel = vous suivez tout, Pro = Deliview agit pour vous,
  // Groupe = un point chaque mois avec Tom. `pour` reste le texte de l'accueil et de llms.txt.
  // 7 octobre 2026, 19 h 21 (demande de Tom : « répartis correctement les features de l'app, simple, concis, pas de
  // features bientôt ») : la répartition de l'app (app/src/lib/offre.ts), une ligne courte par fonction ; Essentiel
  // montre aussi ses remboursements et sa limite d'analyse (1 par semaine) ; l'historique des prix, pas encore dans
  // l'app, est retiré.
  // 7 octobre 2026, 21 h 51 (demande de Tom) : le nombre de restaurants passe du titre de la carte Tarifs à la liste,
  // à la place des accès (les accès restent dans le tableau comparatif).
  // 7 octobre 2026, 19 h 44 : textes de Tom, mot pour mot (« Pour vous si » de Tarifs : « Vous voulez… » ; cartes de
  // l'accueil et llms.txt : la même phrase à l'impératif).
  {
    slug: 'essentiel',
    nom: 'Essentiel',
    prix: 59,
    restaurants: '1 restaurant',
    maxRestaurants: 1,
    pour: 'Améliorez la rentabilité de votre activité livraison',
    pourVous: 'Vous voulez améliorer la rentabilité de votre activité livraison.',
    base: 'Inclus :',
    inclus: [
      'Ventes Uber Eats et Deliveroo réunies',
      'Vos prix face aux concurrents',
      'Promos et notes de votre zone',
      'Remboursements et dates limites',
      'Réponses IA à vos avis',
      'Alerte si fermé en plein service',
      'Objectifs et point du lundi',
      '1 analyse de zone par semaine',
      '1 restaurant',
    ],
  },
  {
    slug: 'pro',
    nom: 'Pro',
    prix: 199,
    restaurants: 'Jusqu’à 3 restaurants',
    maxRestaurants: 3,
    pour: 'Améliorez la rentabilité et devancez vos concurrents sur les plateformes de livraison',
    pourVous: 'Vous voulez améliorer la rentabilité et devancer vos concurrents sur les plateformes de livraison.',
    recommandee: true,
    base: 'Tout Essentiel, plus :',
    // Analyses à la demande et concurrents choisis : réservés à Pro dans l'app depuis le 4 octobre (app/src/lib/offre.ts :
    // Essentiel, une analyse par semaine), ajoutés à la page le 7 octobre pour qu'aucune limite ne soit cachée.
    inclus: [
      'Promos et prix mis en ligne, après votre accord',
      'Remboursements contestés en un clic',
      'Restaurant fermé relancé en un clic',
      'Analyses de zone à la demande',
      'Concurrents de votre choix',
      'Assistant IA et rapport d’équipe',
      'Jusqu’à 3 restaurants',
    ],
  },
  {
    slug: 'premium',
    nom: 'Groupe',
    prix: 399,
    restaurants: 'Jusqu’à 10 restaurants',
    maxRestaurants: 10,
    pour: 'Pilotez intelligemment et améliorez la rentabilité de toute votre activité livraison',
    pourVous: 'Vous voulez piloter intelligemment et améliorer la rentabilité de toute votre activité livraison.',
    base: 'Tout Pro, plus :',
    inclus: ['Point mensuel avec Tom', 'Jusqu’à 10 restaurants'],
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
// Page de fonction liée à chaque article (encadré « Dans Deliview ») : d'abord l'article, sinon son thème.
// Un article sans fonction proche (TVA) mène à la page Solution.
const FONCTION_DU_THEME: Record<string, string | null> = { 'prix-et-concurrence': 'prix', 'carte-et-marge': 'prix', reputation: 'avis', commandes: null };
const FONCTION_DE_L_ARTICLE: Record<string, string | null> = {
  'promotion-uber-eats-deliveroo-rentable': 'promotions',
  'contester-remboursement-uber-eats-deliveroo': 'fraude',
  'restaurant-ferme-uber-eats-deliveroo': 'fermeture',
  'tablettes-uber-eats-deliveroo-rush': 'fermeture',
  'tva-ventes-livraison-restaurant': null,
  // Article pilier (7 octobre 2026) : il relie tous les guides, l'encadré mène à la page Solution.
  'augmenter-ventes-uber-eats-deliveroo': null,
};
export function fonctionDeLArticle(id: string, theme: string): FonctionResume | null {
  const f = id in FONCTION_DE_L_ARTICLE ? FONCTION_DE_L_ARTICLE[id] : FONCTION_DU_THEME[theme] ?? null;
  return f ? FONCTIONS.find((x) => x.id === f) ?? null : null;
}
export function fonctionDuTheme(theme: string): FonctionResume | null {
  const f = FONCTION_DU_THEME[theme] ?? null;
  return f ? FONCTIONS.find((x) => x.id === f) ?? null : null;
}

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
