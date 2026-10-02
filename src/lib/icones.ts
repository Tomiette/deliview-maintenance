// Icônes dessinées au trait (direction « le passe », planche validée le 2 octobre 2026).
// Un fichier par icône dans src/icons/, nommé en français ; ce fichier ne contient que leurs propriétés communes.

// Tailles permises : 48 px dans les cartes, 32 px dans les listes, 24 px au plus petit (jamais moins).
export type TailleIcone = 24 | 32 | 48;

export interface ProprietesIcone {
  taille?: TailleIcone;
  // Icône porteuse de sens : son nom, lu par les lecteurs d'écran. Sans titre, l'icône est décorative (aria-hidden).
  titre?: string;
  class?: string;
}

// Épaisseur du trait sur la grille de 48 : environ 2 px à l'écran quelle que soit la taille (planche des icônes).
export const TRAIT: Record<TailleIcone, number> = { 48: 2.2, 32: 3.2, 24: 4 };
