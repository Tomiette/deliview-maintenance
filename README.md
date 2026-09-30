# Site vitrine Deliview

Astro (génération statique) + Tailwind (5 couleurs de la charte) + une fonction Netlify pour le formulaire de démo + Supabase pour les leads.

La page de maintenance (`index.html` et `CNAME` à la racine) n'est pas touchée : elle reste en ligne tant que le site n'est pas déployé sur Netlify.

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:4321
npm test         # validation du lead + fonction /api/lead
npm run check    # TypeScript strict
npm run build    # sortie dans dist/
```

## Mise en ligne (une fois)

1. Supabase, projet en région Europe : exécuter `supabase/migrations/20260930000000_leads.sql`.
2. Brevo : vérifier le domaine `deliview.fr` (SPF, DKIM, DMARC) avant le premier envoi.
3. Netlify : importer le dépôt, saisir les variables de `.env.example` dans l'interface, puis pointer `deliview.fr` et `www.deliview.fr` vers Netlify.
4. Après le déploiement : envoyer un lead `[TEST]`, vérifier les deux emails, supprimer la ligne.

## Ce qui reste à fournir

Tout contenu manquant est affiché en `[À REMPLACER]` sur le site.

- Captures réelles, 1600 × 1000, en WebP, dans `public/captures/` (le nom attendu est écrit dans chaque bloc). Elles s'affichent dès qu'elles sont déposées.
- Photo de Tom (`src/pages/index.astro`, bloc fondateur) et logo SVG (`src/components/Logo.astro`).
- Réglages dans `src/lib/site.ts` : téléphone, nombre de places du pilote, lien Cal.com, LinkedIn.
- Offres et prix dans `src/pages/tarifs.astro`.
- Mentions légales, CGV, confidentialité, cookies.
- Fonctionnalités pas encore livrées : ajouter `bientot: true` dans `src/content/piliers.ts`.
- Matomo : renseigner `PUBLIC_MATOMO_URL` et `PUBLIC_MATOMO_SITE_ID`, et ajouter son domaine à la CSP dans `netlify.toml`.
