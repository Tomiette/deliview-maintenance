// robots.txt : moteurs de recherche et robots IA autorisés ; l'app et l'API exclues.
// /analyse/ n'est plus bloquée (2 octobre 2026) : la page porte un noindex, que les robots doivent pouvoir lire
// pour retirer l'adresse de leur index (l'ancien outil public avait été partagé).
import type { APIRoute } from 'astro';
import { SITE } from '../lib/site';

const ROBOTS_IA = ['OAI-SearchBot', 'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended'];

export const GET: APIRoute = () => {
  const lignes = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /app/',
    'Disallow: /api/',
    '',
    ...ROBOTS_IA.flatMap((r) => [`User-agent: ${r}`, 'Allow: /', 'Disallow: /app/', '']),
    `Sitemap: ${SITE.url}/sitemap.xml`,
    '',
  ];
  return new Response(lignes.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
