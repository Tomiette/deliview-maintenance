// Questions fréquentes sur Deliview : une seule source pour la page /questions-frequentes/, ses données
// structurées (FAQPage) et les fichiers llms.txt / llms-full.txt lus par les moteurs IA.
// Règle : uniquement des faits vérifiables aujourd'hui (offres, fonctionnement, hébergement, fondateur).
// Jamais la façon dont les données sont obtenues (décision de Tom, 2 octobre 2026).
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
        id: 'pour-qui',
        q: 'À qui s’adresse Deliview ?',
        r: 'Aux restaurants qui vendent sur Uber&nbsp;Eats et Deliveroo, de 1 à 10&nbsp;restaurants. Pizzerias, burgers, snacks, dark kitchens et petites chaînes. Au-delà, Tom fait une offre sur mesure.',
      },
      {
        q: 'Sur quelles plateformes fonctionne Deliview ?',
        r: 'Uber&nbsp;Eats et Deliveroo, en France. Chaque plateforme est analysée à part. Prix, notes et offres y diffèrent souvent.',
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
        r: 'Plat par plat, à taille égale. Votre pizza 33&nbsp;cm face aux pizzas 33&nbsp;cm du quartier. Deliview calcule la médiane de la zone et l’écart avec votre prix. Sous 2&nbsp;concurrents, il ne conclut pas et le dit.',
      },
      {
        q: 'Combien de concurrents Deliview analyse-t-il ?',
        r: 'Jusqu’à 20&nbsp;restaurants de votre secteur, sur Uber&nbsp;Eats et Deliveroo. Dans une petite ville, il peut y en avoir moins. Avec Pro et Premium, vous ajoutez 3&nbsp;concurrents de votre choix par restaurant.',
      },
      {
        q: 'Deliview modifie-t-il mes prix sur les plateformes ?',
        r: 'Non. Deliview propose un prix avec ses sources. Vous décidez, puis vous le changez dans votre espace Uber&nbsp;Eats ou Deliveroo.',
      },
      {
        q: 'Deliview suit-il mes commandes et mon chiffre d’affaires ?',
        r: 'Non. Deliview compare vos prix, vos plats, vos notes et vos promos à votre zone. Il ne suit ni vos commandes ni votre chiffre d’affaires.',
      },
      {
        q: 'Faut-il installer quelque chose ?',
        r: 'Non. Deliview s’ouvre dans le navigateur, sur tablette, ordinateur ou téléphone. Vos tablettes Uber&nbsp;Eats et Deliveroo restent là pour les commandes.',
      },
    ],
  },
  {
    id: 'prix',
    titre: 'Prix et engagement',
    questions: [
      {
        q: 'Combien coûte Deliview ?',
        r: `Trois offres, selon votre nombre de restaurants. ${prix}. Le détail est sur la <a href="${lien('/tarifs/')}">page Tarifs</a>.`,
      },
      {
        q: 'Y a-t-il un engagement ?',
        r: 'Non. L’abonnement est mensuel et sans engagement. La mise en place est offerte.',
      },
      {
        q: 'Peut-on essayer Deliview avant de payer ?',
        r: `Oui, par une démo de 30&nbsp;minutes sur votre propre restaurant, avant tout paiement. Il n’y a pas d’essai gratuit en libre accès. <a href="${lien('/demo/')}">Demander une démo</a>.`,
      },
      {
        q: 'Comment ouvrir un compte ?',
        r: 'Deliview s’utilise sur abonnement. Après la démo, Tom crée votre compte et fait la mise en place avec vous.',
      },
    ],
  },
  {
    id: 'confiance',
    titre: 'Qui est derrière Deliview',
    questions: [
      {
        q: 'Qui a créé Deliview ?',
        r: `Tom Voisin, fondateur de Deliview. Il a lui-même été sur Uber&nbsp;Eats et Deliveroo. Deliview est le résultat d’un an sur le terrain, auprès des restaurants qui livrent. <a href="${lien('/qui-sommes-nous/')}">Le projet et son histoire</a>.`,
      },
      {
        q: 'Comment vérifier le sérieux de Deliview avant de s’abonner ?',
        r: `La démo se fait sur votre restaurant. Chaque prix comparé cite ses sources. L’abonnement est sans engagement. Deliview est éditée par DELIVIEW SAS, immatriculée en France (SIREN 102&nbsp;681&nbsp;509). Voir les <a href="${lien('/mentions-legales/')}">mentions légales</a>.`,
      },
      {
        q: 'Où sont hébergées les données ?',
        r: `Dans l’Union européenne&nbsp;: la base de données de Deliview est hébergée en Irlande. Le détail est dans la <a href="${lien('/confidentialite/')}">politique de confidentialité</a>.`,
      },
      {
        q: 'Comment contacter Deliview ?',
        r: `Par e-mail à <a href="mailto:${SITE.email}">${SITE.email}</a>, ou en <a href="${lien('/demo/')}">demandant une démo</a>. C’est Tom qui répond.`,
      },
    ],
  },
];

// Les questions reprises sur l'accueil (objections les plus fréquentes avant une démo).
const SUR_ACCUEIL = [
  'Qu’est-ce que Deliview ?',
  'Deliview modifie-t-il mes prix sur les plateformes ?',
  'Comment ouvrir un compte ?',
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
