# Site deliview.fr

Site vitrine de Deliview : Astro 7 (génération statique), Tailwind CSS 4, aucune dépendance côté navigateur.

## Commandes

```
npm install
npm run dev                         # http://localhost:4321
SITE_BASE=/apercu/ npm run build    # aperçu publié sous /apercu/ (pages en noindex)
npm run build                       # version finale, à publier à la racine du site
python3 scripts/verifier.py /       # balises, liens, images, typographie, mots interdits
```

## Où changer quoi

- Coordonnées, piliers, fonctionnalités et leur statut (« Bientôt »), plateformes : `src/lib/site.ts`
- Pages : `src/pages/` ; composants : `src/components/` ; charte (5 couleurs, polices) : `src/styles/global.css`
- Articles : un fichier Markdown par article dans `src/content/ressources/` (format dans `src/content.config.ts`)
- Captures : `public/images/capture-*.webp` (données de démonstration, noms de restaurants modifiés)
- Typographie française (espaces insécables) : posée automatiquement à la fin du build (`scripts/typo-html.mjs`)

## Formulaire de démo

Le formulaire envoie à la fonction Supabase `lead` (projet osczxtxtxrjbjnozreun) : validation, champ piège,
5 envois par heure et par connexion, doublons écartés pendant 10 minutes, enregistrement dans la table `leads`
(lisible seulement avec la clé de service, depuis le tableau de bord Supabase). E-mails envoyés seulement
quand le secret `BREVO_API_KEY` est réglé sur la fonction. L'empreinte IP est effacée chaque nuit (pg_cron).

## Avant la mise en ligne à la racine

1. Remplacer tous les blocs `[À REMPLACER : …]` (recherche : `À REMPLACER`).
2. Faire valider mentions légales, confidentialité et conditions du pilote par un avocat.
3. `npm run build` sans SITE_BASE, puis publier `dist/` à la racine du dépôt de publication
   en gardant `app/`, `analyse/` et `CNAME`.
