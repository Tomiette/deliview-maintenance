// Questions fréquentes sur Deliview : une seule source pour la page /questions-frequentes/, ses données
// structurées (FAQPage) et les fichiers llms.txt / llms-full.txt lus par les moteurs IA.
// Règle : uniquement des faits vérifiables aujourd'hui (offres, fonctionnement, hébergement, fondateur).
// Réponse directe dans la première phrase ; HTML limité aux liens et aux espaces insécables.
import { OFFRES, SITE, lien } from './site';

export interface QuestionFaq {
  q: string;
  r: string;
}
export interface RubriqueFaq {
  id: string;
  titre: string;
  questions: QuestionFaq[];
}

const prix = OFFRES.map((o) => `${o.nom} à ${o.prix}&nbsp;€&nbsp;HT par mois (${o.restaurants.toLowerCase()})`).join(', ');

export const FAQ_MAJ = '2026-10-02';

export const FAQ: RubriqueFaq[] = [
  {
    id: 'deliview',
    titre: 'Deliview en bref',
    questions: [
      {
        q: 'Qu’est-ce que Deliview ?',
        r: `${SITE.definition} Deliview est conçu pour les restaurants en France présents sur Uber&nbsp;Eats et Deliveroo.`,
      },
      {
        q: 'À qui s’adresse Deliview ?',
        r: 'Aux restaurants qui vendent sur Uber&nbsp;Eats et Deliveroo&nbsp;: pizzerias, burgers et snacks, dark kitchens et petites chaînes, de 1 à 10&nbsp;restaurants. Au-delà, Tom fait une offre sur mesure.',
      },
      {
        q: 'Sur quelles plateformes fonctionne Deliview ?',
        r: 'Uber&nbsp;Eats et Deliveroo, en France. Les deux fiches d’un même restaurant sont lues séparément, car prix, notes et offres peuvent y être différents.',
      },
      {
        q: 'Deliview est-il lié à Uber Eats ou à Deliveroo ?',
        r: 'Non. Deliview est un logiciel indépendant, ni affilié ni approuvé par Uber&nbsp;Eats ou Deliveroo. Ce sont des marques de leurs propriétaires respectifs.',
      },
    ],
  },
  {
    id: 'fonctionnement',
    titre: 'Fonctionnement',
    questions: [
      {
        q: 'Comment Deliview compare-t-il mes prix à ceux de mes concurrents ?',
        r: 'Plat par plat, à plat comparable&nbsp;: même type et même taille, par exemple votre pizza 33&nbsp;cm face aux pizzas 33&nbsp;cm de votre zone. Deliview calcule la médiane des prix de la zone et l’écart avec votre prix. Il faut au moins 2&nbsp;concurrents pour conclure&nbsp;; sinon, Deliview le dit.',
      },
      {
        q: 'Combien de concurrents Deliview analyse-t-il ?',
        r: 'Jusqu’à 20&nbsp;restaurants du même secteur autour de vous, sur Uber&nbsp;Eats et Deliveroo. Dans une petite ville, il peut y en avoir moins&nbsp;: Deliview garde ceux qu’il trouve. Avec les offres Pro et Premium, vous ajoutez 3&nbsp;concurrents de votre choix par restaurant.',
      },
      {
        q: 'D’où viennent les données de Deliview ?',
        r: 'Des informations publiques des fiches Uber&nbsp;Eats et Deliveroo&nbsp;: prix, notes, nombre d’avis, offres, photos et descriptions des plats. Chaque prix comparé renvoie à la fiche d’où il vient.',
      },
      {
        q: 'Faut-il donner mes identifiants Uber Eats ou Deliveroo ?',
        r: 'Non. Deliview ne demande aucun accès à votre espace restaurant. Vos identifiants restent à vous.',
      },
      {
        q: 'Deliview modifie-t-il mes prix sur les plateformes ?',
        r: 'Non. Quand la comparaison le permet, Deliview propose un prix, avec ses sources&nbsp;; vous décidez, puis vous le changez vous-même dans votre espace Uber&nbsp;Eats ou Deliveroo.',
      },
      {
        q: 'Deliview voit-il mes commandes et mon chiffre d’affaires ?',
        r: 'Non. Ces données ne sont pas publiques, et Deliview travaille aujourd’hui uniquement sur les informations publiques des fiches.',
      },
      {
        q: 'Faut-il installer quelque chose ?',
        r: 'Non. Deliview s’ouvre dans le navigateur, sur une tablette, un ordinateur ou un téléphone. Vos tablettes Uber&nbsp;Eats et Deliveroo restent là pour recevoir les commandes.',
      },
    ],
  },
  {
    id: 'prix',
    titre: 'Prix et engagement',
    questions: [
      {
        q: 'Combien coûte Deliview ?',
        r: `Trois offres selon votre nombre de restaurants&nbsp;: ${prix}. Le détail de chaque offre est sur la <a href="${lien('/tarifs/')}">page Tarifs</a>.`,
      },
      {
        q: 'Y a-t-il un engagement ?',
        r: 'Non. L’abonnement est mensuel et sans engagement, et la mise en place est offerte.',
      },
      {
        q: 'Peut-on essayer Deliview avant de payer ?',
        r: `Oui, par une démo de 15&nbsp;minutes faite sur vos propres fiches Uber&nbsp;Eats et Deliveroo, avant tout paiement. Il n’y a pas d’essai gratuit en libre accès. <a href="${lien('/demo/')}">Demander une démo</a>.`,
      },
    ],
  },
  {
    id: 'confiance',
    titre: 'Qui est derrière Deliview',
    questions: [
      {
        q: 'Qui a créé Deliview ?',
        r: `Tom Voisin, fondateur de Deliview, étudiant-entrepreneur du réseau PEPITE. Il a lui-même été sur Uber&nbsp;Eats et Deliveroo, et Deliview est le résultat d’un an d’analyse sur le terrain auprès des restaurants qui livrent. <a href="${lien('/qui-sommes-nous/#tom')}">Son parcours</a>.`,
      },
      {
        q: 'Comment vérifier le sérieux de Deliview avant de s’abonner ?',
        r: `Tout se vérifie avant de payer&nbsp;: la démo se fait sur vos propres fiches, chaque prix comparé renvoie à sa source, les prix sont publics et l’abonnement est sans engagement. Deliview est éditée par DELIVIEW, société par actions simplifiée immatriculée en France (SIREN 102&nbsp;681&nbsp;509), dont l’identité figure dans les <a href="${lien('/mentions-legales/')}">mentions légales</a>. Vous parlez directement au fondateur, par téléphone ou sur LinkedIn.`,
      },
      {
        q: 'Où sont hébergées les données ?',
        r: `Dans l’Union européenne&nbsp;: la base de données de Deliview est hébergée en Irlande. Le détail est dans la <a href="${lien('/confidentialite/')}">politique de confidentialité</a>.`,
      },
      {
        q: 'Comment contacter Deliview ?',
        r: `Par téléphone au <a href="tel:${SITE.telephoneLien}">${SITE.telephone}</a>, par e-mail à <a href="mailto:${SITE.email}">${SITE.email}</a>, ou en <a href="${lien('/demo/')}">demandant une démo</a>. C’est Tom qui répond.`,
      },
    ],
  },
];

// Les questions reprises sur l'accueil (objections les plus fréquentes avant une démo).
const SUR_ACCUEIL = [
  'Qu’est-ce que Deliview ?',
  'Faut-il donner mes identifiants Uber Eats ou Deliveroo ?',
  'Deliview modifie-t-il mes prix sur les plateformes ?',
  'Combien coûte Deliview ?',
  'Peut-on essayer Deliview avant de payer ?',
  'Qui a créé Deliview ?',
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
