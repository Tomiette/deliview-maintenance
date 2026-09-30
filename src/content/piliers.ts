export type Fonctionnalite = {
  titre: string;
  texte: string;
  capture: string;
  bientot?: boolean;
};

export type Pilier = {
  slug: string;
  surtitre: string;
  /** Complément pour les liens : « Découvrir la centralisation ». */
  complement: string;
  titre: string;
  phrase: string;
  meta: { title: string; description: string };
  capture: string;
  fonctionnalites: Fonctionnalite[];
};

// Textes rédigés selon deliview-redaction. Une fonctionnalité non livrée prend `bientot: true`.
export const PILIERS: Pilier[] = [
  {
    slug: "centralisation",
    complement: "la centralisation",
    surtitre: "Centralisation",
    titre: "Uber Eats et Deliveroo sur un seul écran",
    phrase:
      "Toutes vos commandes arrivent au même endroit. Menus, ruptures et horaires se gèrent une seule fois pour les deux plateformes.",
    meta: {
      title: "Centraliser Uber Eats et Deliveroo sur un écran | Deliview",
      description:
        "Commandes, menus et ruptures Uber Eats et Deliveroo réunis sur un seul écran. Fini les tablettes qui s’empilent. Demandez une démo de 15 min.",
    },
    capture: "Écran des commandes Uber Eats et Deliveroo réunies dans une seule liste",
    fonctionnalites: [
      {
        titre: "Une seule liste de commandes, même en plein rush",
        texte:
          "Les commandes Uber Eats et Deliveroo s’affichent dans la même liste, dans l’ordre d’arrivée. Vous ne passez plus d’une tablette à l’autre.",
        capture: "Liste des commandes des deux plateformes dans l’ordre d’arrivée",
      },
      {
        titre: "Changez un prix une fois, il change partout",
        texte:
          "Vous modifiez votre menu dans Deliview. La modification part sur Uber Eats et sur Deliveroo, sans ressaisie.",
        capture: "Éditeur de menu commun aux deux plateformes",
      },
      {
        titre: "Une rupture ? Un clic pour les deux plateformes",
        texte:
          "Mettez un produit en rupture, fermez plus tôt ou mettez l’établissement en pause, sur les deux plateformes à la fois.",
        capture: "Réglage des ruptures et des horaires de l’établissement",
      },
    ],
  },
  {
    slug: "performance",
    complement: "la performance",
    surtitre: "Performance",
    titre: "Votre vraie marge, plateforme par plateforme",
    phrase:
      "Ventes, commissions et panier moyen côte à côte. Vous savez enfin quelle plateforme vous rapporte le plus.",
    meta: {
      title: "Marge et ventes Uber Eats et Deliveroo comparées | Deliview",
      description:
        "Comparez ventes, commissions et marge réelle entre Uber Eats et Deliveroo, et récupérez un rapport TVA prêt pour le comptable. Demandez une démo.",
    },
    capture: "Écran de performance comparant Uber Eats et Deliveroo",
    fonctionnalites: [
      {
        titre: "Les deux plateformes comparées sur les mêmes chiffres",
        texte:
          "Chiffre d’affaires, nombre de commandes, panier moyen et commissions, présentés de la même façon pour Uber Eats et Deliveroo.",
        capture: "Comparaison des ventes et commissions par plateforme",
      },
      {
        titre: "Un rapport TVA prêt pour votre comptable",
        texte:
          "Deliview regroupe les ventes des deux plateformes dans un seul rapport TVA. Vous ne recoupez plus deux relevés à la main.",
        capture: "Rapport TVA regroupant les ventes Uber Eats et Deliveroo",
      },
    ],
  },
  {
    slug: "promotions-concurrence",
    complement: "les promotions et la concurrence",
    surtitre: "Promotions et concurrence",
    titre: "Lancez les bonnes promotions au bon moment",
    phrase:
      "Deliview propose des promotions à partir de vos ventes et vous montre ce que font les restaurants autour de vous.",
    meta: {
      title: "Promotions et concurrence Uber Eats, Deliveroo | Deliview",
      description:
        "Des promotions proposées à partir de vos ventes et une vue sur les restaurants concurrents de votre zone, sur Uber Eats et Deliveroo. Demandez une démo.",
    },
    capture: "Écran des promotions proposées et des restaurants concurrents",
    fonctionnalites: [
      {
        titre: "Des promotions proposées à partir de vos chiffres",
        texte:
          "Deliview analyse vos ventes et vous suggère des promotions. Vous choisissez celles qui partent, et sur quelle plateforme.",
        capture: "Liste des promotions suggérées avec leur plateforme",
      },
      {
        titre: "Situez-vous face aux restaurants de votre zone",
        texte:
          "Suivez les concurrents qui vendent autour de vous sur Uber Eats et Deliveroo, avant de fixer vos prix ou vos offres.",
        capture: "Analyse des restaurants concurrents de la zone",
      },
    ],
  },
  {
    slug: "reputation",
    complement: "la réputation",
    surtitre: "Réputation",
    titre: "Répondez à chaque avis sans y passer la soirée",
    phrase:
      "Avis et plaintes des deux plateformes dans une seule liste, avec une réponse proposée que vous relisez avant l’envoi.",
    meta: {
      title: "Répondre aux avis Uber Eats et Deliveroo | Deliview",
      description:
        "Tous vos avis et plaintes Uber Eats et Deliveroo dans une seule liste, avec une proposition de réponse à relire. Demandez une démo de 15 min.",
    },
    capture: "Écran des avis clients avec une proposition de réponse",
    fonctionnalites: [
      {
        titre: "Tous vos avis au même endroit, une réponse proposée",
        texte:
          "Les avis Uber Eats et Deliveroo arrivent dans une seule liste. Deliview rédige une proposition de réponse, vous la relisez et l’envoyez.",
        capture: "Avis client avec la réponse proposée par Deliview",
      },
      {
        titre: "Chaque plainte reliée à sa commande",
        texte:
          "Produit manquant, retard, commande incomplète : chaque plainte s’affiche avec la commande concernée pour répondre vite.",
        capture: "Plainte client affichée avec le détail de la commande",
      },
    ],
  },
];
