// Chronologie de la construction de Deliview, partagée en build in public sur LinkedIn (page Qui sommes-nous).
// Uniquement de vrais posts de Tom, repris de ses captures d'écran et de ses liens du 7 octobre 2026 : extraits mot
// pour mot, photo du post recadrée depuis la capture (scripts/photo-linkedin.py). Rien n'est inventé.
//
// La date n'est jamais saisie à la main : elle vient du lien. L'identifiant d'un post LinkedIn (19 chiffres, dans
// « …-share-7441…-iTSM » ou « urn:li:activity:7447… ») commence par l'instant de publication : ses 41 premiers bits
// en binaire sont des millisecondes depuis le 1er janvier 1970. Vérifié le 7 octobre 2026 : les 9 dates tirées des
// liens tombent toutes dans l'ancienneté affichée par LinkedIn sur les captures (« 8 mois », « 7 mois »…).
// Les liens sont gardés sans leurs paramètres de suivi (utm_*, rcm, propre au compte de Tom).
//
// Site public : les posts qui ont un lien, sauf ceux marqués « aperçu seulement », du plus ancien au plus récent.
// Les captures ne donnent que l'ancienneté (« 8 mois ») ; le lien donne le jour exact.
// Aperçu : tous les posts ; un post sans lien (date et lien « [À REMPLACER] ») se place juste avant le post daté qui
// le suit dans la liste.
//
// Décisions de Tom (7 octobre 2026) : « la plus grosse arnaque par mon développeur » et « la santé mentale » retirés
// (la page rassure un restaurateur qui va confier ses comptes) ; « un restaurateur près de chez moi perd 20 % de son
// CA » validé pour le site public, extrait sans le chiffre. Photos de la classe de l'INSEEC, du burger et de l'e-mail
// d'Uber Eats mises à sa demande, après le rappel sur l'accord des étudiants et sur l'origine des images.

export interface PhotoPost {
  fichier: string; // nom de base : public/images/linkedin/<fichier>-360.webp et -720.webp
  largeur: number; // proportions de l'image d'origine
  hauteur: number;
  alt: string;
}

export interface PostLinkedIn {
  lien?: string; // « … › Copier le lien vers le post », ou l'adresse du post ouvert ; sans lien, aperçu seulement
  titre: string; // l'étape, en quelques mots
  extrait: string; // une ou deux phrases du post, mot pour mot
  photo?: PhotoPost;
  apercuSeulement?: boolean; // pas sur le site public tant que Tom ne l'a pas validé
}

export interface EtapeChronologie extends PostLinkedIn {
  date: string | null; // AAAA-MM-JJ, heure de Paris, tirée du lien
  lienPropre: string | null; // le lien sans les paramètres de suivi de LinkedIn
}

// Du plus ancien au plus récent (dates tirées des liens, en commentaire pour la relecture).
const POSTS: PostLinkedIn[] = [
  {
    // 21 janvier 2026 (« J'ai commencé à entreprendre à 17 ans »)
    lien: 'https://www.linkedin.com/posts/tomvoisin_jai-commenc%C3%A9-%C3%A0-entreprendre-%C3%A0-17-ans-aucune-share-7419649860712259584-ilF2/',
    titre: 'Le projet devient public',
    extrait: 'Une plateforme pensée pour simplifier la gestion de la livraison et redonner de la rentabilité aux restaurateurs.',
    photo: { fichier: 'le-projet-devient-public', largeur: 522, hauteur: 768, alt: 'Tom devant un grand écran où s’affiche la première version du logiciel' },
  },
  {
    // 22 janvier 2026
    lien: 'https://www.linkedin.com/posts/tomvoisin_je-suis-all%C3%A9-parler-%C3%A0-des-restaurateurs-et-share-7420061925973336064-7gHJ/',
    titre: 'Sur le terrain, le même problème partout',
    extrait: 'Trop de tablettes. Trop de gestion. Sur chaque plateforme. Pour chaque établissement.',
    photo: { fichier: 'le-meme-probleme-partout', largeur: 588, hauteur: 773, alt: 'Le comptoir d’un restaurant visité sur le terrain' },
  },
  {
    // 20 février 2026
    lien: 'https://www.linkedin.com/posts/tomvoisin_des-%C3%A9tudiants-ont-travaill%C3%A9-sur-mon-projet-share-7430559091888062464-KkIf/',
    titre: 'Un cas d’école à l’INSEEC',
    extrait: 'Parce que si ton projet n’est pas compréhensible dans une salle de classe, il ne le sera pas non plus pour un restaurateur.',
    photo: { fichier: 'cas-d-ecole-inseec', largeur: 586, hauteur: 766, alt: 'Les étudiants de l’INSEEC devant un écran affichant le logo Deliview' },
  },
  {
    // 25 février 2026
    lien: 'https://www.linkedin.com/posts/tomvoisin_un-restaurateur-pr%C3%A8s-de-chez-moi-perd-20-share-7432491508085399552-jpXL/',
    titre: 'Une fonctionnalité contre la fraude client',
    extrait: 'C’est pour ça qu’on a construit une fonctionnalité de gestion des plaintes sur Deliview.',
    photo: { fichier: 'gestion-des-plaintes', largeur: 522, hauteur: 769, alt: 'Un e-mail d’Uber Eats annonçant un remboursement en Uber Cash' },
  },
  {
    // 1er mars 2026
    lien: 'https://www.linkedin.com/posts/tomvoisin_ce-restaurateur-jongle-avec-2-tablettes-deliveroo-share-7433916105896882176-ASbM/',
    titre: 'Quatre tablettes pour un seul restaurant',
    extrait: 'Chaque produit en rupture ? Il doit le mettre en indisponible sur chaque tablette. Une par une, à la main, et tout ça, en plein rush.',
    photo: { fichier: 'quatre-tablettes', largeur: 588, hauteur: 769, alt: 'Deux tablettes et deux terminaux Deliveroo sur le plan de travail d’une cuisine, barrés d’une croix rouge' },
  },
  {
    // 12 mars 2026
    lien: 'https://www.linkedin.com/posts/tomvoisin_la-nouvelle-arnaque-qui-touche-les-restaurateurs-share-7437900794659721216-935j/',
    titre: 'L’arnaque aux photos retouchées par l’IA',
    extrait: 'Le client reçoit sa commande. Il prend une photo du plat puis la retouche avec l’IA. Le plat devient brûlé.',
    photo: { fichier: 'arnaque-photos-ia', largeur: 626, hauteur: 776, alt: 'Le même burger photographié deux fois : intact, puis retouché pour paraître brûlé' },
  },
  {
    // 23 mars 2026
    lien: 'https://www.linkedin.com/posts/tomvoisin_95-des-restaurants-g%C3%A8rent-leurs-promotions-share-7441815089713844224-iTSM/',
    titre: 'Une promo oubliée en plein rush',
    extrait: 'Une promo active un samedi soir en plein rush, la cuisine débordée et les notes qui chutent car personne n’avait pensé à la couper.',
    photo: { fichier: 'promo-en-plein-rush', largeur: 586, hauteur: 765, alt: 'Une borne de commande dans un restaurant aux murs roses' },
  },
  {
    // 7 avril 2026
    lien: 'https://www.linkedin.com/feed/update/urn:li:activity:7447246551132975104/',
    titre: 'Un comparateur de prix offert aux restaurateurs',
    extrait: 'J’ai créé un comparateur de prix Uber Eats et Deliveroo pour les restaurateurs et je le donne gratuitement',
    photo: { fichier: 'comparateur-de-prix', largeur: 569, hauteur: 314, alt: 'Le comparateur : « Tes prix sont-ils bien positionnés sur Uber Eats & Deliveroo ? »' },
  },
];

// Identifiant du post : « activity », « share » ou « ugcPost », suivi de 19 chiffres.
function identifiant(lien: string): { type: string; id: string } | null {
  const m = decodeURIComponent(lien).match(/\b(activity|share|ugcPost)[:-](\d{19})\b/);
  return m ? { type: m[1], id: m[2] } : null;
}

// Instant de publication : les 41 premiers bits de l'identifiant écrit en binaire, en millisecondes.
export function instantDuPost(lien: string): Date | null {
  const p = identifiant(lien);
  if (!p) return null;
  const ms = parseInt(BigInt(p.id).toString(2).slice(0, 41), 2);
  const d = new Date(ms);
  return Number.isNaN(d.getTime()) ? null : d;
}

function jourDeParis(d: Date): string {
  return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Europe/Paris' }).format(d);
}

// Lien affiché : l'adresse publique du post (/posts/…) sans paramètres ; sinon l'adresse du fil reconstruite.
function lienPropre(lien: string, id: { type: string; id: string }): string {
  const u = new URL(lien);
  if (u.hostname.endsWith('linkedin.com') && u.pathname.startsWith('/posts/')) return `https://www.linkedin.com${u.pathname}`;
  return `https://www.linkedin.com/feed/update/urn:li:${id.type}:${id.id}/`;
}

// Un lien donné mais illisible, ou une date hors de la vie du projet, arrête le build : jamais de carte sans vraie date.
function etape(p: PostLinkedIn): EtapeChronologie {
  if (!p.lien) return { ...p, date: null, lienPropre: null };
  const id = identifiant(p.lien);
  const instant = instantDuPost(p.lien);
  if (!id || !instant || instant.getUTCFullYear() < 2025 || instant.getTime() > Date.now() + 864e5)
    throw new Error(`Chronologie : lien de post illisible ou date improbable (« ${p.lien} »)`);
  return { ...p, date: jourDeParis(instant), lienPropre: lienPropre(p.lien, id) };
}

const ETAPES = POSTS.map(etape);

// Clé de tri : l'instant du post ; sans lien, juste avant le post daté qui le suit dans la liste.
const CLES = new Map<EtapeChronologie, number>();
let suivante = Number.MAX_SAFE_INTEGER;
for (let i = ETAPES.length - 1; i >= 0; i--) {
  const e = ETAPES[i];
  if (e.lien) suivante = instantDuPost(e.lien)!.getTime();
  CLES.set(e, e.lien ? suivante : suivante - 1);
}
const parDate = (a: EtapeChronologie, b: EtapeChronologie) => CLES.get(a)! - CLES.get(b)!;

// Site public : du plus ancien au plus récent (la frise se lit comme l'histoire du projet).
export const CHRONOLOGIE: EtapeChronologie[] = ETAPES.filter((e) => e.lien && !e.apercuSeulement).sort(parDate);

// Aperçu : tous les posts, y compris ceux qui attendent leur lien ou le feu vert de Tom.
export const CHRONOLOGIE_APERCU: EtapeChronologie[] = [...ETAPES].sort(parDate);
