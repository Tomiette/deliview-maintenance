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
      const href = node.properties?.href;
      if (typeof href !== 'string') return;
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
  markdown: { processor: satteri({ hastPlugins: [liens, tableaux] }) },
  integrations: [typographie],
  vite: { plugins: [tailwindcss()] },
});
