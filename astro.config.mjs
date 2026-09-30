import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://deliview.fr",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [sitemap({ filter: (page) => !/\/(demande-|404)/.test(page) })],
  vite: {
    plugins: [tailwindcss()],
    // Aucun script en ligne : la CSP n’autorise que script-src 'self'.
    build: { assetsInlineLimit: 0 },
  },
});
