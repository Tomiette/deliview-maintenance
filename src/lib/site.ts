/**
 * Réglages du site. Une valeur `null` masque l'élément concerné au lieu d'afficher une info inventée.
 */
export const SITE = {
  nom: "Deliview",
  url: "https://deliview.fr",
  definition:
    "Deliview est un logiciel français qui centralise Uber Eats et Deliveroo sur un seul écran pour les restaurateurs.",
  email: "tom@deliview.fr",
  /** Numéro commercial, format affiché et format E.164. Masqué tant qu'il est null. */
  telephone: null as { affiche: string; e164: string } | null,
  /** Nombre réel de places restantes dans le programme pilote. */
  placesPilote: null as number | null,
  /** Lien Cal.com de la démo (ex. "deliview/demo"). La réservation en ligne s'affiche quand il est renseigné. */
  calLink: null as string | null,
  appUrl: "https://app.deliview.fr",
  linkedin: {
    deliview: null as string | null,
    tom: null as string | null,
  },
};

export const PLATEFORMES = [
  { nom: "Uber Eats", statut: "Disponible" },
  { nom: "Deliveroo", statut: "Disponible" },
  { nom: "Uber Direct", statut: "Bientôt" },
] as const;
