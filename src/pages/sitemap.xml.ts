// Plan du site pour les moteurs : toutes les pages indexables, avec leur date de mise à jour réelle.
// 4 octobre 2026 : la date de chaque page vient de l'historique git de ses fichiers sources (la page et les données
// qui en font le contenu) ; un fichier modifié mais pas encore enregistré compte pour aujourd'hui. Les articles
// gardent leur date « misAJourLe ». Plus de date fixe commune, qui vieillissait à chaque mise à jour.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { execFileSync } from 'node:child_process';
import { PILIERS, PLATEFORMES, SITE } from '../lib/site';

const aujourdhui = () => new Date().toISOString().slice(0, 10);

// Date de la dernière modification d'un ensemble de fichiers (AAAA-MM-JJ), ou null si git n'est pas disponible.
function dateDe(fichiers: string[]): string | null {
  // « :(literal) » : les crochets de [slug].astro ne sont pas lus comme un motif.
  const chemins = fichiers.map((f) => `:(literal)${f}`);
  try {
    const modifies = execFileSync('git', ['status', '--porcelain', '--', ...chemins], { encoding: 'utf8' }).trim();
    if (modifies) return aujourdhui();
    const d = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...chemins], { encoding: 'utf8' }).trim();
    return d || null;
  } catch {
    return null;
  }
}

// Sources de chaque page fixe : la page elle-même et les données qu'elle affiche.
const SITE_TS = 'src/lib/site.ts';
const FAQ_TS = 'src/lib/faq.ts';
const PAGES: { loc: string; sources: string[] }[] = [
  { loc: '/', sources: ['src/pages/index.astro', SITE_TS, FAQ_TS] },
  { loc: '/solution/', sources: ['src/pages/solution/index.astro', SITE_TS] },
  { loc: '/integrations/', sources: ['src/pages/integrations/index.astro', SITE_TS] },
  { loc: '/integrations/uber-eats-et-deliveroo/', sources: ['src/pages/integrations/uber-eats-et-deliveroo.astro', SITE_TS] },
  { loc: '/tarifs/', sources: ['src/pages/tarifs.astro', SITE_TS] },
  { loc: '/simulateur/', sources: ['src/pages/simulateur.astro', SITE_TS] },
  { loc: '/ressources/', sources: ['src/pages/ressources/index.astro', 'src/content/ressources'] },
  { loc: '/qui-sommes-nous/', sources: ['src/pages/qui-sommes-nous.astro'] },
  { loc: '/questions-frequentes/', sources: ['src/pages/questions-frequentes.astro', FAQ_TS] },
  { loc: '/deliview-est-il-fiable/', sources: ['src/pages/deliview-est-il-fiable.astro', SITE_TS] },
  { loc: '/demo/', sources: ['src/pages/demo.astro'] },
  // Page publique liée depuis le pied de page (6 octobre 2026 : elle manquait au plan du site).
  { loc: '/parrainage/', sources: ['src/pages/parrainage/index.astro', SITE_TS] },
  { loc: '/mentions-legales/', sources: ['src/pages/mentions-legales.astro'] },
  { loc: '/confidentialite/', sources: ['src/pages/confidentialite.astro'] },
  { loc: '/cgv/', sources: ['src/pages/cgv.astro', 'src/legal/cgv.md'] },
  { loc: '/conditions-utilisation/', sources: ['src/pages/conditions-utilisation.astro', 'src/legal/cgu.md'] },
  { loc: '/accord-sous-traitance/', sources: ['src/pages/accord-sous-traitance.astro', 'src/legal/sous-traitance.md'] },
];

export const GET: APIRoute = async () => {
  const articles = await getCollection('ressources', (a) => !a.data.brouillon);
  const repli = aujourdhui();
  const urls = [
    ...PAGES.map((p) => ({ loc: p.loc, lastmod: dateDe(p.sources) || repli })),
    ...PILIERS.map((p) => ({ loc: `/solution/${p.slug}/`, lastmod: dateDe(['src/pages/solution/[slug].astro', SITE_TS]) || repli })),
    ...PLATEFORMES.map((p) => ({ loc: `/integrations/${p.slug}/`, lastmod: dateDe(['src/pages/integrations/[slug].astro', SITE_TS]) || repli })),
    ...articles.map((a) => ({ loc: `/ressources/${a.id}/`, lastmod: a.data.misAJourLe.toISOString().slice(0, 10) })),
  ];
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${SITE.url}${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
