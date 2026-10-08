// Contenu validé de la roadmap publique (8 octobre 2026, 1 h 50). À intégrer tel quel dans src/pages/roadmap.astro.
// offre: 'Pro' = Pro et Groupe (étiquette « Offre Pro »). Pas d'étiquette d'offre dans Prochainement ni Plus tard.
// « Votre place sur les plateformes » : table classements_plateformes vérifiée en base le 8 octobre (relevés en cours),
// carte affichée sur l'accueil de l'app (components/tableau/ClassementCarte.tsx).

export const MAJ = '8 octobre 2026';
export const INTRO = 'Ce qui est déjà dans l’app, nos prochaines priorités, et ce qui viendra plus tard. Mise à jour le 8 octobre 2026.';

type Element = { titre: string; texte: string; offre?: 'Pro' };

export const FAIT: { theme: string; elements: Element[] }[] = [
  {
    theme: 'Ventes et argent',
    elements: [
      { titre: 'Vos ventes réunies, chaque matin', texte: 'Uber Eats et Deliveroo sur un seul écran, avec les ventes d’hier.' },
      { titre: 'Jour, semaine ou mois, comparés', texte: 'Vos ventes, commandes et panier face à la période d’avant.' },
      { titre: 'Ce qui vous reste', texte: 'Sur Uber Eats, ce qui arrive après commission et offres.' },
      { titre: 'L’argent perdu, en euros', texte: 'Remboursements, commandes annulées et fermetures en plein service.' },
      { titre: 'Vos heures creuses', texte: 'Le moment de la semaine où il vous manque des commandes.' },
      { titre: 'Vos objectifs de ventes', texte: 'Un objectif par semaine ou par mois, et où vous en êtes.' },
      { titre: 'Remboursements et dates limites', texte: 'Chaque remboursement Uber Eats et Deliveroo, avec son dernier jour pour contester.' },
      { titre: 'Contestation en un clic', texte: 'Vous contestez, Deliview l’envoie à la plateforme et suit la réponse.', offre: 'Pro' },
      { titre: 'Perdu et récupéré sur 90 jours', texte: 'Le bilan de vos remboursements passés, plateforme par plateforme.' },
      { titre: 'Ce que Deliview vous a rapporté', texte: 'Remboursements récupérés et ventes après chaque relance, en euros.', offre: 'Pro' },
    ],
  },
  {
    theme: 'Prix et concurrence',
    elements: [
      { titre: 'Vos prix face à la zone', texte: 'Chaque plat comparé aux mêmes plats chez vos concurrents proches.' },
      { titre: 'Nouveaux prix mis en ligne', texte: 'Vous validez le prix, Deliview le change sur la plateforme.', offre: 'Pro' },
      { titre: 'La carte de votre zone', texte: 'Vos concurrents sur une carte, avec le prix médian de chacun.' },
      { titre: 'Votre place sur les plateformes', texte: 'Votre rang dans la liste d’Uber Eats et de Deliveroo.' },
      { titre: 'Le journal de vos concurrents', texte: 'Leurs offres, prix, plats et notes qui changent, relevés chaque jour.' },
      { titre: 'Votre note face aux voisins', texte: 'Votre note et votre rang par note, sur chaque plateforme.' },
      { titre: 'Les concurrents de votre choix', texte: 'Trois concurrents suivis de près, choisis par vous.', offre: 'Pro' },
      { titre: 'Analyse de zone à la demande', texte: 'Relancez l’analyse quand vous voulez. En Essentiel, une par semaine.', offre: 'Pro' },
      { titre: 'Alertes sur vos concurrents', texte: 'Nouvelle offre, prix ou note chez un voisin : vous êtes prévenu.' },
    ],
  },
  {
    theme: 'Promotions',
    elements: [
      { titre: 'Les promos de votre zone', texte: 'Qui fait quelle offre, quel jour, et ce que permettent les plateformes.' },
      { titre: 'Vos remises mal placées', texte: 'La part de vos remises qui tombe sur des créneaux déjà pleins.' },
      { titre: 'Promos conseillées sur vos creux', texte: 'Trois offres chiffrées d’après vos ventes et votre zone.', offre: 'Pro' },
      { titre: 'Promos programmées et mises en ligne', texte: 'Vous planifiez, Deliview les met en ligne puis les retire.', offre: 'Pro' },
      { titre: 'Le bilan de chaque promo', texte: 'Vos commandes pendant l’offre, face aux quatre semaines d’avant.', offre: 'Pro' },
      { titre: 'Résultats de vos offres Uber Eats', texte: 'Ventes, commandes et nouveaux clients de chaque offre et annonce.', offre: 'Pro' },
    ],
  },
  {
    theme: 'Réputation',
    elements: [
      { titre: 'Tous vos avis réunis', texte: 'Les avis Uber Eats et Deliveroo, relus chaque matin.' },
      { titre: 'Une réponse IA par avis', texte: 'Rédigée d’après ce que dit le client. Vous relisez, puis envoyez.' },
      { titre: 'Ce que disent vos clients', texte: 'Les reproches qui reviennent et les plats qui déçoivent.' },
      { titre: 'Photos de plats passées en revue', texte: 'Chaque photo jugée, avec un conseil quand elle est à reprendre.' },
      { titre: 'Descriptions de plats proposées', texte: 'Une description fidèle par plat. Vous corrigez, Deliview la met en ligne.' },
    ],
  },
  {
    theme: 'Service et équipe',
    elements: [
      { titre: 'Alerte restaurant fermé', texte: 'Vérifié toutes les 10 minutes en service, notification sur votre téléphone.' },
      { titre: 'Relance du restaurant fermé', texte: 'Un clic, et Deliview remet votre restaurant en ligne.', offre: 'Pro' },
      { titre: 'Vos niveaux Uber Eats et Deliveroo', texte: 'Score de réussite et Programme Confiance, critère par critère.' },
      { titre: 'Les consignes pour l’équipe', texte: 'Trois points chiffrés à corriger en service, le plus urgent d’abord.' },
      { titre: 'Plats à vérifier en cuisine', texte: 'Les plats que les clients signalent comme faux ou incomplets.' },
      { titre: 'Envoi à l’équipe sur WhatsApp', texte: 'Consignes, avis ou rapport partent au groupe de l’équipe en un clic.' },
      { titre: 'Le rapport de la semaine', texte: 'Un PDF chiffré pour l’équipe, prêt à partager depuis le téléphone.', offre: 'Pro' },
    ],
  },
  {
    theme: 'Compte et app',
    elements: [
      { titre: 'À faire, en cours, réalisé', texte: 'L’action qui rapporte le plus, puis ce que Deliview applique pour vous.' },
      { titre: 'Assistant IA sur vos chiffres', texte: 'Posez une question : il répond avec vos chiffres et prépare l’offre.', offre: 'Pro' },
      { titre: 'Plusieurs restaurants, un seul compte', texte: 'Passez de l’un à l’autre, le plus urgent apparaît en tête.', offre: 'Pro' },
      { titre: 'Accès pour toute l’équipe', texte: 'Invitez gérants et équipiers : chacun ne voit que son restaurant.' },
      { titre: 'Jamais votre mot de passe', texte: 'Vous invitez Deliview sur Uber Eats et Deliveroo, rien d’autre.' },
      { titre: 'L’app à vos couleurs', texte: 'Le logo et la couleur de votre restaurant dans l’app.' },
      { titre: 'Deliview sur l’écran d’accueil', texte: 'Installable sur iPhone et Android, sans passer par les stores.' },
      { titre: 'Le point du lundi', texte: 'Une notification sur votre téléphone, chaque lundi.' },
      { titre: 'Discuter avec Tom', texte: 'Une messagerie dans l’app : une vraie personne vous répond.' },
      { titre: 'Votre abonnement dans l’app', texte: 'Factures, moyen de paiement et changement d’offre au même endroit.' },
    ],
  },
];

export const PROCHAINEMENT: Element[] = [
  { titre: 'La marge de chaque plat', texte: 'Ce que chaque plat vous laisse après commission, offres et TVA.' },
  { titre: 'Ce qui vous reste, sur Deliveroo', texte: 'Versements, offres et remboursements Deliveroo lus sur vos factures.' },
  { titre: 'L’app Deliview sur votre téléphone', texte: 'Alertes en direct et action en un geste : relancer, contester, répondre.' },
  { titre: 'Ce que rapporte chaque restaurant', texte: 'Par restaurant et par plateforme, ce qui reste une fois tout payé.' },
  { titre: 'Ce que chaque promo vous rapporte', texte: 'Commandes gagnées et marge perdue, pour garder l’offre ou l’arrêter.' },
  { titre: 'Vos scores surveillés avant la sanction', texte: 'Prévenu quand un critère Uber Eats ou Deliveroo glisse vers le rouge.' },
  { titre: 'Un garde-fou sur vos prix', texte: 'Chaque hausse ou promo vérifiée face aux règles d’Uber Eats et de Deliveroo.' },
  { titre: 'Plats oubliés et prix qui divergent', texte: 'Un plat caché trop longtemps ou vendu à deux prix : signalé.' },
];

export const PLUS_TARD: Element[] = [
  { titre: 'La livraison depuis votre site', texte: 'Vos clients commandent chez vous, Uber Direct livre.' },
  { titre: 'La photo du sac, votre preuve', texte: 'L’équipe photographie chaque sac fermé : la preuve est prête en cas de litige.' },
  { titre: 'Vos versements vérifiés jusqu’à la banque', texte: 'Chaque virement comparé à vos ventes, prêt pour votre comptable.' },
  { titre: 'Un plat épuisé, retiré partout', texte: 'Une rupture, et le plat disparaît d’Uber Eats et de Deliveroo, puis revient.' },
  { titre: 'Un dossier pour négocier vos commissions', texte: 'Vos volumes, vos taux et vos scores, prêts pour le rendez-vous.' },
  { titre: 'Chaque lundi, trois décisions à valider', texte: 'Sur votre téléphone, vous dites oui, Deliview applique.' },
  { titre: 'Votre réseau sous contrôle', texte: 'Prix, photos, notes et scores de chaque restaurant face à votre modèle.' },
  { titre: 'Plusieurs marques dans une même cuisine', texte: 'Les menus trop proches entre vos marques, signalés à temps.' },
  { titre: 'Prévoir les commandes de la semaine', texte: 'Par jour et par service, pour caler l’équipe et les achats.' },
];

// Pastilles en pied de colonne : Fait « Dans l’app » ; Prochainement « Nos prochaines priorités » ; Plus tard « À l’étude ».
// Compteurs en haut de page, avec ancres : « 47 en ligne », « 8 en préparation », « 9 à l’étude ».
