// Chronologie de la construction de Deliview, partagée en build in public sur LinkedIn (page Qui sommes-nous).
// Uniquement les étapes données par Tom, dans l'ordre chronologique : date (AAAA-MM-JJ), titre, une phrase, lien du post.
// Liste vide tant que Tom ne les a pas fournies (décision du 2 octobre 2026) : rien n'est inventé.
export interface EtapeChronologie {
  date: string;
  titre: string;
  phrase: string;
  lien: string;
}

export const CHRONOLOGIE: EtapeChronologie[] = [];
