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
    .replace(/(\d) (\d{3})(?!\d)/g, '$1' + NBSP + '$2');
}

export function typoHtml(html) {
  let dans = null;
  return html
    .split(/(<[^>]+>)/)
    .map((morceau) => {
      if (morceau.startsWith('<')) {
        const m = /^<(\/?)(script|style|pre|code|textarea)\b/i.exec(morceau);
        if (m) dans = m[1] ? null : m[2].toLowerCase();
        return morceau;
      }
      return dans ? morceau : typo(morceau);
    })
    .join('');
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
