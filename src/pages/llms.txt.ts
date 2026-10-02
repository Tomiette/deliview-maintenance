// llms.txt : résumé du site pour les moteurs de réponse IA (format llmstxt.org), généré à partir des mêmes
// données que les pages, pour ne jamais diverger du site (offres, piliers, articles).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { OFFRES, PILIERS, SITE } from '../lib/site';

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
    `${SITE.slogan}. Logiciel français, pour les restaurants en France présents sur Uber Eats et Deliveroo : pizzerias, burgers et snacks, dark kitchens, petites chaînes. Deliview lit les informations publiques des fiches Uber Eats et Deliveroo, sans identifiant à donner. Chaque prix comparé renvoie à la fiche d’où il vient.`,
    '',
    '## Ce que fait Deliview',
    '',
    ...PILIERS.map((p) => `- [${p.surtitre}](${u(`/solution/${p.slug}/`)}) : ${p.phrase}`),
    `- [Simulateur de rentabilité](${u('/simulateur/')}) : ce que rapporte un prix mieux placé, calculé dans le navigateur.`,
    `- [Intégrations](${u('/integrations/')}) : Uber Eats et Deliveroo, plateformes analysées en France.`,
    '',
    '## Tarifs',
    '',
    ...OFFRES.map((o) => `- ${o.nom} : ${o.prix} € HT par mois, ${o.restaurants.toLowerCase()}. ${o.pour}.`),
    `- Sans engagement, mise en place offerte. Détail : ${u('/tarifs/')}`,
    '',
    '## Guides pour les restaurateurs',
    '',
    ...articles.map((a) => `- [${a.data.titre}](${u(`/ressources/${a.id}/`)}) : ${a.data.description}`),
    '',
    '## Contact',
    '',
    `- [Questions fréquentes](${u('/questions-frequentes/')}) : ce que fait Deliview, pour qui, prix, origine des données, fondateur.`,
    `- [Qui sommes-nous](${u('/qui-sommes-nous/')}) : Tom Voisin, fondateur, un an d’analyse sur le terrain auprès des restaurants qui livrent.`,
    `- [Demander une démo](${u('/demo/')}) : 15 minutes sur les fiches du restaurant.`,
    `- E-mail : ${SITE.email}`,
    '',
    '## Optional',
    '',
    `- [Version complète en texte brut](${u('/llms-full.txt')}) : questions fréquentes et guides en entier, avec leurs sources.`,
    '',
  ];
  return new Response(lignes.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
