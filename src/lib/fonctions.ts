// Pages des fonctions (7 octobre 2026, demande de Tom : « fait leur page chacune, tu dois avoir une cohérence ») :
// le contenu des sept pages /solution/<slug>/, toutes sur le même gabarit (src/pages/solution/[slug].astro).
// Règles de contenu :
// - uniquement ce que l'app fait aujourd'hui (code de l'app et docs du projet, 3 au 7 octobre 2026) ;
// - offres comme la page Tarifs et app/src/lib/offre.ts (Essentiel : prix proposés, zone, avis, alerte de fermeture,
//   objectifs ; Pro et Groupe : promos conseillées et mises en ligne, prix mis en ligne, contestations, relance,
//   assistant, concurrents choisis, analyses à la demande) ;
// - délais promis : seulement ceux décidés par Tom (sous 10 min pour les prix, les promos et les contestations, sous
//   5 min pour la relance) ; jamais « automatique » ; rien sur la façon dont les données sont obtenues ;
// - bulles : seulement des chiffres lus sur leur capture ; « Exemple réel » : seulement des analyses réelles anonymisées.
import type { NomIcone } from './registre-icones';
import { ECRANS, EXEMPLE_MARGHERITA as ex, FRAGMENTS, LEVIERS, euros, type BullePlacee, type CaptureApp, type PlaceAppareil, type TypeAppareil } from './site';

export interface VisuelVitrine {
  type: 'vitrine';
  appareil: TypeAppareil;
  capture: CaptureApp;
  // Largeur / hauteur du plateau, sur ordinateur et sur téléphone.
  ratio: number;
  ratioMobile?: number;
  place: PlaceAppareil;
  placeMobile?: PlaceAppareil;
  bulles: BullePlacee[];
}
export interface VisuelFragment {
  type: 'fragment';
  fragment: CaptureApp;
  // Étiquette qui flotte devant la carte.
  puce?: string;
}
// L'exemple réel de l'accueil (ticket Margherita), sur son plateau.
export interface VisuelMargherita {
  type: 'margherita';
}
export interface Exemple {
  texte: string;
  contexte: string;
}
export interface Bloc {
  id: string;
  icone: NomIcone;
  nom: string;
  titre: string;
  texte?: string;
  points: string[];
  // Sans visuel, l'exemple réel (ticket) prend la place de l'image.
  visuel?: VisuelVitrine | VisuelFragment | VisuelMargherita;
  exemple?: Exemple;
  lien?: { href: string; libelle: string };
}
export interface Source {
  titre: string;
  url: string;
  editeur: string;
  consulteLe: string;
}
export interface PageFonction {
  meta: { title: string; description: string };
  h1: string;
  lead: string;
  points: string[];
  hero: VisuelVitrine;
  etapesTitre: string;
  etapes: { titre: string; texte: string }[];
  // Un autre écran de l'app, en plus grand ; puis, s'il y en a un, un bloc de plus.
  zoom?: Bloc;
  complement?: Bloc;
  regles: { surtitre: string; titre: string; reponse: string; points: string[]; sources?: Source[] };
  // Ce que chaque offre comprend pour cette fonction ; absent : la fonction n'est pas dans ces offres.
  offres: { toutes?: string; pro?: string };
  faq: { q: string; r: string }[];
  // Articles du blog liés (identifiants), dans l'ordre.
  articles: string[];
}

// Nom d'offre jamais coupé en fin de ligne.
const UN_ACHETE = '«\u00a01\u00a0acheté\u00a0=\u00a01\u00a0offert\u00a0»';
const ENLETTRES = ['Zéro', 'Un', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six', 'Sept', 'Huit', 'Neuf', 'Dix'];

// Haut de page des leviers : la même vitrine que sur la page Solution.
const heroLevier = (id: string): VisuelVitrine => {
  const l = LEVIERS.find((x) => x.id === id);
  if (!l) throw new Error(`Levier inconnu : ${id}`);
  const p = l.vitrine.page;
  return { type: 'vitrine', appareil: l.vitrine.appareil, capture: l.vitrine.capture, ratio: p.ratio, ratioMobile: p.ratioMobile, place: p.place, placeMobile: p.placeMobile, bulles: p.bulles };
};

export const PAGES: Record<string, PageFonction> = {
  promotions: {
    meta: {
      title: 'Promotions Uber Eats et Deliveroo rentables | Deliview',
      description:
        'Deliview repère vos heures creuses et propose l’offre à lancer sur Uber Eats et Deliveroo, chiffrée. Vous validez, il la met en ligne. Demandez une démo.',
    },
    // Titre du PDF de Tom, le même que la carte de l'accueil (7 octobre 2026, 18 h 47 : « tu dois garder une stratégie de
    // promotion alimentée par l'IA »). L'IA : l'assistant prépare l'offre programmée (outil programmer_offre), vous validez.
    h1: 'Une stratégie de promotion intelligente, alimentée par l’IA',
    lead: 'Deliview repère les services où vous vendez peu et vous propose l’offre à lancer, avec son coût et son objectif.',
    points: ['Vos creux mesurés sur vos ventes, service par service', 'L’assistant IA prépare l’offre, vous la validez', 'Le bilan de chaque offre, pour garder celles qui marchent'],
    hero: heroLevier('promotions'),
    etapesTitre: 'De vos ventes à l’offre en ligne',
    etapes: [
      { titre: 'Deliview trouve vos creux', texte: 'Il compare chaque service à vos autres services, sur vos ventes Uber Eats et Deliveroo. Par exemple, le mardi midi face aux autres midis.' },
      { titre: 'Il choisit l’offre et la chiffre', texte: 'Une offre que la plateforme propose, au niveau de celles de votre zone. Avec son coût par commande, commission Uber Eats comprise, et un objectif à suivre.' },
      { titre: 'Vous validez, Deliview la met en ligne', texte: 'Sous 10 min sur Uber Eats ou Deliveroo. Ensuite, le bilan compare vos commandes sur ce créneau, avant et pendant l’offre.' },
    ],
    zoom: {
      id: 'zone',
      icone: 'loupe-zone',
      nom: 'La zone',
      titre: 'Les offres de vos voisins, avant de lancer les vôtres',
      points: ['Chaque offre affichée par vos concurrents, plateforme par plateforme', 'Leurs habitudes, d’un relevé à l’autre', 'Ce qui a changé chez eux ces derniers jours'],
      visuel: {
        type: 'vitrine',
        appareil: 'navigateur',
        capture: ECRANS.promotionsZone,
        ratio: 1.14,
        ratioMobile: 1.0,
        place: { x: 4, y: 13, largeur: 92 },
        bulles: [{ bulle: { chiffre: '11 sur 15', texte: 'restaurants en promo sur Uber Eats' }, x: 1, y: 64, xm: 2, ym: 66 }],
      },
      exemple: {
        texte: `Sur Uber Eats, 11 restaurants sur 15 avaient une offre, le plus souvent ${UN_ACHETE}. Le restaurant n’en affichait aucune.`,
        contexte: 'Restaurant de burgers à Paris, relevé du 3 octobre 2026',
      },
    },
    regles: {
      surtitre: 'Les règles',
      titre: 'Ce que Deliview vérifie avant de proposer une offre',
      reponse: 'Deliview ne propose que des offres que la plateforme permet de lancer, et chiffre chacune avant de vous la montrer.',
      points: [
        'Jamais un petit article offert dès un montant, comme une boisson pour 30 € de commande.',
        'Si une bonne partie de vos remises tombe sur vos meilleurs services, Deliview vous le dit, avec ce que vous économiseriez par mois.',
        `${UN_ACHETE} seulement si au moins 2 concurrents le font. Sinon, une remise sur 3 plats au plus, au niveau de la zone.`,
        'Un objectif pour chaque offre. Sans hausse en deux semaines, Deliview vous conseille de l’arrêter.',
      ],
    },
    offres: {
      toutes: 'Les offres de vos concurrents, plateforme par plateforme, et ce qui change chez eux.',
      pro: 'Les offres à lancer sur vos creux, mises en ligne après votre accord, sous 10 min, puis leur bilan.',
    },
    faq: [
      {
        q: 'Est-ce que Deliview lance une promo sans mon accord ?',
        r: 'Non. Deliview vous propose l’offre, avec son coût et son objectif. Elle ne passe en ligne que si vous la validez, avec l’offre Pro ou Groupe.',
      },
      {
        q: 'Où intervient l’IA dans mes promos ?',
        r: 'Dans l’assistant IA, avec l’offre Pro ou Groupe. Demandez-lui quelle promo lancer sur un creux&nbsp;: il répond avec vos chiffres et prépare l’offre programmée. Vous la vérifiez, puis vous la validez.',
      },
      {
        q: 'Quelles promos est-ce que Deliview peut me proposer ?',
        r: `Uniquement celles qu’Uber Eats et Deliveroo permettent&nbsp;: une remise sur des plats, ${UN_ACHETE}, une remise dès un montant, une offre réservée aux nouveaux clients.`,
      },
      {
        q: 'Comment je sais si une promo a marché ?',
        r: 'Pour chaque offre lancée, Deliview compare vos commandes sur ce créneau, avant et pendant l’offre, dès que vos ventes de la période sont là.',
      },
      {
        q: 'Est-ce que je vois les promos de mes concurrents ?',
        r: 'Oui, dans toutes les offres. Chaque offre affichée par vos concurrents, plateforme par plateforme, et ce qui a changé chez eux ces derniers jours.',
      },
    ],
    articles: ['promotion-uber-eats-deliveroo-rentable', 'augmenter-ventes-uber-eats-deliveroo', 'analyser-prix-concurrents-livraison'],
  },

  fraude: {
    meta: {
      title: 'Fraude client sur Uber Eats et Deliveroo | Deliview',
      description:
        'Un client se dit mal servi, la plateforme le rembourse avec votre argent. Deliview liste chaque remboursement et sa date limite : contestez en un clic.',
    },
    h1: 'Contestez un remboursement injustifié en un clic',
    lead: 'Un client dit qu’il manque un plat, la plateforme le rembourse et retire la somme de votre versement. Deliview vous montre chaque remboursement, avec la date limite pour le contester.',
    points: ['Le montant et la date limite, commande par commande', 'Uber Eats et Deliveroo au même endroit', 'Chaque contestation suivie, jusqu’à la réponse'],
    hero: heroLevier('fraude'),
    etapesTitre: 'Du remboursement à la réponse de la plateforme',
    etapes: [
      { titre: 'Deliview liste vos remboursements', texte: 'Chaque commande remboursée, avec le montant retiré de votre versement et la date limite pour contester.' },
      { titre: 'Vous contestez en un clic', texte: 'Une raison, un mot si vous voulez, et une photo du sac fermé quand vous l’avez.' },
      { titre: 'Deliview l’envoie et suit la réponse', texte: 'La contestation part sous 10 min. Vous voyez où elle en est : envoyée, acceptée ou refusée.' },
    ],
    zoom: {
      id: 'suivi',
      icone: 'pieces',
      nom: 'Le suivi',
      titre: 'Envoyée, acceptée ou refusée : vous suivez chaque contestation',
      points: ['Le jour et l’heure de l’envoi à la plateforme', 'Sa réponse, et l’argent qu’elle vous rend', 'Ce que vous avez récupéré et perdu sur 90 jours'],
      visuel: { type: 'fragment', fragment: FRAGMENTS.contestations, puce: 'Uber Eats' },
    },
    regles: {
      surtitre: 'Les délais',
      titre: 'Chaque plateforme fixe son délai',
      reponse: 'Passé le délai, l’argent est perdu. Deliview le calcule pour chaque commande et vous montre d’abord les plus pressées.',
      points: [
        'Uber Eats&nbsp;: jusqu’à 30 jours après la commande.',
        'Deliveroo&nbsp;: jusqu’à 7 jours après le remboursement.',
        'Une photo du sac fermé, numéro de commande visible, appuie votre contestation.',
        'La plateforme décide. Deliview vous montre sa réponse, acceptée ou refusée.',
      ],
      sources: [
        {
          titre: 'Gestion des remboursements en cas de commandes incorrectes ou incomplètes',
          url: 'https://help.uber.com/fr-FR/merchants-and-restaurants/article/gestion-des-remboursements-en-cas-de-commandes-incorrectes-ou-incompl%C3%A8tes-?nodeId=abc0c3e7-9687-4a00-a956-2c8a16cf0b7e',
          editeur: 'Uber',
          consulteLe: '6 octobre 2026',
        },
        {
          titre: 'Comment gérer et contester les remboursements dans le Portail Partenaire',
          url: 'https://help.deliveroo.com/fr/articles/6457561-comment-gerer-et-contester-les-remboursements-dans-le-portail-partenaire',
          editeur: 'Deliveroo',
          consulteLe: '6 octobre 2026',
        },
      ],
    },
    offres: {
      toutes: 'Chaque remboursement, son montant et la date limite pour le contester.',
      pro: 'Vous contestez en un clic : Deliview envoie la contestation et suit la réponse.',
    },
    faq: [
      {
        q: 'Est-ce que Deliview conteste sans me demander ?',
        r: 'Non. Vous choisissez les commandes à contester. Deliview n’envoie que les contestations que vous avez validées.',
      },
      {
        q: 'Quels remboursements est-ce que je peux contester ?',
        r: 'Ceux que la plateforme a retirés de votre versement, tant que le délai court&nbsp;: 30 jours après la commande sur Uber&nbsp;Eats, 7 jours après le remboursement sur Deliveroo.',
      },
      {
        q: 'Est-ce que je suis sûr de récupérer mon argent ?',
        r: 'Non. C’est la plateforme qui décide. Deliview vous montre sa réponse et fait le compte&nbsp;: ce que vous avez récupéré, ce que vous avez perdu.',
      },
      {
        q: 'Est-ce que je dois donner mon mot de passe ?',
        r: 'Non. Vous invitez Deliview une fois, comme utilisateur, dans Uber&nbsp;Eats Manager et dans le Partner Hub de Deliveroo. Vous retirez cet accès quand vous voulez.',
      },
    ],
    articles: ['contester-remboursement-uber-eats-deliveroo'],
  },

  prix: {
    meta: {
      title: 'Vos prix Uber Eats et Deliveroo face à la zone | Deliview',
      description:
        'Vos plats face au même plat chez vos concurrents sur Uber Eats et Deliveroo, avec un prix conseillé et ce qu’il vous rapporte. Demandez une démo.',
    },
    h1: 'Chaque plat au bon prix face à vos concurrents',
    lead: 'Deliview compare vos plats au même plat chez vos concurrents, et vous dit lequel monter ou baisser.',
    points: ['Jusqu’à 20 restaurants de votre secteur, choisis d’abord pour leur proximité', 'Le même plat, à taille égale, sur la même plateforme', 'Un prix conseillé, ses sources et ce qu’il vous rapporte'],
    hero: heroLevier('prix'),
    etapesTitre: 'Comment Deliview conseille un prix',
    etapes: [
      { titre: 'Il retient vos concurrents', texte: 'Jusqu’à 20 restaurants de votre secteur, choisis d’abord pour leur proximité, sur Uber Eats et Deliveroo. Avec Pro ou Groupe, 3 d’entre eux peuvent être choisis par vous.' },
      { titre: 'Il compare plat par plat', texte: 'Votre pizza 33 cm face aux pizzas 33 cm de la zone. Il calcule la médiane des prix et l’écart avec le vôtre.' },
      { titre: 'Vous décidez du prix', texte: 'Deliview propose un prix, avec ceux de vos concurrents. Vous l’appliquez, ou Deliview le met en ligne pour vous avec Pro ou Groupe, sous 10 min.' },
    ],
    zoom: {
      id: 'exemple',
      icone: 'etiquette-prix',
      nom: 'Exemple réel',
      // Mêmes chiffres que l'exemple réel de l'accueil (EXEMPLE_MARGHERITA).
      titre: `Une ${ex.plat} ${euros(ex.mediane - ex.votrePrix, 0)} sous le prix de sa zone`,
      texte: `Une pizzeria sur ${ex.plateforme} vendait sa ${ex.plat} ${euros(ex.votrePrix)}. ${ENLETTRES[ex.concurrents] ?? ex.concurrents} concurrents la vendent autour de ${euros(ex.mediane)}. Deliview propose ${euros(ex.prixPropose)} : toujours moins cher que les voisins, et ${euros(ex.gainPour100, 0)} de ventes en plus pour 100 pizzas.`,
      points: [],
      visuel: { type: 'margherita' },
      lien: { href: '/simulateur/', libelle: 'Calculer pour mon restaurant' },
    },
    complement: {
      id: 'fiches',
      icone: 'appareil-photo',
      nom: 'Vos fiches de plats',
      titre: 'Et des fiches de plats qui donnent envie',
      points: ['Photos et descriptions passées en revue, plat par plat', 'Comparées à celles des restaurants de votre zone', 'Une description proposée par l’IA, que vous corrigez avant de l’envoyer'],
      exemple: {
        texte: '8 plats sur 33 sans description, soit 24 %. Chez 9 concurrents : 5 %.',
        contexte: 'Restaurant de burgers à Paris, Deliveroo, analyse du 2 octobre 2026',
      },
    },
    regles: {
      surtitre: 'La méthode',
      titre: 'Ce que Deliview vérifie avant de conseiller un prix',
      reponse: 'Deliview ne compare que des plats comparables&nbsp;: même type, même taille. Il calcule la médiane des prix de la zone, puis l’écart avec votre prix.',
      points: [
        'Au moins 2 concurrents qui vendent le même plat pour conseiller un prix.',
        'Plus de 10&nbsp;% au-dessus de la médiane&nbsp;: trop cher. Plus de 10&nbsp;% en dessous&nbsp;: sous-évalué, avec un prix conseillé à mi-chemin.',
        'Chaque prix conseillé cite ses sources&nbsp;: les restaurants comparés et leurs prix.',
      ],
    },
    offres: {
      toutes: 'Chaque plat face à la zone, avec un prix conseillé. Jusqu’à une analyse de votre zone par semaine.',
      pro: 'Le nouveau prix mis en ligne après votre accord, sous 10 min. Votre zone analysée à la demande, et les concurrents de votre choix.',
    },
    faq: [
      {
        q: 'Comment je sais quels concurrents Deliview suit ?',
        r: 'Deliview retient jusqu’à 20&nbsp;restaurants de votre secteur, choisis d’abord pour leur proximité. Avec l’offre Pro ou Groupe, 3 d’entre eux peuvent être des restaurants de votre choix, même plus loin.',
      },
      {
        q: 'Est-ce que Deliview peut changer mes prix sur Uber Eats ou Deliveroo ?',
        r: 'Oui, avec l’offre Pro ou Groupe, quand vous le décidez. Vous validez le prix dans Deliview, et Deliview l’applique pour vous sur Uber&nbsp;Eats ou Deliveroo, sous 10&nbsp;minutes. Rien ne change sans votre accord.',
      },
      {
        q: 'Mes prix en livraison sont plus chers qu’en salle. Est-ce que c’est un problème ?',
        r: 'Non. Deliview compare vos prix de livraison à ceux de vos voisins, sur la même plateforme.',
      },
      {
        q: 'Que faire d’un plat que je suis le seul à vendre ?',
        r: 'Deliview ne vous propose pas de prix pour ce plat&nbsp;: il lui faut au moins 2 concurrents qui vendent le même.',
      },
      {
        q: 'Est-ce que je vois les prix à jour ?',
        r: 'Oui, à chaque analyse de votre zone&nbsp;: jusqu’à une par semaine avec Essentiel, à la demande avec Pro et Groupe. Vous voyez aussi ce qui a changé chez vos concurrents ces derniers jours.',
      },
    ],
    articles: ['fixer-prix-uber-eats-deliveroo', 'analyser-prix-concurrents-livraison', 'commission-uber-eats-restaurant'],
  },

  fermeture: {
    meta: {
      title: 'Alerte restaurant fermé en plein service | Deliview',
      description:
        'Tablette éteinte, pause oubliée : Deliview vérifie votre restaurant sur Uber Eats et Deliveroo pendant le service, et vous prévient. Relance en un clic.',
    },
    h1: 'Fermé en plein service ? Deliview vous prévient',
    lead: 'Une tablette éteinte, une pause oubliée, et votre restaurant n’apparaît plus. Deliview vérifie qu’il est ouvert toutes les 10 minutes pendant vos heures de service.',
    points: ['Uber Eats et Deliveroo, toutes les 10 minutes pendant le service', 'Une alerte seulement pendant vos heures habituelles', 'Avec Pro, Deliview le relance sous 5 min'],
    hero: {
      type: 'vitrine',
      appareil: 'telephone',
      capture: ECRANS.fermeture,
      ratio: 1.06,
      ratioMobile: 0.88,
      place: { x: 32, y: 6, largeur: 37 },
      placeMobile: { x: 42, y: 6, largeur: 46 },
      bulles: [
        { bulle: { sur: 'Deliveroo', titre: 'Fermé depuis 19 h 42', texte: 'd’habitude ouvert jusqu’à 22 h 20' }, x: 2, y: 22, xm: 2, ym: 56 },
        { bulle: { sur: 'En un clic', titre: 'Relancer mon restaurant' }, x: 1, y: 62, droite: true, bureau: true },
      ],
    },
    etapesTitre: 'Comment Deliview surveille votre restaurant',
    etapes: [
      { titre: 'Il connaît vos heures de service', texte: 'Vos horaires affichés, corrigés par l’habitude : une pause que vous faites chaque après-midi n’est plus signalée une fois apprise.' },
      { titre: 'Il vérifie pendant le service', texte: 'Toutes les 10 minutes, sur Uber Eats et Deliveroo. Une fermeture est vérifiée une seconde fois avant l’alerte.' },
      { titre: 'Il vous prévient', texte: 'Un bandeau rouge en haut de l’accueil dit quoi vérifier : la tablette, ou votre statut sur la plateforme. Avec Pro, « Relancer mon restaurant ».' },
    ],
    regles: {
      surtitre: 'Les règles',
      titre: 'Pas d’alerte pour rien',
      reponse: 'Deliview ne vous dérange que si votre restaurant devrait être ouvert.',
      points: [
        'Rien en dehors de vos heures de service habituelles.',
        'Rien dans les 20 premières ni dans les 20 dernières minutes du service.',
        'Fermé depuis plus de 24 h, pour des congés par exemple&nbsp;: pas d’alerte à chaque service.',
        'De nouveau ouvert&nbsp;: Deliview vous dit combien de temps la fermeture a duré.',
      ],
    },
    offres: {
      toutes: 'Une alerte quand votre restaurant est fermé pendant vos heures de service.',
      pro: '« Relancer mon restaurant » : Deliview le relance sous 5 min.',
    },
    faq: [
      {
        q: 'Comment je suis prévenu ?',
        r: 'Dans Deliview&nbsp;: un bandeau rouge en haut de l’accueil tant que la fermeture dure, et une notification dans la cloche.',
      },
      {
        q: 'Je ferme parfois exprès l’après-midi. Est-ce que je vais recevoir des alertes ?',
        r: 'Non. Deliview apprend vos habitudes&nbsp;: une pause que vous faites souvent au même moment n’est plus signalée au bout de 2 à 3 semaines.',
      },
      {
        q: 'Que fait le bouton « Relancer mon restaurant » ?',
        r: 'Il demande à Deliview de relancer votre restaurant sur la plateforme, sous 5&nbsp;minutes. Si la tablette est éteinte, rallumez-la aussi. Il faut l’offre Pro ou Groupe, et l’accès de Deliview à cette plateforme.',
      },
      {
        q: 'Mon restaurant n’est que sur Deliveroo. Est-ce que ça marche ?',
        r: 'Oui. Les premières semaines, Deliview apprend vos horaires, sans vous alerter. Ensuite, il vous prévient pendant vos heures habituelles.',
      },
    ],
    articles: ['restaurant-ferme-uber-eats-deliveroo', 'tablettes-uber-eats-deliveroo-rush'],
  },

  avis: {
    meta: {
      title: 'Réponses aux avis Uber Eats et Deliveroo | Deliview',
      description:
        'Pour chaque avis Uber Eats et Deliveroo, Deliview prépare une réponse avec l’IA. Vous relisez, vous envoyez. Et vous voyez votre note face à votre zone.',
    },
    h1: 'Une réponse prête pour chaque avis',
    lead: 'Deliview réunit vos avis Uber Eats et Deliveroo. Pour chacun, l’IA prépare une réponse au nom du restaurant : vous relisez, vous envoyez.',
    points: ['Une réponse qui reprend un détail de l’avis', 'Les avis sensibles gardés pour votre relecture', 'Votre note face à celles de votre zone'],
    hero: {
      type: 'vitrine',
      appareil: 'tablette',
      capture: ECRANS.avisTablette,
      ratio: 1.14,
      ratioMobile: 1.0,
      place: { x: 5, y: 16, largeur: 90, rotation: -2 },
      bulles: [{ bulle: { sur: 'Avis 2 étoiles · Deliveroo', titre: 'Réponse prête', texte: 'à relire, puis envoyer' }, x: 1, y: 64, xm: 2, ym: 66, droite: true }],
    },
    etapesTitre: 'De l’avis à la réponse envoyée',
    etapes: [
      { titre: 'Vos avis réunis', texte: 'Les avis Uber Eats et Deliveroo qui ont un commentaire, les moins bonnes notes d’abord.' },
      { titre: 'Une réponse préparée par l’IA', texte: 'Au nom du restaurant. L’IA reprend un détail de l’avis et évite de répéter vos dernières réponses.' },
      { titre: 'Vous relisez, vous envoyez', texte: 'Vous la modifiez si besoin. Pour les avis 4 et 5 étoiles, vous pouvez choisir de répondre directement.' },
    ],
    zoom: {
      id: 'note',
      icone: 'etoile',
      nom: 'Votre note',
      titre: 'Votre note face à celles de votre zone',
      points: ['Votre place au classement des notes, plateforme par plateforme', 'Votre nombre d’avis face au leur', 'La note à atteindre pour entrer dans le top 3'],
      visuel: {
        type: 'vitrine',
        appareil: 'navigateur',
        capture: ECRANS.notes,
        ratio: 1.14,
        ratioMobile: 1.0,
        place: { x: 4, y: 13, largeur: 92 },
        bulles: [{ bulle: { chiffre: '4,2', etoile: true, texte: '8e sur 14 · Uber Eats' }, x: 1, y: 64, xm: 2, ym: 66 }],
      },
      exemple: { texte: '4,2 sur Uber Eats pour plus de 2 000 avis : 8e sur 14 dans la zone, à 0,4 point du top 3.', contexte: 'Restaurant de burgers à Paris, Uber Eats, analyse du 2 octobre 2026' },
    },
    regles: {
      surtitre: 'Les règles',
      titre: 'Vos réponses restent les vôtres',
      reponse: 'L’IA prépare, vous décidez. Deliview n’envoie que les réponses que vous avez validées, ou celles des avis 4 et 5 étoiles si vous l’avez choisi.',
      points: [
        'Un avis qui parle de santé, d’hygiène ou d’allergie est gardé pour votre relecture.',
        'L’IA est réglée pour reprendre un détail de l’avis, sans copier vos réponses précédentes.',
        'Jamais de bon de réduction ajouté à une réponse.',
        'Les plats que vos clients signalent deviennent des consignes pour l’équipe, prêtes à envoyer sur WhatsApp.',
      ],
    },
    offres: { toutes: 'Une réponse IA pour chaque avis, votre note face à votre zone, et les consignes pour l’équipe.' },
    faq: [
      {
        q: 'Est-ce que les réponses partent sans moi ?',
        r: 'Non. Vous relisez chaque réponse avant de l’envoyer. Si vous le choisissez, les réponses aux avis 4 et 5 étoiles partent directement. Jamais celles des mauvais avis.',
      },
      {
        q: 'Est-ce que les réponses se ressemblent ?',
        r: 'L’IA est réglée pour l’éviter&nbsp;: chaque réponse reprend un détail de l’avis, et ne doit ressembler ni aux autres réponses du jour, ni à vos dernières réponses.',
      },
      {
        q: 'Et les avis sans commentaire ?',
        r: 'Une note seule n’appelle pas de réponse. Elle compte dans votre note, et Deliview vous montre votre place face aux restaurants de votre zone.',
      },
      {
        q: 'Pourquoi est-ce que je compare ma note à celle de mes voisins ?',
        r: 'Parce que le client choisit parmi les restaurants qu’il voit. Un 4,5 ne pèse pas pareil si vos voisins sont à 4,7.',
      },
    ],
    articles: ['algorithme-classement-uber-eats-deliveroo', 'ameliorer-note-uber-eats-deliveroo'],
  },

  assistant: {
    meta: {
      title: 'Assistant IA pour restaurant en livraison | Deliview',
      description:
        'Une question sur vos ventes, vos prix ou vos concurrents ? L’assistant IA de Deliview répond avec vos chiffres et prépare le rapport de l’équipe.',
    },
    h1: 'Posez vos questions, il répond avec vos chiffres',
    lead: 'L’assistant IA connaît vos ventes, vos prix, vos notes et vos concurrents. Il répond avec vos chiffres et prépare le rapport de l’équipe.',
    points: ['Vos ventes, vos creux, vos prix, vos concurrents', 'Le rapport de la semaine en PDF, à partager', 'Une offre préparée, que vous validez'],
    hero: {
      type: 'vitrine',
      appareil: 'telephone',
      capture: ECRANS.assistant,
      ratio: 1.06,
      ratioMobile: 0.88,
      place: { x: 32, y: 6, largeur: 37, rotation: 3 },
      placeMobile: { x: 42, y: 6, largeur: 46, rotation: 3 },
      bulles: [
        { bulle: { sur: 'Votre question', titre: 'Quels sont mes creux ?' }, x: 2, y: 24, xm: 2, ym: 56 },
        { bulle: { sur: 'En un clic', titre: 'Rapport de la semaine' }, x: 1, y: 62, droite: true, bureau: true },
      ],
    },
    etapesTitre: 'Une question, une réponse, la suite',
    etapes: [
      { titre: 'Vous posez votre question', texte: 'Avec vos mots : « Combien me prennent les plateformes ? », « Qui a une meilleure note que moi ? ».' },
      { titre: 'Il répond avec vos chiffres', texte: 'Ventes, commandes, panier, créneaux, prix face à la zone, notes, offres de vos concurrents.' },
      { titre: 'Il vous propose la suite', texte: 'Ouvrir le bon écran, préparer une offre, faire le rapport de l’équipe. Rien ne part sans vous.' },
    ],
    zoom: {
      id: 'rapport',
      icone: 'courbe',
      nom: 'Le rapport de l’équipe',
      titre: 'Le point de la semaine, prêt à envoyer à l’équipe',
      points: ['Ventes, commandes, panier moyen et part de chaque plateforme', 'Vos meilleurs moments, le coût de vos offres, vos notes', 'Un mot pour l’équipe, puis le partage sur WhatsApp ou le PDF à télécharger'],
      visuel: { type: 'fragment', fragment: FRAGMENTS.rapport, puce: 'PDF' },
    },
    regles: {
      surtitre: 'Les règles',
      titre: 'Des chiffres calculés, pas inventés',
      reponse: 'L’IA écrit la réponse. Les chiffres du rapport viennent de Deliview.',
      points: [
        'Les chiffres du rapport sont calculés par Deliview, jamais écrits par l’IA.',
        'L’assistant répond avec les données de votre restaurant et de votre zone.',
        'Il prépare une offre, mais rien n’est programmé sans votre accord.',
        'Comme toute IA, il peut se tromper&nbsp;: vérifiez avant d’agir. Deliview l’écrit sous la zone de question.',
      ],
    },
    offres: { pro: 'L’assistant IA et le rapport de l’équipe en PDF.' },
    faq: [
      {
        q: 'Qu’est-ce que je peux demander à l’assistant ?',
        r: 'Tout ce qui touche à vos chiffres&nbsp;: ce que vous avez vendu, ce que vous prennent les plateformes, vos creux, vos prix face à la zone, qui a une meilleure note que vous. Il prépare aussi le rapport de la semaine.',
      },
      {
        q: 'Est-ce que l’assistant peut lancer une promo ?',
        r: 'Il peut la préparer&nbsp;: le formulaire de l’offre s’ouvre, déjà rempli. Vous la vérifiez, puis vous la validez.',
      },
      {
        q: 'Est-ce que l’assistant invente des chiffres ?',
        r: 'Il s’appuie sur vos données Deliview, et les chiffres du rapport sont calculés par Deliview. Comme toute IA, il peut se tromper&nbsp;: vérifiez avant d’agir.',
      },
    ],
    articles: ['commission-uber-eats-restaurant', 'commission-deliveroo-restaurant'],
  },

  objectifs: {
    meta: {
      title: 'Objectifs de ventes Uber Eats et Deliveroo | Deliview',
      description:
        'Fixez vos objectifs par semaine ou par mois : ventes, commandes, panier moyen. Vos ventes Uber Eats et Deliveroo s’ajoutent chaque jour, sans rien saisir.',
    },
    h1: 'Vos objectifs de ventes, suivis chaque jour',
    lead: 'Fixez vos objectifs par semaine ou par mois. Vos ventes Uber Eats et Deliveroo s’ajoutent chaque jour : vous voyez où vous en êtes.',
    points: ['Ventes TTC, commandes, panier moyen', 'Par semaine ou par mois, pour chacun de vos restaurants', 'Chaque lundi, une notification pour faire le point'],
    hero: {
      type: 'vitrine',
      appareil: 'navigateur',
      capture: ECRANS.objectifsOrdinateur,
      ratio: 1.15,
      place: { x: 5, y: 14, largeur: 92 },
      bulles: [
        { bulle: { chiffre: '90 %', texte: 'de l’objectif de ventes' }, x: 0, y: 62, xm: 2, ym: 64 },
        { bulle: { sur: 'Commandes', titre: '216 sur 230', texte: '93 % de l’objectif' }, x: 0, y: 2, droite: true, bureau: true },
      ],
    },
    etapesTitre: 'Un objectif, et où vous en êtes',
    etapes: [
      { titre: 'Vous fixez vos objectifs', texte: 'Ventes, commandes ou panier moyen, par semaine ou par mois. Deliview vous propose votre moyenne pour partir.' },
      { titre: 'Vos ventes s’ajoutent chaque jour', texte: 'Uber Eats et Deliveroo réunis, sans rien importer. En cours de mois, Deliview vous dit où vous finirez à ce rythme.' },
      { titre: 'Vous voyez si c’est atteint', texte: 'Semaine après semaine, l’historique vous dit combien de fois l’objectif a été atteint.' },
    ],
    zoom: {
      id: 'telephone',
      icone: 'cible',
      nom: 'Sur votre téléphone',
      titre: 'Le point du lundi, dans votre poche',
      points: ['Vos objectifs entre deux services, sur votre téléphone', 'Chaque lundi, une notification pour faire le point', 'Avec Pro et Groupe, tous vos restaurants ensemble, puis un par un'],
      visuel: {
        type: 'vitrine',
        appareil: 'telephone',
        capture: ECRANS.objectifs,
        ratio: 1.06,
        ratioMobile: 0.88,
        place: { x: 32, y: 6, largeur: 37 },
        placeMobile: { x: 42, y: 6, largeur: 46 },
        bulles: [{ bulle: { chiffre: '5 458 €', texte: 'de ventes sur 6 000 € visés' }, x: 2, y: 30, xm: 2, ym: 56 }],
      },
    },
    regles: {
      surtitre: 'Les règles',
      titre: 'Un objectif jugé sur une période complète',
      reponse: 'Une semaine n’est jugée que si toutes ses ventes sont là. Un jour sans données ne compte jamais pour zéro.',
      points: [
        'Les semaines vont du lundi au dimanche, les mois sont les mois civils.',
        'Uber Eats et Deliveroo sont réunis&nbsp;; les commandes annulées ou refusées ne comptent pas.',
        'Un pourcentage n’est jamais arrondi vers le haut&nbsp;: 299 commandes sur 300, c’est 99&nbsp;%.',
      ],
    },
    offres: { toutes: 'Vos objectifs par semaine ou par mois, et le point du lundi.' },
    faq: [
      {
        q: 'Est-ce que je dois saisir mes ventes ?',
        r: 'Non. Vos ventes Uber&nbsp;Eats et Deliveroo s’ajoutent chaque jour. Vous fixez seulement vos objectifs.',
      },
      {
        q: 'J’ai plusieurs restaurants. Comment ça se passe ?',
        r: 'Avec Pro (jusqu’à 3&nbsp;restaurants) ou Groupe (jusqu’à 10), chaque restaurant a ses objectifs. Deliview les additionne pour vous montrer tous vos restaurants ensemble, puis chacun à part.',
      },
      {
        q: 'Comment je reçois le point du lundi ?',
        r: 'Activez-le dans Paramètres, onglet Alertes. Chaque lundi, une notification arrive sur votre téléphone. Sur iPhone, ajoutez d’abord Deliview à l’écran d’accueil.',
      },
    ],
    articles: ['augmenter-ventes-uber-eats-deliveroo', 'gerer-uber-eats-deliveroo-ensemble'],
  },
};
