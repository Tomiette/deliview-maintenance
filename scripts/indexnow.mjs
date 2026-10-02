#!/usr/bin/env node
// Signale les pages de www.deliview.fr aux moteurs IndexNow (Bing, Yandex, Seznam, Naver, Yep), après une publication.
// Bing alimente aussi Copilot et une partie des recherches de ChatGPT. Google n'utilise pas IndexNow : Search Console.
//   node scripts/indexnow.mjs                      → toutes les adresses du sitemap en ligne, plus llms.txt
//   node scripts/indexnow.mjs /tarifs/ /qui-sommes-nous/   → seulement ces pages
// La clé est publiée à la racine du site (public/<clé>.txt) et rappelée dans src/lib/site.ts (SITE.indexNowCle).
// Derrière un proxy : NODE_USE_ENV_PROXY=1 node scripts/indexnow.mjs
import { readFileSync } from 'node:fs';

const SITE = 'https://www.deliview.fr';
const HOTE = 'www.deliview.fr';
const cle = (readFileSync(new URL('../src/lib/site.ts', import.meta.url), 'utf8').match(/indexNowCle:\s*'([0-9a-f]{8,128})'/) || [])[1];
if (!cle) {
  console.error('Clé IndexNow introuvable dans src/lib/site.ts');
  process.exit(1);
}

async function adressesDuSitemap() {
  const r = await fetch(`${SITE}/sitemap.xml`);
  if (!r.ok) throw new Error(`sitemap.xml : ${r.status}`);
  const xml = await r.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const adresses = args.length ? args.map((a) => (a.startsWith('http') ? a : SITE + a)) : [...(await adressesDuSitemap()), `${SITE}/llms.txt`];

// La clé doit être en ligne avant l'envoi, sinon les moteurs refusent la demande.
const verif = await fetch(`${SITE}/${cle}.txt`);
if (!verif.ok || (await verif.text()).trim() !== cle) {
  console.error(`La clé n'est pas encore en ligne sur ${SITE}/${cle}.txt : publiez le site, puis relancez.`);
  process.exit(1);
}

const r = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOTE, key: cle, keyLocation: `${SITE}/${cle}.txt`, urlList: adresses }),
});
// 200 : reçu ; 202 : reçu, clé en cours de vérification ; 4xx : demande refusée (clé, hôte ou adresses).
console.log(`IndexNow : ${r.status} ${r.statusText} pour ${adresses.length} adresse(s)`);
if (r.status >= 400) {
  console.error(await r.text());
  process.exit(1);
}
