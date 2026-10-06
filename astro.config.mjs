// Site vitrine Deliview : génération statique. SITE_BASE permet de publier un aperçu sous /apercu/.
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { typoDossier } from './scripts/typo-html.mjs';

const base = process.env.SITE_BASE || '/';
const prefixe = base.replace(/\/$/, '');

// Liens des articles : les liens internes écrits « /solution/… » prennent la base (aperçu sous /apercu/),
// les liens externes reçoivent rel="noopener".
const liens = {
  name: 'deliview-liens',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      let href = node.properties?.href;
      if (typeof href !== 'string') return;
      // Adresses du site écrites en toutes lettres (« www.deliview.fr/cgv/ », liées en http:// par le Markdown) :
      // ramenées à un chemin interne, avec la barre finale, pour éviter une redirection HTTP puis une autre.
      const interne = href.match(/^https?:\/\/(?:www\.)?deliview\.fr(\/[^?#]*)?([?#].*)?$/);
      if (interne) {
        let chemin = interne[1] || '/';
        if (!chemin.endsWith('/') && !/\.[a-z0-9]+$/i.test(chemin)) chemin += '/';
        href = chemin + (interne[2] || '');
        ctx.setProperty(node, 'href', href);
      }
      if (prefixe && href.startsWith('/') && !href.startsWith('//') && !href.startsWith(prefixe + '/')) ctx.setProperty(node, 'href', prefixe + href);
      if (/^https?:\/\//.test(href)) ctx.setProperty(node, 'rel', 'noopener');
    },
  },
};

// Tableaux des articles : enveloppés dans une zone qui défile horizontalement sur téléphone,
// atteignable au clavier (règle d'accessibilité « scrollable-region-focusable »).
const tableaux = {
  name: 'deliview-tableaux',
  before(_racine, ctx) {
    ctx.data.nbTableaux = 0;
  },
  element: {
    filter: ['table'],
    visit(node, ctx) {
      if (node.properties?.dataEnveloppe) return;
      ctx.data.nbTableaux = (ctx.data.nbTableaux || 0) + 1;
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['dv-tableau'], tabIndex: 0, role: 'region', ariaLabel: `Tableau ${ctx.data.nbTableaux} (défile horizontalement)` },
        children: [{ ...node, properties: { ...(node.properties || {}), dataEnveloppe: '1' } }],
      };
    },
  },
};

// Case d'angle vide d'un tableau (ex. grille des offres des CGV) : une cellule ordinaire plutôt qu'un en-tête sans texte
// (règle d'accessibilité « empty-table-header »). Le texte affiché ne change pas.
const texteDe = (n) => (n.type === 'text' ? n.value : (n.children || []).map(texteDe).join(''));
const entetesVides = {
  name: 'deliview-entetes-vides',
  element: {
    filter: ['th'],
    visit(node) {
      if (texteDe(node).trim() !== '') return;
      return { ...node, tagName: 'td' };
    },
  },
};

// Espaces insécables de la typographie française, posées sur tout le HTML généré.
const typographie = {
  name: 'deliview-typographie',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      logger.info(`typographie : ${typoDossier(fileURLToPath(dir))} pages corrigées`);
    },
  },
};

export default defineConfig({
  site: 'https://www.deliview.fr',
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', assets: 'assets' },
  compressHTML: true,
  markdown: { processor: satteri({ hastPlugins: [liens, tableaux, entetesVides] }) },
  integrations: [typographie],
  vite: { plugins: [tailwindcss()] },
  // Politique de sécurité des contenus (6 octobre 2026, audit de sécurité) : une balise par page, avec l'empreinte de
  // chaque script et style écrit dans la page (Astro les calcule). Rien d'autre que le site lui-même, sauf le
  // formulaire de démo envoyé à la fonction « lead » de Supabase. Le cadrage par d'autres sites reste interdit par
  // l'en-tête X-Frame-Options du .htaccess (frame-ancestors n'est pas lu dans une balise).
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://osczxtxtxrjbjnozreun.supabase.co",
        "media-src 'self'",
        "form-action 'self' https://osczxtxtxrjbjnozreun.supabase.co",
        "frame-src 'none'",
        "object-src 'none'",
        "base-uri 'self'",
        'upgrade-insecure-requests',
      ],
      scriptDirective: { resources: ["'self'"] },
      styleDirective: { resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }] },
    },
  },
});
