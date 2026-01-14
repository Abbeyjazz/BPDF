// Base de données des événements du jeu - 200 événements
// 70% plausibles (140), 20% rares (40), 10% black swan (20)
// Chaque événement a : id, description, probabilité (%), impacts sur les actifs

export const events = [
  // ============================================================
  // ÉVÉNEMENTS PLAUSIBLES (140 événements, proba 5-25%)
  // ============================================================

  // Croissance économique et cycles (20 événements)
  {
    id: 1,
    description: "La France connaît 5 ans de croissance régulière à 2% par an.",
    probability: 20,
    impacts: { actions: 1.3, immo: 1.2, obligations: 1.1 }
  },
  {
    id: 2,
    description: "Récession modérée en France, le PIB recule de 1% par an pendant 3 ans.",
    probability: 12,
    impacts: { actions: 0.85, immo: 0.9, euro: 1.05 }
  },
  {
    id: 3,
    description: "L'économie française stagne, croissance nulle pendant 5 ans.",
    probability: 15,
    impacts: { obligations: 1.1, or: 1.15 }
  },
  {
    id: 4,
    description: "Boom économique exceptionnel, croissance de 4% par an.",
    probability: 8,
    impacts: { actions: 1.5, immo: 1.3, bitcoin: 1.4 }
  },
  {
    id: 5,
    description: "La zone euro entre en récession technique.",
    probability: 10,
    impacts: { actions: 0.8, immo: 0.85, or: 1.3 }
  },
  {
    id: 6,
    description: "Reprise économique forte après une crise.",
    probability: 12,
    impacts: { actions: 1.4, immo: 1.25 }
  },
  {
    id: 7,
    description: "Croissance tirée par la consommation des ménages.",
    probability: 15,
    impacts: { actions: 1.25, immo: 1.15 }
  },
  {
    id: 8,
    description: "Les exportations françaises battent des records.",
    probability: 10,
    impacts: { actions: 1.3, euro: 1.1 }
  },
  {
    id: 9,
    description: "Investissements publics massifs dans les infrastructures.",
    probability: 12,
    impacts: { actions: 1.2, immo: 1.25, obligations: 0.95 }
  },
  {
    id: 10,
    description: "Austérité budgétaire, réduction des dépenses publiques.",
    probability: 10,
    impacts: { actions: 0.9, obligations: 1.15 }
  },
  {
    id: 11,
    description: "L'économie française surperforme ses voisins européens.",
    probability: 12,
    impacts: { actions: 1.3, euro: 1.1 }
  },
  {
    id: 12,
    description: "Crise de confiance des consommateurs, baisse de la demande.",
    probability: 10,
    impacts: { actions: 0.85, immo: 0.9 }
  },
  {
    id: 13,
    description: "Reprise de l'investissement des entreprises.",
    probability: 14,
    impacts: { actions: 1.25, obligations: 0.95 }
  },
  {
    id: 14,
    description: "Le chômage baisse à 6%, salaires en hausse.",
    probability: 12,
    impacts: { actions: 1.2, immo: 1.15 }
  },
  {
    id: 15,
    description: "Le chômage augmente à 12%, pression sur les salaires.",
    probability: 10,
    impacts: { actions: 0.85, immo: 0.9, or: 1.1 }
  },
  {
    id: 16,
    description: "Hausse de la productivité grâce aux nouvelles technologies.",
    probability: 13,
    impacts: { actions: 1.3 }
  },
  {
    id: 17,
    description: "Les PME françaises prospèrent, création d'emplois record.",
    probability: 11,
    impacts: { actions: 1.25 }
  },
  {
    id: 18,
    description: "Vague de faillites d'entreprises, restructurations.",
    probability: 8,
    impacts: { actions: 0.75, obligations: 1.1 }
  },
  {
    id: 19,
    description: "Le déficit commercial français se réduit significativement.",
    probability: 10,
    impacts: { actions: 1.2, euro: 1.1 }
  },
  {
    id: 20,
    description: "Crise de la dette des entreprises, défauts en hausse.",
    probability: 7,
    impacts: { actions: 0.8, obligations: 0.9, or: 1.15 }
  },

  // Immobilier (20 événements)
  {
    id: 21,
    description: "Les prix de l'immobilier augmentent de 30% en 5 ans.",
    probability: 12,
    impacts: { immo: 1.3 }
  },
  {
    id: 22,
    description: "Correction du marché immobilier, baisse de 20%.",
    probability: 10,
    impacts: { immo: 0.8 }
  },
  {
    id: 23,
    description: "Boom de la construction, offre en forte hausse.",
    probability: 12,
    impacts: { immo: 1.15, actions: 1.1 }
  },
  {
    id: 24,
    description: "Pénurie de logements, les prix s'envolent.",
    probability: 13,
    impacts: { immo: 1.4 }
  },
  {
    id: 25,
    description: "Nouvelle loi favorisant l'accession à la propriété.",
    probability: 10,
    impacts: { immo: 1.25 }
  },
  {
    id: 26,
    description: "Durcissement des conditions de crédit immobilier.",
    probability: 12,
    impacts: { immo: 0.85 }
  },
  {
    id: 27,
    description: "L'immobilier de luxe parisien bat des records.",
    probability: 11,
    impacts: { immo: 1.3 }
  },
  {
    id: 28,
    description: "Exode urbain, l'immobilier de centre-ville chute.",
    probability: 9,
    impacts: { immo: 0.9 }
  },
  {
    id: 29,
    description: "Le télétravail généralisé change le marché immobilier.",
    probability: 14,
    impacts: { immo: 1.1 }
  },
  {
    id: 30,
    description: "Taxe sur les résidences secondaires, marché en baisse.",
    probability: 8,
    impacts: { immo: 0.85 }
  },
  {
    id: 31,
    description: "Boom des investissements locatifs, rendements en hausse.",
    probability: 11,
    impacts: { immo: 1.25 }
  },
  {
    id: 32,
    description: "Encadrement des loyers étendu à toute la France.",
    probability: 9,
    impacts: { immo: 0.9 }
  },
  {
    id: 33,
    description: "Rénovation énergétique obligatoire, coûts en hausse.",
    probability: 13,
    impacts: { immo: 0.85 }
  },
  {
    id: 34,
    description: "Nouvelles zones d'aménagement, immobilier périurbain en hausse.",
    probability: 10,
    impacts: { immo: 1.2 }
  },
  {
    id: 35,
    description: "Vieillissement de la population, demande de logements adaptés.",
    probability: 12,
    impacts: { immo: 1.15 }
  },
  {
    id: 36,
    description: "Canicules répétées, l'immobilier du Sud moins attractif.",
    probability: 14,
    impacts: { immo: 0.9 }
  },
  {
    id: 37,
    description: "La gentrification transforme les quartiers populaires.",
    probability: 10,
    impacts: { immo: 1.2 }
  },
  {
    id: 38,
    description: "Crise des promoteurs immobiliers, projets à l'arrêt.",
    probability: 7,
    impacts: { immo: 0.8, actions: 0.95 }
  },
  {
    id: 39,
    description: "Les investisseurs étrangers se ruent sur l'immobilier français.",
    probability: 9,
    impacts: { immo: 1.35 }
  },
  {
    id: 40,
    description: "Nouvelle réglementation urbanistique restrictive.",
    probability: 8,
    impacts: { immo: 0.85 }
  },

  // Politique monétaire et taux (20 événements)
  {
    id: 41,
    description: "La BCE maintient les taux à zéro pendant 5 ans.",
    probability: 15,
    impacts: { actions: 1.2, immo: 1.25, obligations: 0.95 }
  },
  {
    id: 42,
    description: "La BCE remonte les taux à 4%.",
    probability: 12,
    impacts: { obligations: 1.3, actions: 0.85, immo: 0.8 }
  },
  {
    id: 43,
    description: "Taux négatifs généralisés, les épargnants pénalisés.",
    probability: 8,
    impacts: { euro: 0.85, actions: 1.2, bitcoin: 1.4 }
  },
  {
    id: 44,
    description: "Resserrement monétaire brutal pour combattre l'inflation.",
    probability: 10,
    impacts: { obligations: 1.25, actions: 0.8, immo: 0.75 }
  },
  {
    id: 45,
    description: "Assouplissement quantitatif massif de la BCE.",
    probability: 11,
    impacts: { actions: 1.3, immo: 1.2, euro: 0.95 }
  },
  {
    id: 46,
    description: "Les taux d'emprunt immobilier passent à 6%.",
    probability: 10,
    impacts: { immo: 0.75, obligations: 1.2 }
  },
  {
    id: 47,
    description: "Les taux d'emprunt immobilier descendent à 1%.",
    probability: 9,
    impacts: { immo: 1.35, obligations: 0.9 }
  },
  {
    id: 48,
    description: "La BCE lance un programme d'achat d'obligations massif.",
    probability: 12,
    impacts: { obligations: 1.25, euro: 0.95 }
  },
  {
    id: 49,
    description: "Fin du quantitative easing, retour à la normale.",
    probability: 13,
    impacts: { obligations: 0.9, actions: 0.95 }
  },
  {
    id: 50,
    description: "Politique monétaire accommodante prolongée.",
    probability: 14,
    impacts: { actions: 1.15, immo: 1.1 }
  },
  {
    id: 51,
    description: "Les obligations d'État françaises deviennent très attractives.",
    probability: 11,
    impacts: { obligations: 1.3 }
  },
  {
    id: 52,
    description: "Crise de confiance envers les obligations souveraines.",
    probability: 7,
    impacts: { obligations: 0.75, or: 1.3 }
  },
  {
    id: 53,
    description: "Le crédit devient plus accessible, conditions assouplies.",
    probability: 12,
    impacts: { actions: 1.2, immo: 1.25 }
  },
  {
    id: 54,
    description: "Durcissement des conditions de crédit pour tous.",
    probability: 10,
    impacts: { actions: 0.9, immo: 0.85 }
  },
  {
    id: 55,
    description: "Les banques centrales coordonnent leur action.",
    probability: 11,
    impacts: { actions: 1.15, euro: 1.05 }
  },
  {
    id: 56,
    description: "Divergence des politiques monétaires internationales.",
    probability: 13,
    impacts: { euro: 0.9, or: 1.15 }
  },
  {
    id: 57,
    description: "Les taux réels deviennent fortement négatifs.",
    probability: 9,
    impacts: { euro: 0.8, actions: 1.25, bitcoin: 1.3 }
  },
  {
    id: 58,
    description: "Retour à des taux réels positifs attractifs.",
    probability: 10,
    impacts: { obligations: 1.35, actions: 0.9 }
  },
  {
    id: 59,
    description: "Les spreads de crédit se resserrent significativement.",
    probability: 12,
    impacts: { obligations: 1.2, actions: 1.1 }
  },
  {
    id: 60,
    description: "Les spreads de crédit s'élargissent, risque en hausse.",
    probability: 9,
    impacts: { obligations: 0.85, or: 1.2 }
  },

  // Inflation (15 événements)
  {
    id: 61,
    description: "Inflation stable à 2% par an, objectif de la BCE atteint.",
    probability: 18,
    impacts: { obligations: 1.1 }
  },
  {
    id: 62,
    description: "Inflation à 5% pendant 3 ans, érosion du pouvoir d'achat.",
    probability: 12,
    impacts: { euro: 0.85, or: 1.3, immo: 1.15 }
  },
  {
    id: 63,
    description: "Déflation modérée, prix en baisse de 1% par an.",
    probability: 7,
    impacts: { euro: 1.15, actions: 0.9, or: 0.85 }
  },
  {
    id: 64,
    description: "Poussée inflationniste temporaire liée à l'énergie.",
    probability: 14,
    impacts: { euro: 0.9, or: 1.25 }
  },
  {
    id: 65,
    description: "Inflation maîtrisée grâce à l'efficacité technologique.",
    probability: 13,
    impacts: { actions: 1.2, euro: 1.05 }
  },
  {
    id: 66,
    description: "Hausse des prix de l'alimentation de 40% en 5 ans.",
    probability: 10,
    impacts: { euro: 0.85, immo: 0.95 }
  },
  {
    id: 67,
    description: "Stabilité des prix, environnement économique prévisible.",
    probability: 16,
    impacts: { obligations: 1.15, euro: 1.05 }
  },
  {
    id: 68,
    description: "Inflation importée via la hausse du dollar.",
    probability: 11,
    impacts: { euro: 0.9, or: 1.2 }
  },
  {
    id: 69,
    description: "Les salaires augmentent plus vite que l'inflation.",
    probability: 12,
    impacts: { actions: 1.2, immo: 1.15 }
  },
  {
    id: 70,
    description: "Stagnation des salaires malgré l'inflation.",
    probability: 13,
    impacts: { euro: 0.9, or: 1.15 }
  },
  {
    id: 71,
    description: "Anticipations d'inflation bien ancrées à 2%.",
    probability: 15,
    impacts: { obligations: 1.1 }
  },
  {
    id: 72,
    description: "Perte d'ancrage des anticipations d'inflation.",
    probability: 8,
    impacts: { obligations: 0.85, or: 1.25 }
  },
  {
    id: 73,
    description: "Guerre des prix dans la distribution, désinflation.",
    probability: 11,
    impacts: { euro: 1.1, actions: 0.95 }
  },
  {
    id: 74,
    description: "Cartels et ententes, hausse artificielle des prix.",
    probability: 6,
    impacts: { euro: 0.85, actions: 1.15 }
  },
  {
    id: 75,
    description: "Indexation généralisée des salaires sur l'inflation.",
    probability: 9,
    impacts: { euro: 0.9, immo: 1.1, actions: 1.05 }
  },

  // Bourse et actions (15 événements)
  {
    id: 76,
    description: "Le CAC 40 progresse de 50% en 5 ans.",
    probability: 12,
    impacts: { actions: 1.5 }
  },
  {
    id: 77,
    description: "Le CAC 40 stagne pendant 5 ans.",
    probability: 14,
    impacts: { actions: 1.0 }
  },
  {
    id: 78,
    description: "Correction boursière de 30% puis rebond.",
    probability: 10,
    impacts: { actions: 0.85, or: 1.2 }
  },
  {
    id: 79,
    description: "Les entreprises du CAC 40 versent des dividendes record.",
    probability: 13,
    impacts: { actions: 1.25 }
  },
  {
    id: 80,
    description: "Les entreprises réduisent massivement leurs dividendes.",
    probability: 8,
    impacts: { actions: 0.8 }
  },
  {
    id: 81,
    description: "Vague de rachats d'actions, valorisations en hausse.",
    probability: 11,
    impacts: { actions: 1.3 }
  },
  {
    id: 82,
    description: "Augmentations de capital massives, dilution des actionnaires.",
    probability: 7,
    impacts: { actions: 0.85 }
  },
  {
    id: 83,
    description: "Les valeurs technologiques françaises explosent.",
    probability: 12,
    impacts: { actions: 1.4 }
  },
  {
    id: 84,
    description: "Rotation sectorielle, les valeurs de rendement dominent.",
    probability: 11,
    impacts: { actions: 1.1, obligations: 1.15 }
  },
  {
    id: 85,
    description: "Les petites capitalisations surperforment le CAC 40.",
    probability: 10,
    impacts: { actions: 1.3 }
  },
  {
    id: 86,
    description: "Krach des valeurs de croissance, retour aux fondamentaux.",
    probability: 8,
    impacts: { actions: 0.8 }
  },
  {
    id: 87,
    description: "Les investisseurs institutionnels augmentent leur exposition actions.",
    probability: 12,
    impacts: { actions: 1.25 }
  },
  {
    id: 88,
    description: "Fuite massive des investisseurs particuliers de la bourse.",
    probability: 7,
    impacts: { actions: 0.85 }
  },
  {
    id: 89,
    description: "L'épargne retraite est massivement investie en actions.",
    probability: 11,
    impacts: { actions: 1.3 }
  },
  {
    id: 90,
    description: "Les entreprises françaises multiplient les acquisitions.",
    probability: 13,
    impacts: { actions: 1.2 }
  },

  // Technologie et innovation (15 événements)
  {
    id: 91,
    description: "L'IA révolutionne la productivité des entreprises françaises.",
    probability: 15,
    impacts: { actions: 1.3 }
  },
  {
    id: 92,
    description: "La France devient un hub européen de la tech.",
    probability: 10,
    impacts: { actions: 1.4, immo: 1.2 }
  },
  {
    id: 93,
    description: "Les GAFAM investissent massivement en France.",
    probability: 11,
    impacts: { actions: 1.25, immo: 1.15 }
  },
  {
    id: 94,
    description: "Percée française dans les semi-conducteurs.",
    probability: 8,
    impacts: { actions: 1.35 }
  },
  {
    id: 95,
    description: "La 5G se généralise, boom des services connectés.",
    probability: 16,
    impacts: { actions: 1.2 }
  },
  {
    id: 96,
    description: "Cyberattaque massive, perte de confiance dans le numérique.",
    probability: 7,
    impacts: { actions: 0.85, bitcoin: 0.8 }
  },
  {
    id: 97,
    description: "La voiture autonome se démocratise en France.",
    probability: 9,
    impacts: { actions: 1.3, immo: 0.95 }
  },
  {
    id: 98,
    description: "L'impression 3D bouleverse l'industrie manufacturière.",
    probability: 10,
    impacts: { actions: 1.25 }
  },
  {
    id: 99,
    description: "La blockchain s'impose dans la finance traditionnelle.",
    probability: 12,
    impacts: { bitcoin: 1.4, actions: 1.15 }
  },
  {
    id: 100,
    description: "Réglementation stricte de l'IA, ralentissement de l'innovation.",
    probability: 9,
    impacts: { actions: 0.9 }
  },
  {
    id: 101,
    description: "Les startups françaises lèvent des fonds records.",
    probability: 13,
    impacts: { actions: 1.3 }
  },
  {
    id: 102,
    description: "Éclatement de la bulle tech, faillites en cascade.",
    probability: 6,
    impacts: { actions: 0.75, bitcoin: 0.7 }
  },
  {
    id: 103,
    description: "La France lance son plan quantique national.",
    probability: 11,
    impacts: { actions: 1.2 }
  },
  {
    id: 104,
    description: "Révolution dans les batteries, boom des véhicules électriques.",
    probability: 12,
    impacts: { actions: 1.35 }
  },
  {
    id: 105,
    description: "Les plateformes numériques sont démembrées par régulation.",
    probability: 8,
    impacts: { actions: 0.85 }
  },

  // Énergie et environnement (20 événements)
  {
    id: 106,
    description: "La France réussit sa transition énergétique.",
    probability: 13,
    impacts: { actions: 1.25, immo: 1.15 }
  },
  {
    id: 107,
    description: "Le prix du pétrole monte à 150$ le baril.",
    probability: 9,
    impacts: { euro: 0.85, actions: 0.9, or: 1.3 }
  },
  {
    id: 108,
    description: "Le prix du pétrole chute à 30$ le baril durablement.",
    probability: 8,
    impacts: { euro: 1.1, actions: 1.15, or: 0.9 }
  },
  {
    id: 109,
    description: "Les énergies renouvelables deviennent moins chères que le fossile.",
    probability: 14,
    impacts: { actions: 1.2, immo: 1.1 }
  },
  {
    id: 110,
    description: "Fusion nucléaire commerciale réussie.",
    probability: 5,
    impacts: { actions: 1.5, euro: 1.1 }
  },
  {
    id: 111,
    description: "Crise énergétique majeure, rationnement.",
    probability: 7,
    impacts: { euro: 0.8, actions: 0.75, or: 1.4 }
  },
  {
    id: 112,
    description: "Taxe carbone généralisée en Europe.",
    probability: 12,
    impacts: { actions: 0.9, or: 1.1, obligations: 1.05 }
  },
  {
    id: 113,
    description: "Les SUV sont interdits en ville, marché auto bouleversé.",
    probability: 9,
    impacts: { actions: 0.85 }
  },
  {
    id: 114,
    description: "Le nucléaire français est relancé massivement.",
    probability: 11,
    impacts: { actions: 1.2, obligations: 0.95 }
  },
  {
    id: 115,
    description: "Fermeture de toutes les centrales nucléaires françaises.",
    probability: 6,
    impacts: { actions: 0.8, euro: 0.9 }
  },
  {
    id: 116,
    description: "L'hydrogène vert devient la norme dans les transports.",
    probability: 10,
    impacts: { actions: 1.3 }
  },
  {
    id: 117,
    description: "Canicules record, climatisation obligatoire partout.",
    probability: 15,
    impacts: { immo: 0.9, actions: 1.1 }
  },
  {
    id: 118,
    description: "Hiver polaire exceptionnel, demande énergétique explosive.",
    probability: 8,
    impacts: { euro: 0.9, actions: 0.95, or: 1.15 }
  },
  {
    id: 119,
    description: "La France atteint la neutralité carbone en avance.",
    probability: 7,
    impacts: { actions: 1.25, obligations: 1.1 }
  },
  {
    id: 120,
    description: "Échec de la COP, abandon des objectifs climatiques.",
    probability: 10,
    impacts: { actions: 1.1, or: 1.2 }
  },
  {
    id: 121,
    description: "Les émissions de CO2 sont taxées lourdement.",
    probability: 12,
    impacts: { actions: 0.85, obligations: 1.1 }
  },
  {
    id: 122,
    description: "Subventions massives pour la rénovation énergétique.",
    probability: 13,
    impacts: { immo: 1.2, actions: 1.15 }
  },
  {
    id: 123,
    description: "Les passoires thermiques sont interdites à la location.",
    probability: 14,
    impacts: { immo: 0.85 }
  },
  {
    id: 124,
    description: "Les panneaux solaires deviennent obligatoires sur les toits.",
    probability: 11,
    impacts: { immo: 0.9, actions: 1.15 }
  },
  {
    id: 125,
    description: "Découverte d'un gisement de gaz géant en Méditerranée.",
    probability: 6,
    impacts: { euro: 1.15, actions: 1.25 }
  },

  // ============================================================
  // ÉVÉNEMENTS RARES (40 événements, proba 1-5%)
  // ============================================================

  // Géopolitique (10 événements)
  {
    id: 126,
    description: "Conflit armé majeur en Europe de l'Est.",
    probability: 3,
    impacts: { actions: 0.6, or: 2.0, bitcoin: 1.5 }
  },
  {
    id: 127,
    description: "La Chine envahit Taïwan, guerre commerciale mondiale.",
    probability: 2,
    impacts: { actions: 0.5, or: 2.5, euro: 0.8 }
  },
  {
    id: 128,
    description: "Guerre du Moyen-Orient, prix du pétrole x3.",
    probability: 4,
    impacts: { euro: 0.7, actions: 0.65, or: 2.3 }
  },
  {
    id: 129,
    description: "Paix mondiale durable, désarmement généralisé.",
    probability: 2,
    impacts: { actions: 1.6, immo: 1.4, or: 0.7 }
  },
  {
    id: 130,
    description: "Les États-Unis se retirent de l'OTAN.",
    probability: 3,
    impacts: { euro: 0.75, or: 1.8, actions: 0.7 }
  },
  {
    id: 131,
    description: "Création d'une armée européenne unifiée.",
    probability: 4,
    impacts: { euro: 1.3, actions: 1.25, obligations: 0.9 }
  },
  {
    id: 132,
    description: "Révolution politique en Russie, ouverture démocratique.",
    probability: 3,
    impacts: { actions: 1.5, euro: 1.2 }
  },
  {
    id: 133,
    description: "Embargo total sur la Chine par l'Occident.",
    probability: 2,
    impacts: { actions: 0.6, euro: 0.8, or: 1.9 }
  },
  {
    id: 134,
    description: "Alliance stratégique France-Royaume-Uni post-Brexit.",
    probability: 4,
    impacts: { euro: 1.15, actions: 1.3 }
  },
  {
    id: 135,
    description: "Terrorisme de masse en Europe, état d'urgence permanent.",
    probability: 3,
    impacts: { actions: 0.65, or: 1.7, euro: 0.85 }
  },

  // Politique intérieure (10 événements)
  {
    id: 136,
    description: "La France sort de l'Union Européenne.",
    probability: 2,
    impacts: { euro: 0.5, actions: 0.6, or: 2.0 }
  },
  {
    id: 137,
    description: "Réforme fiscale radicale, flat tax à 15%.",
    probability: 3,
    impacts: { actions: 1.5, immo: 1.4 }
  },
  {
    id: 138,
    description: "Impôt sur la fortune rétabli à 3% par an.",
    probability: 4,
    impacts: { immo: 0.7, actions: 0.75, or: 1.4 }
  },
  {
    id: 139,
    description: "Nationalisation des grandes entreprises françaises.",
    probability: 2,
    impacts: { actions: 0.5, obligations: 0.7, or: 1.8 }
  },
  {
    id: 140,
    description: "Privatisation massive des services publics.",
    probability: 3,
    impacts: { actions: 1.4, obligations: 1.2 }
  },
  {
    id: 141,
    description: "Revenu universel de base instauré en France.",
    probability: 3,
    impacts: { euro: 0.8, actions: 0.85, obligations: 0.9 }
  },
  {
    id: 142,
    description: "Retraite à 70 ans, choc démographique.",
    probability: 4,
    impacts: { obligations: 1.3, actions: 1.2 }
  },
  {
    id: 143,
    description: "Suppression de tous les impôts sur les successions.",
    probability: 3,
    impacts: { immo: 1.5, actions: 1.3 }
  },
  {
    id: 144,
    description: "Semaine de 4 jours obligatoire, productivité en question.",
    probability: 4,
    impacts: { actions: 0.8, obligations: 1.1 }
  },
  {
    id: 145,
    description: "La France devient une république numérique décentralisée.",
    probability: 2,
    impacts: { bitcoin: 2.0, actions: 1.3 }
  },

  // Santé (8 événements)
  {
    id: 146,
    description: "Nouvelle pandémie mondiale pire que le COVID-19.",
    probability: 3,
    impacts: { actions: 0.5, immo: 0.65, or: 2.0 }
  },
  {
    id: 147,
    description: "Cure contre le cancer découverte en France.",
    probability: 2,
    impacts: { actions: 1.8, euro: 1.2 }
  },
  {
    id: 148,
    description: "L'espérance de vie atteint 100 ans en moyenne.",
    probability: 3,
    impacts: { immo: 1.4, obligations: 0.8, actions: 1.3 }
  },
  {
    id: 149,
    description: "Effondrement du système de santé français.",
    probability: 2,
    impacts: { actions: 0.7, or: 1.5, euro: 0.85 }
  },
  {
    id: 150,
    description: "Les maladies chroniques sont éradiquées par thérapie génique.",
    probability: 2,
    impacts: { actions: 1.6 }
  },
  {
    id: 151,
    description: "Épidémie de résistance aux antibiotiques.",
    probability: 4,
    impacts: { actions: 0.75, or: 1.4 }
  },
  {
    id: 152,
    description: "La médecine personnalisée devient accessible à tous.",
    probability: 3,
    impacts: { actions: 1.4 }
  },
  {
    id: 153,
    description: "Crise des opioïdes à la française.",
    probability: 2,
    impacts: { actions: 0.8, obligations: 1.1 }
  },

  // Système financier (12 événements)
  {
    id: 154,
    description: "Crise bancaire systémique en Europe.",
    probability: 3,
    impacts: { actions: 0.4, obligations: 0.5, or: 2.5 }
  },
  {
    id: 155,
    description: "La plus grande banque française fait faillite.",
    probability: 2,
    impacts: { actions: 0.6, euro: 0.75, or: 1.8 }
  },
  {
    id: 156,
    description: "Krach obligataire historique, taux à 15%.",
    probability: 2,
    impacts: { obligations: 0.3, or: 2.0, bitcoin: 1.8 }
  },
  {
    id: 157,
    description: "L'euro devient la monnaie mondiale de réserve principale.",
    probability: 3,
    impacts: { euro: 1.5, actions: 1.4, obligations: 1.3 }
  },
  {
    id: 158,
    description: "L'euro explose, retour aux monnaies nationales.",
    probability: 2,
    impacts: { euro: 0.4, or: 2.5, bitcoin: 2.0 }
  },
  {
    id: 159,
    description: "Les banques centrales adoptent le Bitcoin comme réserve.",
    probability: 2,
    impacts: { bitcoin: 5.0, or: 0.6 }
  },
  {
    id: 160,
    description: "Interdiction totale des cryptomonnaies en Europe.",
    probability: 3,
    impacts: { bitcoin: 0.1, or: 1.4 }
  },
  {
    id: 161,
    description: "Un euro numérique remplace le cash.",
    probability: 4,
    impacts: { bitcoin: 0.7, euro: 1.2 }
  },
  {
    id: 162,
    description: "Crise de la dette souveraine française.",
    probability: 3,
    impacts: { obligations: 0.5, actions: 0.65, or: 1.9 }
  },
  {
    id: 163,
    description: "La France rembourse toute sa dette publique.",
    probability: 1,
    impacts: { obligations: 1.5, actions: 1.4, euro: 1.3 }
  },
  {
    id: 164,
    description: "Effacement de la dette COVID par les banques centrales.",
    probability: 3,
    impacts: { obligations: 1.4, actions: 1.3, euro: 0.85 }
  },
  {
    id: 165,
    description: "Les hedge funds s'effondrent suite à GameStop 2.0.",
    probability: 4,
    impacts: { actions: 0.7, bitcoin: 1.5 }
  },

  // ============================================================
  // ÉVÉNEMENTS BLACK SWAN (20 événements, proba 0.1-1%)
  // ============================================================

  {
    id: 166,
    description: "Un astéroïde rase la Terre, panique mondiale généralisée.",
    probability: 0.5,
    impacts: { or: 3.0, bitcoin: 0.3, actions: 0.4 }
  },
  {
    id: 167,
    description: "Des extraterrestres atterrissent à Paris et apportent une technologie révolutionnaire.",
    probability: 0.1,
    impacts: { bitcoin: 5.0, actions: 3.0, or: 0.2 }
  },
  {
    id: 168,
    description: "Supervolcan en Italie, l'Europe est paralysée pendant 5 ans.",
    probability: 0.3,
    impacts: { euro: 0.3, actions: 0.2, or: 4.0 }
  },
  {
    id: 169,
    description: "L'IA devient consciente et prend le contrôle de l'économie mondiale.",
    probability: 0.5,
    impacts: { bitcoin: 10.0, actions: 0.5, euro: 0.4 }
  },
  {
    id: 170,
    description: "Découverte d'une île remplie d'or pur en Bretagne.",
    probability: 0.2,
    impacts: { or: 0.1, immo: 2.0 }
  },
  {
    id: 171,
    description: "La baguette devient officiellement une monnaie d'échange internationale.",
    probability: 0.1,
    impacts: { euro: 0.1, immo: 1.5, bitcoin: 0.5 }
  },
  {
    id: 172,
    description: "Le vin français est déclaré remède miracle contre toutes maladies.",
    probability: 0.3,
    impacts: { actions: 3.0, euro: 1.8 }
  },
  {
    id: 173,
    description: "Tremblement de terre dévastateur détruit Paris.",
    probability: 0.2,
    impacts: { immo: 0.2, actions: 0.4, or: 3.0 }
  },
  {
    id: 174,
    description: "Tempête solaire massive, tous les systèmes électroniques détruits.",
    probability: 0.5,
    impacts: { bitcoin: 0.05, euro: 0.5, or: 5.0 }
  },
  {
    id: 175,
    description: "Immortalité découverte, bouleversement total de l'économie.",
    probability: 0.1,
    impacts: { immo: 3.0, actions: 2.5, obligations: 0.3 }
  },
  {
    id: 176,
    description: "Les NFTs de photos de chat valent 1000 milliards d'euros.",
    probability: 0.8,
    impacts: { bitcoin: 4.0, actions: 0.7 }
  },
  {
    id: 177,
    description: "La France découvre comment créer de l'or par fusion froide.",
    probability: 0.2,
    impacts: { or: 0.05, actions: 2.0 }
  },
  {
    id: 178,
    description: "Révolution quantique, tous les cryptages sont brisés.",
    probability: 0.6,
    impacts: { bitcoin: 0.1, euro: 0.6, or: 2.5 }
  },
  {
    id: 179,
    description: "Téléportation commerciale inventée, l'immobilier n'a plus de sens.",
    probability: 0.3,
    impacts: { immo: 0.1, actions: 2.0 }
  },
  {
    id: 180,
    description: "Une machine à voyager dans le temps provoque un paradoxe économique.",
    probability: 0.1,
    impacts: { bitcoin: 10.0, euro: 0.2, actions: 5.0 }
  },
  {
    id: 181,
    description: "Le Mont-Blanc s'effondre, catastrophe touristique sans précédent.",
    probability: 0.4,
    impacts: { actions: 0.5, immo: 0.7, or: 1.8 }
  },
  {
    id: 182,
    description: "Tsunami dévastateur sur la Côte d'Azur.",
    probability: 0.3,
    impacts: { immo: 0.3, actions: 0.6, or: 2.0 }
  },
  {
    id: 183,
    description: "La Tour Eiffel s'écroule, choc psychologique mondial.",
    probability: 0.2,
    impacts: { actions: 0.6, euro: 0.75, or: 1.6 }
  },
  {
    id: 184,
    description: "Invasion de criquets géants, agriculture française anéantie.",
    probability: 0.5,
    impacts: { euro: 0.5, actions: 0.4, or: 2.2 }
  },
  {
    id: 185,
    description: "Le fromage français est interdit mondialement pour raisons sanitaires.",
    probability: 0.4,
    impacts: { euro: 0.6, actions: 0.7 }
  },

  // ÉVÉNEMENTS NEUTRES (15 événements pour compléter à 200)
  {
    id: 186,
    description: "5 années paisibles, les marchés suivent leur trajectoire normale.",
    probability: 25,
    impacts: {}
  },
  {
    id: 187,
    description: "Période calme sur les marchés, volatilité très faible.",
    probability: 20,
    impacts: {}
  },
  {
    id: 188,
    description: "Aucun événement marquant, business as usual.",
    probability: 22,
    impacts: {}
  },
  {
    id: 189,
    description: "Les Français partent en vacances, personne ne pense à l'économie.",
    probability: 18,
    impacts: {}
  },
  {
    id: 190,
    description: "L'équipe de France gagne la Coupe du Monde, euphorie mais pas d'impact économique.",
    probability: 15,
    impacts: {}
  },
  {
    id: 191,
    description: "Débat national sur la retraite, beaucoup de bruit mais rien ne change.",
    probability: 16,
    impacts: {}
  },
  {
    id: 192,
    description: "Grève générale pendant 3 mois, puis retour à la normale.",
    probability: 12,
    impacts: {}
  },
  {
    id: 193,
    description: "Le CAC 40 fait du surplace, ennui sur les marchés.",
    probability: 17,
    impacts: {}
  },
  {
    id: 194,
    description: "Réforme annoncée puis abandonnée, status quo.",
    probability: 14,
    impacts: {}
  },
  {
    id: 195,
    description: "Les économistes se trompent dans toutes leurs prévisions, mais ça ne change rien.",
    probability: 13,
    impacts: {}
  },
  {
    id: 196,
    description: "Scandale politique majeur mais sans conséquence économique.",
    probability: 11,
    impacts: {}
  },
  {
    id: 197,
    description: "Canicule en été, tout le monde s'y attendait.",
    probability: 19,
    impacts: {}
  },
  {
    id: 198,
    description: "Les JO se déroulent parfaitement, impact économique nul.",
    probability: 10,
    impacts: {}
  },
  {
    id: 199,
    description: "Nouvelle mode éphémère, tout le monde s'en fiche déjà.",
    probability: 12,
    impacts: {}
  },
  {
    id: 200,
    description: "Un nouveau philosophe fait sensation, zéro impact sur vos finances.",
    probability: 11,
    impacts: {}
  }
];

/**
 * Fonction pour analyser l'équilibre des impacts sur les actifs
 * Vérifie que chaque actif n'est pas favorisé ou défavorisé
 */
export function analyzeAssetBalance() {
  const assetStats = {
    euro: { positive: 0, negative: 0, neutral: 0, totalImpact: 0 },
    immo: { positive: 0, negative: 0, neutral: 0, totalImpact: 0 },
    actions: { positive: 0, negative: 0, neutral: 0, totalImpact: 0 },
    obligations: { positive: 0, negative: 0, neutral: 0, totalImpact: 0 },
    bitcoin: { positive: 0, negative: 0, neutral: 0, totalImpact: 0 },
    or: { positive: 0, negative: 0, neutral: 0, totalImpact: 0 }
  };

  events.forEach(event => {
    if (!event.impacts) return;

    Object.entries(event.impacts).forEach(([asset, multiplier]) => {
      if (multiplier > 1.0) {
        assetStats[asset].positive++;
        assetStats[asset].totalImpact += (multiplier - 1);
      } else if (multiplier < 1.0) {
        assetStats[asset].negative++;
        assetStats[asset].totalImpact += (multiplier - 1);
      } else {
        assetStats[asset].neutral++;
      }
    });
  });

  console.log('\n=== ANALYSE DE L\'ÉQUILIBRE DES ACTIFS ===\n');
  console.log(`Total d'événements: ${events.length}\n`);

  Object.entries(assetStats).forEach(([asset, stats]) => {
    const total = stats.positive + stats.negative + stats.neutral;
    const balance = stats.positive - stats.negative;
    const avgImpact = total > 0 ? (stats.totalImpact / total).toFixed(3) : 0;

    console.log(`${asset.toUpperCase()}:`);
    console.log(`  - Impacts positifs: ${stats.positive}`);
    console.log(`  - Impacts négatifs: ${stats.negative}`);
    console.log(`  - Impacts neutres: ${stats.neutral}`);
    console.log(`  - Balance (pos-neg): ${balance > 0 ? '+' : ''}${balance}`);
    console.log(`  - Impact moyen: ${avgImpact}`);
    console.log('');
  });

  // Analyse par catégorie de probabilité
  const plausible = events.filter(e => e.probability >= 5 && e.probability <= 25).length;
  const rare = events.filter(e => e.probability >= 1 && e.probability < 5).length;
  const blackSwan = events.filter(e => e.probability < 1).length;
  const neutral = events.filter(e => !e.impacts || Object.keys(e.impacts).length === 0).length;

  console.log('=== RÉPARTITION PAR CATÉGORIE ===\n');
  console.log(`Plausibles (5-25%): ${plausible} (objectif: 140, soit 70%)`);
  console.log(`Rares (1-5%): ${rare} (objectif: 40, soit 20%)`);
  console.log(`Black Swan (<1%): ${blackSwan} (objectif: 20, soit 10%)`);
  console.log(`Neutres: ${neutral}`);
  console.log('');

  return assetStats;
}

// Optionnel: exécuter l'analyse au chargement (utile pour debug)
// analyzeAssetBalance();
