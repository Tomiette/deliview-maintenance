// Plan du site pour les moteurs : toutes les pages indexables, avec leur date de mise à jour réelle.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { PILIERS, PLATEFORMES, SITE } from '../lib/site';

// Date de la dernière modification des pages fixes (à changer quand leur contenu change).
const PAGES_MAJ = '2026-10-01';

export const GET: APIRoute = async () => {
  const articles = await getCollection('ressources', (a) => !a.data.brouillon);
  const fixes = ['/', '/solution/', '/integrations/', '/integrations/uber-eats-et-deliveroo/', '/tarifs/', '/simulateur/', '/ressources/', '/qui-sommes-nous/', '/demo/', '/mentions-legales/', '/confidentialite/'];
  const urls = [
    ...fixes.map((c) => ({ loc: c, lastmod: PAGES_MAJ })),
    ...PILIERS.map((p) => ({ loc: `/solution/${p.slug}/`, lastmod: PAGES_MAJ })),
    ...PLATEFORMES.map((p) => ({ loc: `/integrations/${p.slug}/`, lastmod: PAGES_MAJ })),
    ...articles.map((a) => ({ loc: `/ressources/${a.id}/`, lastmod: a.data.misAJourLe.toISOString().slice(0, 10) })),
  ];
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${SITE.url}${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
