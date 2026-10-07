// Chronologie de la construction de Deliview, partagée en build in public sur LinkedIn (page Qui sommes-nous).
// Uniquement des posts réellement publiés, envoyés par Tom (lien du post + capture d'écran) : rien n'est inventé.
// Liste vide tant qu'il ne les a pas envoyés (décisions du 2 et du 7 octobre 2026) : la frise n'apparaît pas.
//
// La date n'est jamais saisie à la main : elle vient du lien. L'identifiant d'un post LinkedIn (19 chiffres, dans
// « …-activity-7381…-AbCd » ou « urn:li:activity:7381… ») commence par l'instant de publication : ses 41 premiers bits
// en binaire sont des millisecondes depuis le 1er janvier 1970.
// Les photos sont dans public/images/linkedin/ en deux largeurs (scripts/photo-linkedin.py).

export interface PhotoPost {
  fichier: string; // nom de base : public/images/linkedin/<fichier>-360.webp et -720.webp
  largeur: number; // proportions de l'image d'origine
  hauteur: number;
  alt: string;
}

export interface PostLinkedIn {
  lien: string; // « … › Copier le lien » sur le post
  titre: string; // l'étape, en quelques mots
  extrait: string; // une ou deux phrases du post, mot pour mot
  photo?: PhotoPost;
}

export interface EtapeChronologie extends PostLinkedIn {
  date: string; // AAAA-MM-JJ, heure de Paris, tirée du lien
  lienPropre: string; // le lien sans les paramètres de suivi de LinkedIn
}

const POSTS: PostLinkedIn[] = [];

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

// Une étape sans date lisible ou datée hors de la vie du projet arrête le build : jamais de carte sans vraie date.
function etape(p: PostLinkedIn): EtapeChronologie {
  const id = identifiant(p.lien);
  const instant = instantDuPost(p.lien);
  if (!id || !instant || instant.getUTCFullYear() < 2025 || instant.getTime() > Date.now() + 864e5)
    throw new Error(`Chronologie : lien de post illisible ou date improbable (« ${p.lien} »)`);
  return { ...p, date: jourDeParis(instant), lienPropre: `https://www.linkedin.com/feed/update/urn:li:${id.type}:${id.id}/` };
}

// De la plus ancienne à la plus récente : la frise se lit comme l'histoire du projet.
export const CHRONOLOGIE: EtapeChronologie[] = POSTS.map(etape).sort((a, b) => instantDuPost(a.lien)!.getTime() - instantDuPost(b.lien)!.getTime());
