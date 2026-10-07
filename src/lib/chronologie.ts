// Chronologie de la construction de Deliview, partagée en build in public sur LinkedIn (page Qui sommes-nous).
// Uniquement de vrais posts de Tom, repris de ses captures d'écran du 7 octobre 2026 : extraits mot pour mot, photo du
// post recadrée depuis la capture (scripts/photo-linkedin.py). Rien n'est inventé.
//
// La date n'est jamais saisie à la main : elle vient du lien. L'identifiant d'un post LinkedIn (19 chiffres, dans
// « …-activity-7381…-AbCd » ou « urn:li:activity:7381… ») commence par l'instant de publication : ses 41 premiers bits
// en binaire sont des millisecondes depuis le 1er janvier 1970.
// Un post sans lien n'apparaît que sur l'aperçu (date et lien « [À REMPLACER] »), dans l'ordre de la liste ; sur le
// site public, seulement les posts dont on a le lien, triés par date.
//
// Écartés le 7 octobre 2026 (choix de Claude, à confirmer par Tom) : « la plus grosse arnaque par mon développeur »
// et « la santé mentale » (la page rassure un restaurateur qui va confier ses comptes), « 20 % de son CA perdus à
// cause de la fraude client » (même sujet que l'arnaque à l'IA, image d'Uber Eats qui n'est pas celle de Tom).
// Photos de la classe de l'INSEEC et du burger ajoutées à la demande de Tom (7 octobre, 11 h 52), après le rappel
// sur l'accord des étudiants pour un site commercial et sur l'origine de la photo du burger.

export interface PhotoPost {
  fichier: string; // nom de base : public/images/linkedin/<fichier>-360.webp et -720.webp
  largeur: number; // proportions de l'image d'origine
  hauteur: number;
  alt: string;
}

export interface PostLinkedIn {
  lien?: string; // « … › Copier le lien » sur le post ; sans lien, aperçu seulement
  titre: string; // l'étape, en quelques mots
  extrait: string; // une ou deux phrases du post, mot pour mot
  photo?: PhotoPost;
}

export interface EtapeChronologie extends PostLinkedIn {
  date: string | null; // AAAA-MM-JJ, heure de Paris, tirée du lien
  lienPropre: string | null; // le lien sans les paramètres de suivi de LinkedIn
}

// Dans l'ordre de publication indiqué par LinkedIn sur les captures (il y a 8, 7, 6 puis 5 mois) ; le lien donne
// ensuite la date exacte et l'ordre précis.
const POSTS: PostLinkedIn[] = [
  {
    titre: 'Le projet devient public',
    extrait: 'Une plateforme pensée pour simplifier la gestion de la livraison et redonner de la rentabilité aux restaurateurs.',
    photo: { fichier: 'le-projet-devient-public', largeur: 522, hauteur: 768, alt: 'Tom devant un grand écran où s’affiche la première version du logiciel' },
  },
  {
    titre: 'Sur le terrain, le même problème partout',
    extrait: 'Trop de tablettes. Trop de gestion. Sur chaque plateforme. Pour chaque établissement.',
    photo: { fichier: 'le-meme-probleme-partout', largeur: 588, hauteur: 773, alt: 'Le comptoir d’un restaurant visité sur le terrain' },
  },
  {
    titre: 'Quatre tablettes pour un seul restaurant',
    extrait: 'Chaque produit en rupture ? Il doit le mettre en indisponible sur chaque tablette. Une par une, à la main, et tout ça, en plein rush.',
    photo: { fichier: 'quatre-tablettes', largeur: 588, hauteur: 769, alt: 'Deux tablettes et deux terminaux Deliveroo sur le plan de travail d’une cuisine, barrés d’une croix rouge' },
  },
  {
    titre: 'Un cas d’école à l’INSEEC',
    extrait: 'Parce que si ton projet n’est pas compréhensible dans une salle de classe, il ne le sera pas non plus pour un restaurateur.',
    photo: { fichier: 'cas-d-ecole-inseec', largeur: 586, hauteur: 766, alt: 'Les étudiants de l’INSEEC devant un écran affichant le logo Deliview' },
  },
  {
    titre: 'L’arnaque aux photos retouchées par l’IA',
    extrait: 'Le client reçoit sa commande. Il prend une photo du plat puis la retouche avec l’IA. Le plat devient brûlé.',
    photo: { fichier: 'arnaque-photos-ia', largeur: 626, hauteur: 776, alt: 'Le même burger photographié deux fois : intact, puis retouché pour paraître brûlé' },
  },
  {
    titre: 'Une promo oubliée en plein rush',
    extrait: 'Une promo active un samedi soir en plein rush, la cuisine débordée et les notes qui chutent car personne n’avait pensé à la couper.',
    photo: { fichier: 'promo-en-plein-rush', largeur: 586, hauteur: 765, alt: 'Une borne de commande dans un restaurant aux murs roses' },
  },
  {
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

// Un lien donné mais illisible, ou une date hors de la vie du projet, arrête le build : jamais de carte sans vraie date.
function etape(p: PostLinkedIn): EtapeChronologie {
  if (!p.lien) return { ...p, date: null, lienPropre: null };
  const id = identifiant(p.lien);
  const instant = instantDuPost(p.lien);
  if (!id || !instant || instant.getUTCFullYear() < 2025 || instant.getTime() > Date.now() + 864e5)
    throw new Error(`Chronologie : lien de post illisible ou date improbable (« ${p.lien} »)`);
  return { ...p, date: jourDeParis(instant), lienPropre: `https://www.linkedin.com/feed/update/urn:li:${id.type}:${id.id}/` };
}

const ETAPES = POSTS.map(etape);

// Site public : les posts dont on a le lien, du plus ancien au plus récent (la frise se lit comme l'histoire du projet).
export const CHRONOLOGIE: EtapeChronologie[] = ETAPES.filter((e) => e.lien).sort(
  (a, b) => instantDuPost(a.lien!)!.getTime() - instantDuPost(b.lien!)!.getTime(),
);

// Aperçu : tous les posts ; tant qu'un lien manque, dans l'ordre de la liste.
export const CHRONOLOGIE_APERCU: EtapeChronologie[] = ETAPES.every((e) => e.lien) ? CHRONOLOGIE : ETAPES;
