// Questions fréquentes sur Deliview : une seule source pour la page /questions-frequentes/, ses données
// structurées (FAQPage) et les fichiers llms.txt / llms-full.txt lus par les moteurs IA.
// Règle : uniquement des faits vérifiables aujourd'hui (offres, fonctionnement, hébergement, fondateur).
// Jamais la façon dont les données sont obtenues (décision de Tom, 2 octobre 2026).
// 4 octobre 2026 (accord de Tom) : Deliview applique les prix et promos validés et importe les ventes chaque semaine
// (app, 3 octobre) ; les réponses « Non » d'avant sont remplacées. Délai repris de l'app (lib/promesse.ts : 10 minutes).
// 6 octobre 2026 (demande de Tom) : questions écrites à la première personne, comme le restaurateur les pose.
// 6 octobre 2026, soir (décision de Tom) : ventes ajoutées chaque jour à 7 h, deux semaines d'historique au départ.
// Réponse directe dans la première phrase ; HTML limité aux liens et aux espaces insécables.
import { OFFRES, SITE, lien } from './site';

export interface QuestionFaq {
  q: string;
  r: string;
  // Ancre sur la page des questions fréquentes (liens du pied de page « Pour qui »).
  id?: string;
}
export interface RubriqueFaq {
  id: string;
  titre: string;
  questions: QuestionFaq[];
}

const prix = OFFRES.map((o) => `${o.nom}&nbsp;: ${o.prix}&nbsp;€&nbsp;HT par mois, ${o.restaurants.toLowerCase()}`).join('. ');

export const FAQ_MAJ = '2026-10-06';

export const FAQ: RubriqueFaq[] = [
  {
    id: 'deliview',
    titre: 'Deliview en bref',
    questions: [
      {
        q: 'À quoi me sert Deliview ?',
        r: `${SITE.definition} Deliview est conçu pour les restaurants en France présents sur Uber&nbsp;Eats et Deliveroo.`,
      },
      {
        id: 'pour-qui',
        q: 'Est-ce que Deliview est fait pour mon restaurant ?',
        r: 'Oui, si vous vendez sur Uber&nbsp;Eats et Deliveroo, avec 1 à 10&nbsp;restaurants. Pizzerias, burgers, snacks, dark kitchens et petites chaînes. Au-delà, Tom fait une offre sur mesure.',
      },
      {
        q: 'Sur quelles plateformes est-ce que je peux utiliser Deliview ?',
        r: 'Uber&nbsp;Eats et Deliveroo, en France. Chaque plateforme est analysée à part. Prix, notes et offres y diffèrent souvent.',
      },
      {
        q: 'Est-ce que Deliview dépend d’Uber Eats ou de Deliveroo ?',
        r: 'Non. Deliview est un logiciel indépendant, ni affilié ni approuvé par Uber&nbsp;Eats ou Deliveroo. Ce sont des marques de leurs propriétaires respectifs.',
      },
    ],
  },
  {
    id: 'fonctionnement',
    titre: 'Fonctionnement',
    questions: [
      {
        q: 'Comment je sais si mes prix sont bien placés face à mes concurrents ?',
        r: 'Deliview les compare plat par plat, à taille égale. Votre pizza 33&nbsp;cm face aux pizzas 33&nbsp;cm du quartier. Deliview calcule la médiane de la zone et l’écart avec votre prix. Sous 2&nbsp;concurrents, il ne conclut pas et le dit.',
      },
      {
        q: 'Combien de concurrents est-ce que je peux suivre ?',
        r: 'Jusqu’à 20&nbsp;restaurants de votre secteur, sur Uber&nbsp;Eats et Deliveroo. Dans une petite ville, il peut y en avoir moins. Vous pouvez aussi ajouter 3&nbsp;concurrents de votre choix par restaurant.',
      },
      {
        q: 'Est-ce que Deliview peut changer mes prix sur les plateformes ?',
        r: 'Oui, quand vous le décidez. Deliview propose un prix avec ses sources. Vous le validez dans Deliview, et Deliview l’applique pour vous sur Uber&nbsp;Eats ou Deliveroo, sous 10&nbsp;minutes. Même chose pour vos promotions. Rien ne change sans votre accord.',
      },
      {
        q: 'Comment je donne accès à Deliview ?',
        r: 'Vous invitez Deliview comme utilisateur, une fois, dans Uber&nbsp;Eats Manager et dans le Partner Hub de Deliveroo. Jamais avec votre mot de passe. Vous retirez cet accès quand vous voulez, depuis la plateforme.',
      },
      {
        q: 'Est-ce que je vois mes ventes et mon chiffre d’affaires ?',
        r: 'Oui, au jour, à la semaine et au mois. Deliview ajoute vos ventes Uber&nbsp;Eats et Deliveroo chaque jour à 7&nbsp;h. Au départ, vous avez vos deux dernières semaines. Vous voyez vos ventes, vos commandes, votre panier moyen et vos créneaux creux. Vous n’avez rien à importer. Les commandes en direct restent sur vos tablettes.',
      },
      {
        q: 'Est-ce que je dois installer quelque chose ?',
        r: 'Non. Deliview s’ouvre dans le navigateur, sur tablette, ordinateur ou téléphone. Vos tablettes Uber&nbsp;Eats et Deliveroo restent là pour les commandes.',
      },
    ],
  },
  {
    id: 'prix',
    titre: 'Prix et engagement',
    questions: [
      {
        q: 'Combien me coûte Deliview ?',
        r: `Trois offres, selon votre nombre de restaurants. ${prix}. Le détail est sur la <a href="${lien('/tarifs/')}">page Tarifs</a>.`,
      },
      {
        q: 'Est-ce que je m’engage sur une durée ?',
        r: 'Non. L’abonnement est mensuel et sans engagement. La mise en place est offerte.',
      },
      {
        q: 'Est-ce que je peux essayer Deliview avant de payer ?',
        r: `Oui, par une démo de 30&nbsp;minutes sur votre propre restaurant, avant tout paiement. Il n’y a pas d’essai gratuit en libre accès. <a href="${lien('/demo/')}">Demander une démo</a>.`,
      },
      {
        q: 'Comment je peux ouvrir un compte ?',
        r: `Deliview s’utilise sur abonnement. Choisissez votre offre sur la page <a href="${lien('/tarifs/')}">Tarifs</a> et cliquez sur «&nbsp;Commencer maintenant&nbsp;»&nbsp;: Tom vous appelle sous 3&nbsp;h, crée votre compte et fait la mise en place avec vous. Rien à payer au moment de la demande. Vous pouvez aussi <a href="${lien('/demo/')}">demander une démo</a> avant de choisir.`,
      },
    ],
  },
  {
    id: 'confiance',
    titre: 'Qui est derrière Deliview',
    questions: [
      {
        q: 'Qui a créé Deliview, et qui va m’accompagner ?',
        r: `Tom Voisin, fondateur de Deliview. C’est lui qui fait votre mise en place. Il a lui-même été sur Uber&nbsp;Eats et Deliveroo. Deliview est le résultat d’un an sur le terrain, auprès des restaurants qui livrent. <a href="${lien('/qui-sommes-nous/')}">Le projet et son histoire</a>.`,
      },
      {
        q: 'Comment je vérifie que Deliview est sérieux avant de m’abonner ?',
        r: `La démo se fait sur votre restaurant. Chaque prix comparé cite ses sources. L’abonnement est sans engagement. Deliview est éditée par DELIVIEW SAS, immatriculée en France (SIREN 102&nbsp;681&nbsp;509). Tous les faits à vérifier, avec leurs liens&nbsp;: <a href="${lien('/deliview-est-il-fiable/')}">Deliview est-il fiable&nbsp;?</a>`,
      },
      {
        q: 'Où sont hébergées mes données ?',
        r: `Dans l’Union européenne&nbsp;: la base de données de Deliview est hébergée en Irlande. Le détail est dans la <a href="${lien('/confidentialite/')}">politique de confidentialité</a>.`,
      },
      {
        q: 'Comment je contacte Deliview ?',
        r: `Par e-mail à <a href="mailto:${SITE.email}">${SITE.email}</a>, ou en <a href="${lien('/demo/')}">demandant une démo</a>. C’est Tom qui répond.`,
      },
    ],
  },
];

// Les questions reprises sur l'accueil (objections les plus fréquentes avant une démo).
const SUR_ACCUEIL = [
  'À quoi me sert Deliview ?',
  'Est-ce que Deliview peut changer mes prix sur les plateformes ?',
  'Comment je peux ouvrir un compte ?',
  'Combien me coûte Deliview ?',
  'Est-ce que je peux essayer Deliview avant de payer ?',
  'Qui a créé Deliview, et qui va m’accompagner ?',
];
export const FAQ_ACCUEIL: QuestionFaq[] = SUR_ACCUEIL.map((q) => {
  const x = FAQ.flatMap((r) => r.questions).find((y) => y.q === q);
  if (!x) throw new Error(`Question absente de la FAQ : ${q}`);
  return x;
});

// Texte sans balises, pour les données structurées et les fichiers texte.
export const texteBrut = (h: string) =>
  h
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
