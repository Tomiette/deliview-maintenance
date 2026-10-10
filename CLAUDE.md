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

Le 10 octobre 2026, ces changements ont été faits **directement dans `main/apercu/`** (PR #1 à #3, #5 à #8).
État validé par Tom, à reprendre tel quel (`apercu/index.html` + fichiers ci-dessous) :

1. **Haut de l'accueil** (design de Tom) : hero « Plus de rentabilité sur Uber Eats et Deliveroo » (boutons
   « Demander une démo » + « Voir nos deux formules » vers `#formules`, Pizza Cosy, écran incliné, « Voir la vidéo »
   qui ouvre la fenêtre vidéo existante), puis « Vous n'avez pas le temps » + « Votre rentabilité part à 3 endroits ».
   Fichiers : `apercu/assets/accueil-design.*.css|js`, images `apercu/images/accueil/`. Ce CSS contient encore les
   styles de l'ancienne « La solution » (`.dva-pilier`, `.dva-inclus`, `.dva-choix`…) : inutilisés, ne pas les reporter.
2. **Figtree remplace Aspekta (et Inter) sur tout le site** : décision de Tom. Police auto-hébergée
   `apercu/assets/Figtree-latin*.woff2` (variable 300-900), variables `--font-sans`, `--font-accent`,
   `--font-chiffres` dans `apercu/assets/Base.*.css`, licence `apercu/fonts/Figtree-OFL.txt`, crédits des mentions légales.
3. **« La solution »** (4e version, la bonne) : quatre onglets de pertes réelles (remboursement retenu, prix sous la
   zone, fermé en plein service, aucune offre en ligne) ; pour chacune l'alerte « Repéré par Deliview », une fourche
   et deux voies, Autonomie (« Vous décidez », le curseur clique) et Délégation (« On s'en occupe », recommandée,
   Tom), même résultat. Phrases des voies = page Tarifs, chiffres = compte de démonstration. Défilement auto quand
   visible, arrêt au clic. Section `#solution`, conteneur `#formules`. Fichiers `apercu/assets/accueil-flux.*.css|js`.
4. **« Avant, après »** (remplace l'exemple Margherita) : téléphone où « Pizza Démo » remonte de la 6e à la 1re
   place, animation continue calculée image par image (une progression p de 0 à 1, chaque restaurant glisse quand
   il est dépassé, compteur 6 → 1), sélecteur Avant / Après mis en avant avec pastille glissante, pause, lien
   « Voir sur mon restaurant » vers `#demo`. Actions affichées : « Menu optimisé », « Offre lancée au bon moment »,
   « Prix ajustés à la zone ». Pas de mention sous le bloc (décision de Tom). Fichiers
   `apercu/assets/accueil-classement.*.css|js`.

5. **« Ils utilisent Deliview »** : bandeau centré sous le hero, carte Pizza Cosy (devanture, logo en médaillon,
   « Nous fait confiance depuis le premier jour. » sur une ligne ; carte verticale sur téléphone). La ligne Pizza Cosy
   a quitté la colonne du hero. Fichier `apercu/assets/accueil-clients.*.css`.
7. **« Concurrents, visibilité, rentabilité : tout au même endroit »** (pastille « Dans l’app Deliview ») (entre « Avant, après » et le bloc fondateur, fond gris) : la photo de Tom d’un vrai
   téléphone, détourée (`images/accueil/telephone-deliview-detoure-751.webp`, fond transparent, contour calculé à
   partir de l’écran + cadre + épaisseur, ombre en CSS ; même cadrage 751 × 602 que la photo d’origine), avec l’interface de l’app posée sur l’écran en perspective
   (dessinée en 390 × 844, homographie `matrix3d` calculée par le script sur les coins mesurés de l’écran
   TL 378,12.5 · TR 632.7,118.2 · BR 330.6,571.8 · BL 63,449.9 ; `clip-path` pour l’encoche et les coins). Barre
   d’onglets Concurrents / Visibilité / Rentabilité, « Compte démo » en en-tête ; à côté, la liste des trois questions
   (« Que font mes concurrents ? », « Est-ce que les clients me voient ? », « Analysez l’efficacité de vos actions »)
   qui s’allume avec l’onglet (barre de progression, défilement auto quand visible, arrêt au clic). Concurrents
   anonymisés, chiffres du compte de démo. Fichiers `apercu/assets/accueil-appli.*.css|js`. Tom veut des blocs qui
   parlent au restaurateur : vraies photos, logos, situations concrètes, pas des interfaces abstraites. Rester neutre
   sur le type de cuisine (pas que de la pizza).
8. **« Comment fonctionne Deliview »** (titre seul, repères seuls, sans sous-texte : 1 Récupération des données · 2 Élaboration d’une stratégie intelligente grâce à la
   puissance de la data · 3 Deliview déploie sur vos plateformes
   dans la scène ; étape 2 = « analyse vos données et votre zone, et élabore une stratégie intelligente grâce à la
   puissance de la data », formulation voulue par Tom ; en haut de page, juste après « Ils utilisent Deliview », fond clair bleuté, pas de
   fond gris : demande de Tom) : « le moteur Deliview ».
   Les données (Ventes, Note, Prix, Commandes) partent des icônes Uber Eats / Deliveroo à gauche et glissent le long de
   courbes (offset-path, Web Animations) jusqu'au noyau Deliview lumineux, qui pulse ; les actions repartent vers les
   icônes à droite, dont le compteur augmente. Scène dessinée à taille fixe (1120 × 420, 360 × 640 sur téléphone)
   et mise à l'échelle par le script. Phrase de chaque étape sous son repère dans la scène (plus de cartes) ;
   sur téléphone, liste simple sous la scène. Fichiers `apercu/assets/accueil-moteur.*.css|js`.
   Ne pas copier le bloc de Flynt (concurrent) : pas de logos de caisses.
6. **Section Tarifs retirée de l'accueil** (décision de Tom) : les offres restent sur la page /tarifs/.

Animations : toutes respectent `prefers-reduced-motion` (pas de lecture auto ; état final affiché ; un clic sur
Avant / Après joue quand même une transition courte). Tom a ce réglage activé sur son ordinateur : s'il dit qu'une
animation « ne bouge pas » ou « saute », vérifie d'abord ça.

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
- Passer le site public au nouveau design quand Tom valide l'aperçu (build final depuis `site-source`, jamais en copiant `apercu/`).
- Passer l'app (`apercu/app/`) en Figtree si Tom le confirme.
- Mettre à jour la compétence `deliview-web-design` (police Figtree).
