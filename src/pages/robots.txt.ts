// robots.txt : moteurs de recherche et robots IA autorisés ; l'app, l'API et l'outil d'analyse exclus.
import type { APIRoute } from 'astro';
import { SITE } from '../lib/site';

const ROBOTS_IA = ['OAI-SearchBot', 'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended'];

export const GET: APIRoute = () => {
  const lignes = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /app/',
    'Disallow: /api/',
    'Disallow: /analyse/',
    '',
    ...ROBOTS_IA.flatMap((r) => [`User-agent: ${r}`, 'Allow: /', 'Disallow: /app/', 'Disallow: /analyse/', '']),
    `Sitemap: ${SITE.url}/sitemap.xml`,
    '',
  ];
  return new Response(lignes.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
