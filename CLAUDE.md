# Deliview : dépôt de publication de www.deliview.fr

Tu travailles avec Tom, fondateur de Deliview. Tutoie-le, va droit au but, pas de flatterie. Réponds en français.

## Ce dépôt, en deux branches qui comptent

- `main` : le site **compilé** (HTML/CSS/JS minifiés), envoyé par FTP chez OVH à chaque push
  (`.github/workflows/deploiement-ovh.yml`, environ 4 minutes). Racine = site public, `apercu/` = aperçu non indexé
  servi sur https://www.deliview.fr/apercu/, `app/` = l'app, `analyse/` = page à part.
- `site-source` : la **source** Astro 7 + Tailwind 4 (lis son `README.md` : où changer quoi, build, publication).
  `SITE_BASE=/apercu/ npm run build` produit l'aperçu, `npm run build` le site public, puis on copie `dist/` dans `main`
  en gardant `app/`, `analyse/`, `apercu/`, `CNAME`, `CLAUDE.md` et `.github/`.

## ⚠️ À régler en premier : l'aperçu a été modifié dans le compilé, pas dans la source

Le 10 octobre 2026, ces changements ont été faits **directement dans `main/apercu/`** (PR #1, #2, #3) :

1. Nouveau haut de l'accueil, depuis le design de Tom : hero « Plus de rentabilité sur Uber Eats et Deliveroo »,
   « Vous n'avez pas le temps » + « Votre rentabilité part à 3 endroits », « La solution » (choix Je confie /
   Je garde la main, Tout est inclus). Fichiers : `apercu/assets/accueil-design.*.css|js`, `apercu/images/accueil/`.
2. **Figtree remplace Aspekta (et Inter) sur tout le site** : décision de Tom. Police auto-hébergée
   `apercu/assets/Figtree-latin*.woff2` (variable 300-900), variables `--font-sans`, `--font-accent`,
   `--font-chiffres` dans `apercu/assets/Base.*.css`, licence `apercu/fonts/Figtree-OFL.txt`, crédits des mentions légales.
3. Bloc « Avant, après » (remplace l'exemple Margherita) : téléphone animé où « Pizza Démo » (compte de démonstration,
   chiffres fictifs) remonte de la 6e à la 1re place. Fichiers `apercu/assets/accueil-classement.*.css|js`.

**Le prochain build depuis `site-source` écrasera tout ça.** Avant toute autre modif de l'aperçu, reporte ces
changements dans `site-source` (composants Astro, `src/styles/global.css` pour Figtree, `src/fonts/`), en reprenant
le HTML et le CSS de `main/apercu/` comme référence. Ensuite seulement, on retravaille par la source.

Le site public (racine de `main`) est encore l'ancienne version en Aspekta : il ne passe au nouveau design que quand Tom valide l'aperçu.

## Règles techniques à respecter

- **CSP stricte** (balise meta dans chaque page) : pas de `<script>` ni de `<style>` en ligne nouveaux (ceux qui
  existent sont autorisés par empreinte sha256, ne les modifie pas d'un octet). Les attributs `style=""` passent.
  CSS et JS nouveaux = fichiers externes dans `assets/`. Images, polices, vidéos servies depuis le site (`'self'`).
- **Cache d'un an sur `assets/`** : tout fichier CSS/JS modifié change de nom (empreinte dans le nom), et toutes les
  pages qui le citent sont mises à jour.
- Charte : 5 couleurs seulement (Blue 1 #5282FF, Blue 2 #5A8BF9, Grey #F5F5F7, White, Grey 2 #4C4C4C, et leurs
  transparences), police Figtree partout. Jamais de petit texte blanc sur bleu (19 px gras minimum). Un seul bouton
  plein par écran. Les compétences `deliview-web-design`, `deliview-site-technique` et `deliview-redaction` détaillent
  le reste ; la compétence web-design dit encore « Aspekta partout » : c'est dépassé, Figtree l'emporte.
- **Jamais de chiffre, client, avis ou classement inventé présenté comme réel.** Données de démo = marquées comme
  telles (« Compte de démonstration »). Pizza Cosy est un vrai client : seulement le logo et « Nous fait confiance
  depuis le premier jour ».

## Méthode de travail qui a marché

- Tester en local : `python3 -m http.server 8765` depuis la racine du dépôt, puis Playwright (installé en global :
  `NODE_PATH=$(npm root -g) node script.js`, Chromium dans `/opt/pw-browsers`). Vérifier 375, 768, 1024 et 1440 px :
  pas de défilement horizontal, pas d'erreur console ni CSP. Envoyer des captures à Tom.
- Un design exporté de Claude Design (`.html` « bundler ») se décode : manifeste JSON en base64/gzip + template.
  Extraire les images, reconstruire en vrai HTML responsive avec les classes du site (`dv-container`, `dv-section`,
  `dv-pastille`, `dv-cta`, `dv-btn-contour`, `dv-bande-bleue`, `dv-points`), jamais copier le positionnement absolu du canevas.
- Git : travailler sur une branche `claude/…`, PR vers `main`, fusion quand Tom le demande. Une PR fusionnée ne se
  réutilise pas : repartir de `origin/main`.
- Réseau : `deliview.fr` et `*.deliview.fr` sont autorisés dans l'environnement cloud.
- Ne lance jamais `pkill -f` avec un motif présent dans ta propre commande (ça tue le shell).

## Ce que Tom a en tête ensuite

- Reporter le travail ci-dessus dans `site-source` (priorité, voir plus haut).
- Restyler la suite de l'accueil (fondateur, tarifs, FAQ, démo) dans l'esprit du nouveau haut de page.
- Passer l'app (`apercu/app/`) en Figtree si Tom le confirme.
- Mettre à jour la compétence `deliview-web-design` (police Figtree).
