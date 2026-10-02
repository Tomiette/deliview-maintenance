// Registre des icônes dessinées, pour les contenus qui désignent une icône par son nom (piliers, fonctionnalités).
// Ailleurs, chaque page importe directement le fichier de l'icône (src/icons/<nom>.astro).
import alerte from '../icons/alerte.astro';
import appareilPhoto from '../icons/appareil-photo.astro';
import ardoise from '../icons/ardoise.astro';
import cadenas from '../icons/cadenas.astro';
import cadenasOuvert from '../icons/cadenas-ouvert.astro';
import courbe from '../icons/courbe.astro';
import enveloppe from '../icons/enveloppe.astro';
import etiquettePrix from '../icons/etiquette-prix.astro';
import etoile from '../icons/etoile.astro';
import loupeZone from '../icons/loupe-zone.astro';
import pieces from '../icons/pieces.astro';
import sacLivraison from '../icons/sac-livraison.astro';
import tabletteQuiSonne from '../icons/tablette-qui-sonne.astro';
import ticket from '../icons/ticket.astro';
import toque from '../icons/toque.astro';

export const ICONES = {
  alerte,
  'appareil-photo': appareilPhoto,
  ardoise,
  cadenas,
  'cadenas-ouvert': cadenasOuvert,
  courbe,
  enveloppe,
  'etiquette-prix': etiquettePrix,
  etoile,
  'loupe-zone': loupeZone,
  pieces,
  'sac-livraison': sacLivraison,
  'tablette-qui-sonne': tabletteQuiSonne,
  ticket,
  toque,
} as const;

export type NomIcone = keyof typeof ICONES;
