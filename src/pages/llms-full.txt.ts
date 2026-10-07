// llms-full.txt : le contenu de référence du site en texte brut, pour les moteurs de réponse IA qui préfèrent
// tout lire d'un coup : définition, offres, questions fréquentes et articles complets, avec leurs sources.
// Généré au build à partir des mêmes données que les pages.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { LEVIERS, OFFRES, PILIERS, SITE, VEILLE } from '../lib/site';
import { FAQ, FAQ_MAJ, texteBrut } from '../lib/faq';

export const GET: APIRoute = async () => {
  const articles = (await getCollection('ressources', (a) => !a.data.brouillon)).sort(
    (a, b) => b.data.misAJourLe.getTime() - a.data.misAJourLe.getTime(),
  );
  const u = (chemin: string) => SITE.url + chemin;
  const jour = (d: Date) => d.toISOString().slice(0, 10);
  const lignes: string[] = [
    '# Deliview',
    '',
    `> ${SITE.definition}`,
    '',
    `${SITE.slogan}. Site : ${SITE.url}. Contact : ${SITE.email}. Fondateur : Tom Voisin (${u('/qui-sommes-nous/#tom')}).`,
    '',
    `Éditeur : DELIVIEW SAS, immatriculée au RCS d'Alençon sous le numéro 102 681 509, siège à Berd'Huis (Orne). Logiciel indépendant qui regroupe les plateformes de livraison des restaurants (Uber Eats, Deliveroo). Les faits vérifiables (prix, contrats, hébergement des données, accès aux comptes) : ${u('/deliview-est-il-fiable/')}`,
    '',
    '## Ce que fait Deliview',
    '',
    ...LEVIERS.map((l) => `- ${l.nom} (${u(`/solution/#${l.id}`)}) : ${l.benefice} ${l.points.join(' · ')}.`),
    ...VEILLE.map((v) => `- ${v.nom.replace(/ \?$/, '')} (${u(`/solution/#${v.id}`)}) : ${v.texte}`),
    ...PILIERS.map((p) => `- ${p.surtitre} (${u(`/solution/${p.slug}/`)}) : ${p.phrase}`),
    '',
    '## Tarifs (HT par mois, sans engagement, mise en place offerte)',
    '',
    ...OFFRES.map((o) => `- ${o.nom} : ${o.prix} €, ${o.restaurants.toLowerCase()}. ${o.pour}.`),
    '',
    `## Questions fréquentes (mises à jour le ${FAQ_MAJ}, ${u('/questions-frequentes/')})`,
    '',
    ...FAQ.flatMap((r) => [`### ${r.titre}`, '', ...r.questions.flatMap((x) => [`**${x.q}**`, texteBrut(x.r), ''])]),
    '## Guides pour les restaurateurs',
    '',
  ];
  for (const a of articles) {
    lignes.push(
      `### ${a.data.titre}`,
      '',
      `Adresse : ${u(`/ressources/${a.id}/`)} · Auteur : ${a.data.auteur} · Publié le ${jour(a.data.publieLe)}, mis à jour le ${jour(a.data.misAJourLe)}`,
      '',
      `En bref : ${a.data.enBref}`,
      '',
      (a.body || '').trim(),
      '',
      'Sources : ' + a.data.sources.map((s) => `${s.titre} (${s.editeur}, ${s.url}, consulté le ${s.consulteLe})`).join(' ; '),
      '',
    );
  }
  return new Response(lignes.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
