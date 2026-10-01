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

- Coordonnées, slogan, définition, piliers, fonctionnalités, plateformes, offres : `src/lib/site.ts`. Le site ne présente que ce que Deliview fait aujourd'hui (décision de Tom, 2 octobre 2026) : pas d'étiquette « Bientôt », pas d'Uber Direct.
- Slogan définitif : « Le partenaire des restaurants en livraison » (`SITE.slogan`) : hero, pied de page, Qui sommes-nous, données structurées
- Offres et prix (Essentiel, Pro, Premium) : `OFFRES` dans `src/lib/site.ts` ; la page Tarifs, le hero, le simulateur et les données structurées suivent
- Pages : `src/pages/` ; composants : `src/components/` ; charte (5 couleurs, polices) : `src/styles/global.css`
- Polices : titres en Aspekta (police du logo), texte, boutons et menus en Inter
- Hero de l'accueil : vidéo 16:9 (`HeroVideo.astro`, fichiers dans `public/video/`), chargée au clic seulement
- Simulateur de rentabilité : `src/pages/simulateur.astro` (calcul dans le navigateur, rien n'est envoyé)
- Pied de page : bandeau photo « Prêt à… » puis colonnes Solution / Pour qui / Ressources (`Footer.astro`)
- Articles : un fichier Markdown par article dans `src/content/ressources/` (format dans `src/content.config.ts`)
- Captures : `public/images/capture-*.webp` (données de démonstration, noms de restaurants modifiés).
  `capture-tableau-*` : tableau de bord (Uber Eats et Deliveroo côte à côte), affiché dans un cadre de tablette (`CaptureTablette.astro`)
- Illustrations générées par IA (Canva) : `public/images/ia/<nom>-<largeur>.webp`, déclarées dans `IMAGES_IA` (`src/lib/site.ts`),
  affichées par `PhotoIA.astro` avec la mention visible « Illustration générée par IA ». Jamais présentées comme des clients.
  Versions HD exportées du design Canva « Deliview site – images IA (export) » (800 et 1536 px, livreur 960 et 1680 px).
- Logos Uber Eats et Deliveroo : fichiers officiels fournis par Tom dans `src/assets/logos/` (voir le LISEZMOI du dossier), affichés à côté du nom dans le bandeau « Fonctionne avec » et sur la page Intégrations.
  Sans fichier, le nom s'affiche en texte. Ne jamais redessiner ces logos.
- Typographie française (espaces insécables, « Uber Eats » jamais coupé) : posée automatiquement à la fin du build (`scripts/typo-html.mjs`).
  Les blocs `<script>`, `<style>`, `<pre>` et `<code>` sont mis de côté avant : le CSS minifié peut contenir `<` (`@media (width<=767px)`).

## Formulaire de démo

Le formulaire envoie à la fonction Supabase `lead` (projet osczxtxtxrjbjnozreun) : validation, champ piège,
5 envois par heure et par connexion, doublons écartés pendant 10 minutes, enregistrement dans la table `leads`
(lisible seulement avec la clé de service, depuis le tableau de bord Supabase). E-mails envoyés seulement
quand le secret `BREVO_API_KEY` est réglé sur la fonction. L'empreinte IP est effacée chaque nuit (pg_cron).

## Publication (en ligne à la racine de www.deliview.fr depuis le 1er octobre 2026)

1. `npm run build` sans SITE_BASE, puis copier le contenu de `dist/` à la racine du dépôt de publication
   (Tomiette/deliview-maintenance, branche `main`) en gardant `app/`, `analyse/`, `apercu/` et `CNAME`.
2. Aperçu non indexé : `SITE_BASE=/apercu/ npm run build`, puis remplacer le dossier `apercu/` du dépôt.
3. Restent à compléter : blocs `[À REMPLACER : …]` des mentions légales et de la confidentialité
   (identité de l'éditeur, garanties des transferts hors UE), puis validation par un avocat.
