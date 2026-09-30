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
  hero: { h1: string; sousTitre: string; reassurance: string; captureAlt: string };
  bandeau: { libelle: string; plateformes: string[] };
  probleme: { surtitre: string; titre: string; cartes: TitreTexte[] };
  etapes: { surtitre: string; titre: string; items: TitreTexte[] };
  piliersSection: { surtitre: string; titre: string };
  piliers: Pilier[];
  benefices: { titre: string; items: TitreTexte[] };
  fondateur: { surtitre: string; titre: string; paragraphes: string[] };
  demo: { titre: string; etapes: TitreTexte[] };
  formulaire: { libelleEnseigne: string; libelleNombre: string };
  profils: Profil[];
  donnees: Meta & { surtitre: string; h1: string; sousTitre: string; blocs: TitreTexte[] };
  tarifs: Meta & { h1: string; sousTitre: string; faq: { q: string; r: string }[] };
};

/**
 * Tous les textes du site. Rédigés selon deliview-redaction et limités aux faits produit confirmés par Tom :
 * Deliview travaille sur les données publiques d'Uber Eats et Deliveroo, sans accès aux comptes du client.
 * Une fonctionnalité non livrée prend `bientot: true`.
 */
export const CONTENU = brut as Contenu;
export const PILIERS = CONTENU.piliers;
export const PROFILS = CONTENU.profils;
