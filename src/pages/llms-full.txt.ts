// llms-full.txt : le contenu de référence du site en texte brut, pour les moteurs de réponse IA qui préfèrent
// tout lire d'un coup : définition, offres, questions fréquentes et articles complets, avec leurs sources.
// Généré au build à partir des mêmes données que les pages.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { LEVIERS, OFFRES, SITE, VEILLE, cheminFonction } from '../lib/site';
import { PAGES } from '../lib/fonctions';
import { FAQ, FAQ_MAJ, NE_FAIT_PAS, texteBrut } from '../lib/faq';

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
    ...LEVIERS.map((l) => `- ${l.nom} (${u(cheminFonction(l.id))}) : ${l.benefice} ${l.points.join(' · ')}.`),
    ...VEILLE.map((v) => `- ${v.nom.replace(/ \?$/, '')} (${u(cheminFonction(v.id))}) : ${v.texte}`),
    '',
    // 8 octobre 2026 (audit SEO et GEO) : la même réponse que sur /deliview-est-il-fiable/ et dans llms.txt.
    `**${NE_FAIT_PAS.q}** (${u('/deliview-est-il-fiable/#' + NE_FAIT_PAS.id)})`,
    texteBrut(NE_FAIT_PAS.r),
    '',
    '## Les fonctions en détail',
    '',
    ...[...LEVIERS.map((l) => ({ id: l.id, nom: l.nom })), ...VEILLE.map((v) => ({ id: v.id, nom: v.nom.replace(/ \?$/, '') }))].flatMap(({ id, nom }) => {
      const p = PAGES[id];
      const offre = [p.offres.toutes && `Toutes les offres : ${p.offres.toutes}`, p.offres.pro && `${p.offres.toutes ? 'En plus avec Pro et Groupe' : 'Avec Pro et Groupe'} : ${p.offres.pro}`].filter(Boolean).join(' ');
      return [
        `### ${nom} (${u(cheminFonction(id))})`,
        '',
        `${p.h1}. ${p.lead}`,
        '',
        ...p.etapes.map((e, i) => `${i + 1}. ${e.titre} : ${e.texte}`),
        '',
        `${texteBrut(p.regles.titre)} : ${texteBrut(p.regles.points.join(' '))}`,
        '',
        offre,
        '',
        ...p.faq.flatMap((x) => [`**${x.q}**`, texteBrut(x.r), '']),
      ];
    }),
    '',
    // Plus aucun prix public depuis le 8 octobre 2026 (demande de Tom) : le prix est fixé avec Tom, avant tout paiement.
    '## Offres (prix et nombre de restaurants selon vos besoins, fixés avec Tom avant tout paiement ; sans engagement, mise en place offerte)',
    '',
    ...OFFRES.map((o) => `- ${o.nom} : ${o.pour}.`),
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
