import { CONTENU } from "../content/contenu";

/**
 * Réglages du site. Une valeur `null` masque l'élément concerné au lieu d'afficher une info inventée.
 */
export const SITE = {
  nom: "Deliview",
  url: "https://deliview.fr",
  /** Définition unique de Deliview, reprise telle quelle partout (accueil, JSON-LD, pied de page). */
  definition: CONTENU.definition,
  email: "tom@deliview.fr",
  /** Numéro commercial, format affiché et format E.164. Masqué tant qu'il est null. */
  telephone: null as { affiche: string; e164: string } | null,
  /** Nombre réel de places restantes dans le programme pilote. */
  placesPilote: null as number | null,
  /** Lien Cal.com de la démo (ex. "deliview/demo"). La réservation en ligne s'affiche quand il est renseigné. */
  calLink: null as string | null,
  /** Lien « Espace pilote » vers l'application (ex. "https://app.deliview.fr"). Masqué tant qu'aucun pilote n'a de compte. */
  appUrl: null as string | null,
  linkedin: {
    deliview: null as string | null,
    tom: null as string | null,
  },
};
