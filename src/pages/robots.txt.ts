// robots.txt : moteurs de recherche et robots IA autorisés ; l'app et l'API exclues.
// /analyse/ n'est plus bloquée (2 octobre 2026) : la page porte un noindex, que les robots doivent pouvoir lire
// pour retirer l'adresse de leur index (l'ancien outil public avait été partagé).
import type { APIRoute } from 'astro';
import { SITE } from '../lib/site';

// Robots des moteurs de réponse et des modèles d'IA (noms publiés par leurs éditeurs). Un robot qui a son propre groupe
// ignore le groupe « * » : chaque groupe reprend donc les mêmes exclusions (4 octobre 2026).
const ROBOTS_IA = [
  'OAI-SearchBot',
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];
const EXCLUS = ['/app/', '/api/'];

export const GET: APIRoute = () => {
  const lignes = [
    'User-agent: *',
    'Allow: /',
    ...EXCLUS.map((c) => `Disallow: ${c}`),
    '',
    ...ROBOTS_IA.flatMap((r) => [`User-agent: ${r}`, 'Allow: /', ...EXCLUS.map((c) => `Disallow: ${c}`), '']),
    `Sitemap: ${SITE.url}/sitemap.xml`,
    '',
  ];
  return new Response(lignes.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
