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
- Offres (Autonomie et Délégation depuis le 9 octobre 2026, identifiants « pro » et « premium ») : `OFFRES` dans `src/lib/site.ts` ; la page Tarifs, l'accueil, « Commencer » et llms.txt suivent. Plus aucun prix affiché sur le site (8 octobre 2026)
- Pages : `src/pages/` ; composants : `src/components/` ; charte (5 couleurs, polices) : `src/styles/global.css`
- Polices : titres en Aspekta (police du logo), texte, boutons et menus en Inter
- Direction graphique « le passe » (cahier et maquettes du 2 octobre 2026) : tickets (`Ticket.astro`, `TicketComparaison.astro`),
  marqueur (`Marqueur.astro`, tracé une fois à l'apparition par `src/scripts/mouvement.ts`, visible sans JavaScript),
  cadre tablette (`CadreTablette.astro`), cadre téléphone (`CadreTelephone.astro`, en attente d'une vraie capture sur téléphone),
  ligne de réassurance (`Reassurance.astro`), carte fonctionnalité (`CarteFonctionnalite.astro`), frise (`Frise.astro`).
  Exemple réel du ticket de l'accueil : `EXEMPLE_MARGHERITA` (`src/lib/site.ts`)
- Icônes : dessinées au trait, une par fichier dans `src/icons/` (tracés repris de la planche validée), base commune
  `Trace.astro` ; registre par nom pour les données (`src/lib/registre-icones.ts`). Aucune bibliothèque d'icônes
- Vidéo de présentation 16:9 (`HeroVideo.astro`, fichiers dans `public/video/`), dans la section « Comment ça marche », chargée au clic seulement
- Simulateur de rentabilité : `src/pages/simulateur.astro` (calcul dans le navigateur, rien n'est envoyé)
- Pied de page : colonnes Solution / Pour qui / Ressources / Légal, e-mail (`Footer.astro`) ; sur téléphone, bouton démo fixé en bas
  dès qu'aucun bouton principal (`data-cta-principal`), formulaire, vidéo, bloc « Demandez à votre IA » ou pied de page n'est à
  l'écran (8 octobre 2026) ; absent de /commencer/, /merci/, /parrainage/ et /simulateur/ (`barreDemo={false}`)
- Articles : un fichier Markdown par article dans `src/content/ressources/` (format dans `src/content.config.ts`)
- Captures : `public/images/capture-*.webp` (données de démonstration, noms de restaurants modifiés), toujours dans le cadre
  tablette (`CadreTablette.astro`). `capture-tableau-*` : Uber Eats et Deliveroo côte à côte ; `capture-hero-*` : Pricing Menu
  (haut de l'accueil, recadrage `capture-carte-mobile-*` sur téléphone)
- Images générées par IA : retirées du site (cahier du 2 octobre 2026). Seulement de vraies photos (Tom) et des illustrations au trait
  (`IllustrationTablettes.astro`). Sous les images : aucun micro-texte ; seule la vidéo garde la note des maquettes
  (« La vidéo se charge quand vous cliquez »).
- Logos Uber Eats et Deliveroo : fichiers officiels fournis par Tom dans `src/assets/logos/` (voir le LISEZMOI du dossier), affichés seuls dans le bandeau « Fonctionne avec » (nom en texte alternatif, choix de Tom du 2 octobre 2026) et à côté du nom sur la page Intégrations.
  Sans fichier, le nom s'affiche en texte. Ne jamais redessiner ces logos.
- Typographie française (espaces insécables, « Uber Eats » jamais coupé) : posée automatiquement à la fin du build (`scripts/typo-html.mjs`).
- robots.txt, sitemap.xml et llms.txt (résumé du site pour les moteurs IA) : générés au build à partir des données du site (`src/pages/robots.txt.ts`, `sitemap.xml.ts`, `llms.txt.ts`, `llms-full.txt.ts`). Favicons : `public/favicon.svg` et `public/favicon.ico` (16, 32 et 48 px).
- Questions fréquentes : une seule source, `src/lib/faq.ts` (page /questions-frequentes/, bloc de l'accueil, llms.txt, llms-full.txt). Uniquement des faits vérifiables.
- Search Console et Bing Webmaster Tools : coller le code de la balise de vérification dans `SITE.verificationGoogle` ou `SITE.verificationBing` (`src/lib/site.ts`), puis publier.
- Après chaque publication : `node scripts/indexnow.mjs` signale les pages à Bing et aux moteurs IndexNow (clé dans `public/<clé>.txt` et `SITE.indexNowCle`). Derrière un proxy : `NODE_USE_ENV_PROXY=1 node scripts/indexnow.mjs`.
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
3. CGV, CGU et accord de sous-traitance : textes dans `src/legal/*.md` (version 1 du 2 octobre 2026, issue du doc
   « Conditions de Deliview »), pages /cgv/, /conditions-utilisation/ et /accord-sous-traitance/. À faire relire par un avocat ;
   toute nouvelle version change la date et se publie 30 jours avant d'entrer en vigueur pour les clients (CGV article 22).
