// Typographie française : espaces insécables avant : ; ! ? », après «, entre un nombre et son unité,
// et dans les milliers. Usage : node scripts/typo.mjs fichier.md [...] (réécrit les fichiers en place).
// Ne touche ni aux URL (pas d'espace dedans), ni au bloc de code, ni aux lignes de tableau « | --- | ».
import { readFileSync, writeFileSync } from 'node:fs';

const NBSP = ' ';
const FINE = ' ';

export function typo(texte) {
  return texte
    .replace(/ :(?=\s|$)/gm, NBSP + ':')
    .replace(/ ([;!?])/g, FINE + '$1')
    .replace(/« /g, '«' + NBSP)
    .replace(/ »/g, NBSP + '»')
    .replace(/(\d) (?=(€|%|h\b|min\b|km\b|cm\b|cl\b|ml\b|l\b|vol\.|ans\b|mois\b|jours\b|semaines\b|minutes\b|heures\b|secondes\b|notes\b|commandes\b|pizzas\b|plats\b|restaurants\b|concurrents\b|photos\b))/g, '$1' + NBSP)
    .replace(/(\d) (\d{3})(?!\d)/g, '$1' + NBSP + '$2')
    .replace(/\b(n°|N°) (\d)/g, '$1' + NBSP + '$2');
}

for (const f of process.argv.slice(2)) {
  const avant = readFileSync(f, 'utf8');
  let dansCode = false;
  const apres = avant
    .split('\n')
    .map((l) => {
      if (l.startsWith('```')) dansCode = !dansCode;
      if (dansCode || /^\|?\s*-{3}/.test(l) || /^\s*url:/.test(l)) return l;
      return typo(l);
    })
    .join('\n');
  if (apres !== avant) writeFileSync(f, apres);
  console.log(f, apres === avant ? 'inchangé' : 'corrigé');
}
