// llms.txt : résumé du site pour les moteurs de réponse IA (format llmstxt.org), généré à partir des mêmes
// données que les pages, pour ne jamais diverger du site (offres, fonctions, articles). 7 octobre 2026 : chaque fonction
// avec sa page, son bénéfice et, quand il y en a un, son exemple réel.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { LEVIERS, OFFRES, SITE, VEILLE, cheminFonction } from '../lib/site';
import { PAGES } from '../lib/fonctions';
import { NE_FAIT_PAS, texteBrut } from '../lib/faq';

export const GET: APIRoute = async () => {
  const articles = (await getCollection('ressources', (a) => !a.data.brouillon)).sort(
    (a, b) => b.data.misAJourLe.getTime() - a.data.misAJourLe.getTime(),
  );
  const u = (chemin: string) => SITE.url + chemin;
  const lignes = [
    '# Deliview',
    '',
    `> ${SITE.definition}`,
    '',
    `${SITE.slogan}. Logiciel français, pour les restaurants en France présents sur Uber Eats et Deliveroo : pizzerias, burgers et snacks, dark kitchens, petites chaînes. ${SITE.argument} Chaque prix comparé cite ses sources.`,
    '',
    '## Ce que fait Deliview',
    '',
    ...[...LEVIERS.map((l) => ({ id: l.id, nom: l.nom })), ...VEILLE.map((v) => ({ id: v.id, nom: v.nom.replace(/ \?$/, '') }))].map(({ id, nom }) => {
      const p = PAGES[id];
      const exemple = [p.zoom, p.complement].find((b) => b?.exemple)?.exemple;
      return `- [${nom}](${u(cheminFonction(id))}) : ${p.h1}. ${p.lead} ${p.points.join(' · ')}.${exemple ? ` Exemple réel : ${exemple.texte} (${exemple.contexte}).` : ''}`;
    }),
    `- [Simulateur de rentabilité](${u('/simulateur/')}) : ce que rapporte un prix mieux placé, calculé dans le navigateur.`,
    `- [Intégrations](${u('/integrations/')}) : Uber Eats et Deliveroo, plateformes analysées en France.`,
    // 8 octobre 2026 (audit SEO et GEO) : la même réponse que sur /deliview-est-il-fiable/.
    `- [Ce que Deliview ne fait pas](${u('/deliview-est-il-fiable/#' + NE_FAIT_PAS.id)}) : ${texteBrut(NE_FAIT_PAS.r)}`,
    '',
    '## Tarifs',
    '',
    // Plus aucun prix public depuis le 8 octobre 2026 (demande de Tom) : le prix est fixé avec Tom, avant tout paiement.
    ...OFFRES.map((o) => `- ${o.nom} : ${o.restaurants.toLowerCase()}. ${o.pour}.`),
    `- Prix selon les restaurants et les besoins, fixé avec Tom avant tout paiement. Sans engagement, mise en place offerte. Détail des offres : ${u('/tarifs/')}`,
    '',
    '## Guides pour les restaurateurs',
    '',
    ...articles.map((a) => `- [${a.data.titre}](${u(`/ressources/${a.id}/`)}) : ${a.data.description}`),
    '',
    '## Contact',
    '',
    `- [Questions fréquentes](${u('/questions-frequentes/')}) : ce que fait Deliview, pour qui, prix, engagement, fondateur.`,
    `- [Qui suis-je](${u('/qui-sommes-nous/')}) : Tom Voisin, fondateur, l'histoire et la construction de Deliview.`,
    `- [Deliview est-il fiable ?](${u('/deliview-est-il-fiable/')}) : éditeur (DELIVIEW SAS, SIREN 102 681 509), prix publics, contrats, hébergement des données, accès aux comptes, contact. Chaque fait avec son lien.`,
    `- [Demander une démo](${u('/demo/')}) : 30 minutes avec Tom, sur le restaurant du restaurateur.`,
    `- E-mail : ${SITE.email}`,
    '',
    '## Optional',
    '',
    `- [Version complète en texte brut](${u('/llms-full.txt')}) : questions fréquentes et guides en entier, avec leurs sources.`,
    '',
  ];
  return new Response(lignes.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
