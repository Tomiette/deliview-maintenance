// Typographie française appliquée au HTML généré : seulement dans le texte visible
// (jamais dans les balises, les attributs, <script> ni <style>).
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const NBSP = ' ';
const FINE = ' ';

export function typo(t) {
  return t
    .replace(/ :(?=\s|$)/g, NBSP + ':')
    .replace(/ ([;!?])(?=\s|$|[»)])/g, FINE + '$1')
    .replace(/« /g, '«' + NBSP)
    .replace(/ »/g, NBSP + '»')
    .replace(/(\d) (?=(€|%|h\b|min\b|km\b|cm\b|cl\b|ml\b|vol\.|ans\b|mois\b|jours\b|semaines\b|minutes\b|heures\b|secondes\b|notes\b|commandes\b|pizzas\b|plats\b|restaurants\b|concurrents\b|photos\b|places\b|établissements\b))/g, '$1' + NBSP)
    .replace(/(\d) (?=\d{3}(?!\d))/g, '$1' + NBSP)
    // Noms de marque jamais coupés en fin de ligne (« Uber / Eats »).
    .replace(/\bUber\s+(Eats|Direct)\b/g, 'Uber' + NBSP + '$1');
}

export function typoHtml(html) {
  // Les blocs <script>, <style>, <pre>, <code> et <textarea> sont mis de côté en entier avant le découpage :
  // le CSS minifié peut contenir « < » (@media (width<=767px)), qui fausserait le repérage des balises.
  const proteges = [];
  const masque = html.replace(/<(script|style|pre|code|textarea)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, (bloc) => {
    proteges.push(bloc);
    return `\u0000${proteges.length - 1}\u0000`;
  });
  return masque
    .split(/(<[^>]*>)/)
    .map((morceau) => (morceau.startsWith('<') ? morceau : typo(morceau)))
    .join('')
    .replace(/\u0000(\d+)\u0000/g, (_, i) => proteges[Number(i)]);
}

export function typoDossier(dossier) {
  let n = 0;
  for (const nom of readdirSync(dossier)) {
    const p = join(dossier, nom);
    if (statSync(p).isDirectory()) n += typoDossier(p);
    else if (nom.endsWith('.html')) {
      const avant = readFileSync(p, 'utf8');
      const apres = typoHtml(avant);
      if (apres !== avant) {
        writeFileSync(p, apres);
        n++;
      }
    }
  }
  return n;
}
