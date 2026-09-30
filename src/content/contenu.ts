import brut from "./contenu.json";

export type TitreTexte = { titre: string; texte: string };
type Meta = { metaTitle: string; metaDescription: string };

export type Fonctionnalite = { titre: string; texte: string; captureAlt: string; bientot?: boolean };

export type Pilier = Meta & {
  slug: string;
  surtitre: string;
  /** Complément pour les liens : « Découvrir la veille concurrentielle ». */
  complement: string;
  titre: string;
  phrase: string;
  captureAlt: string;
  fonctionnalites: Fonctionnalite[];
};

export type Profil = Meta & {
  slug: string;
  nomMenu: string;
  ligneMenu: string;
  surtitre: string;
  h1: string;
  sousTitre: string;
  blocs: TitreTexte[];
};

export type Contenu = {
  definition: string;
  annonce: string;
  homeMeta: Meta;
  /** `surtitre` : public visé, affiché au-dessus du H1 de l'accueil. */
  hero: { surtitre?: string; h1: string; sousTitre: string; reassurance: string; captureAlt: string };
  bandeau: { libelle: string; plateformes: string[] };
  probleme: { surtitre: string; titre: string; cartes: TitreTexte[] };
  etapes: { surtitre: string; titre: string; items: TitreTexte[] };
  piliersSection: { surtitre: string; titre: string };
  piliers: Pilier[];
  benefices: { titre: string; items: TitreTexte[] };
  fondateur: { surtitre: string; titre: string; paragraphes: string[] };
  demo: { titre: string; etapes: TitreTexte[] };
  /** `choixNombre` : libellés affichés des tranches, dans l'ordre de NOMBRE_RESTAURANTS (valeurs stockées inchangées). */
  formulaire: { libelleEnseigne: string; libelleNombre: string; choixNombre?: string[] };
  profils: Profil[];
  donnees: Meta & { surtitre: string; h1: string; sousTitre: string; blocs: TitreTexte[] };
  tarifs: Meta & { h1: string; sousTitre: string; faq: { q: string; r: string }[] };
};

const INSECABLE = "\u00A0";
const FINE = "\u202F";
const UNITES = "%|€|min|h|m|km|mois|ans?|jours?";

/**
 * Typographie française à l'affichage : espace insécable avant « : », entre un nombre et son unité
 * et à l'intérieur des guillemets, espace fine insécable avant « ; ! ? ». Le JSON reste lisible avec des espaces simples.
 */
export function typographier(texte: string): string {
  return texte
    .replace(/ +:/g, `${INSECABLE}:`)
    .replace(/ +([;!?])/g, `${FINE}$1`)
    .replace(/« +/g, `«${INSECABLE}`)
    .replace(/ +»/g, `${INSECABLE}»`)
    .replace(new RegExp(`(\\d) (${UNITES})(?![\\p{L}\\d])`, "gu"), `$1${INSECABLE}$2`);
}

function typographierTout<T>(valeur: T): T {
  if (typeof valeur === "string") return typographier(valeur) as T;
  if (Array.isArray(valeur)) return valeur.map((v) => typographierTout(v)) as T;
  if (valeur && typeof valeur === "object") {
    return Object.fromEntries(Object.entries(valeur).map(([cle, v]) => [cle, cle === "slug" ? v : typographierTout(v)])) as T;
  }
  return valeur;
}

/**
 * Tous les textes du site. Rédigés selon deliview-redaction et limités aux faits produit confirmés par Tom :
 * Deliview travaille sur les données publiques d'Uber Eats et Deliveroo, sans accès aux comptes du client.
 * Une fonctionnalité non livrée prend `bientot: true`.
 */
export const CONTENU = typographierTout(brut) as Contenu;
export const PILIERS = CONTENU.piliers;
export const PROFILS = CONTENU.profils;
