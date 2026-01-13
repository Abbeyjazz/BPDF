// Base de données des événements du jeu
// Chaque événement a : id, titre, description, probabilité (%), impacts sur les actifs

export const events = [
  // Événements Bitcoin/Crypto
  {
    id: 1,
    title: "🇫🇷 La France se dote d'une réserve stratégique de Bitcoin",
    description: "Le gouvernement français annonce l'achat de 100 000 BTC pour diversifier ses réserves.",
    probability: 2,
    impacts: { bitcoin: 10.0 } // x10
  },
  {
    id: 2,
    title: "💀 Krach des cryptomonnaies",
    description: "Une faille de sécurité majeure provoque une panique généralisée sur le marché crypto.",
    probability: 8,
    impacts: { bitcoin: 0.2 } // x0.2 = -80%
  },
  {
    id: 3,
    title: "🏦 Les banques françaises adoptent le Bitcoin",
    description: "BNP Paribas, Société Générale et Crédit Agricole proposent des comptes Bitcoin.",
    probability: 5,
    impacts: { bitcoin: 3.0 } // x3
  },

  // Événements Immobilier
  {
    id: 4,
    title: "🏗️ Boom de la construction en Île-de-France",
    description: "Un plan gouvernemental lance la construction de 500 000 logements.",
    probability: 12,
    impacts: { immo: 1.5 } // +50%
  },
  {
    id: 5,
    title: "💥 Crise immobilière : les prix s'effondrent",
    description: "Les taux d'intérêt montent à 8%, le marché immobilier s'écroule.",
    probability: 10,
    impacts: { immo: 0.5 } // -50%
  },
  {
    id: 6,
    title: "🌊 La Côte d'Azur devient le nouveau Monaco",
    description: "L'immobilier de luxe explose sur la Riviera française.",
    probability: 7,
    impacts: { immo: 2.0 } // x2
  },

  // Événements Actions
  {
    id: 7,
    title: "🚀 Le CAC 40 bat tous les records",
    description: "Les entreprises françaises dominent l'Europe, euphorie boursière.",
    probability: 15,
    impacts: { actions: 2.5 } // x2.5
  },
  {
    id: 8,
    title: "📉 Krach boursier mondial",
    description: "Récession globale, les bourses mondiales perdent 60% de leur valeur.",
    probability: 6,
    impacts: { actions: 0.4 } // -60%
  },
  {
    id: 9,
    title: "🇪🇺 L'Union Européenne devient la 1ère puissance économique",
    description: "Le marché unique européen explose, les actions européennes s'envolent.",
    probability: 10,
    impacts: { actions: 1.8 } // +80%
  },

  // Événements Or
  {
    id: 10,
    title: "⚡ Découverte d'un gisement d'or massif en Bretagne",
    description: "Le plus gros gisement d'or d'Europe découvert près de Rennes. Prix de l'or en chute.",
    probability: 3,
    impacts: { or: 0.6 } // -40%
  },
  {
    id: 11,
    title: "💰 L'or devient la valeur refuge ultime",
    description: "Crise géopolitique majeure, tout le monde se rue sur l'or.",
    probability: 12,
    impacts: { or: 2.5 } // x2.5
  },
  {
    id: 12,
    title: "🏅 La Banque de France triple ses réserves d'or",
    description: "Annonce surprise : rachat massif d'or par l'État français.",
    probability: 8,
    impacts: { or: 1.6 } // +60%
  },

  // Événements Euro/Obligations
  {
    id: 13,
    title: "💶 L'euro devient la monnaie mondiale de référence",
    description: "Le dollar perd sa domination, l'euro prend sa place.",
    probability: 4,
    impacts: { euro: 1.3, obligations: 1.4 } // +30% et +40%
  },
  {
    id: 14,
    title: "🔥 Hyperinflation en France",
    description: "L'inflation atteint 25%, votre cash fond comme neige au soleil.",
    probability: 5,
    impacts: { euro: 0.5, obligations: 0.6 } // -50% et -40%
  },
  {
    id: 15,
    title: "🏦 Les taux d'intérêt remontent à 10%",
    description: "Politique monétaire restrictive : les obligations rapportent gros.",
    probability: 8,
    impacts: { obligations: 2.0 } // x2
  },

  // Événements drôles/absurdes
  {
    id: 16,
    title: "🥖 La baguette devient une monnaie d'échange",
    description: "Suite à une crise monétaire, les Français troquent en baguettes. Le cash ne vaut plus rien.",
    probability: 1,
    impacts: { euro: 0.1, immo: 1.3 } // Euro -90%, Immo +30%
  },
  {
    id: 17,
    title: "🍷 Le vin français devient l'actif le plus rentable",
    description: "Les grands crus battent tous les records. Malheureusement, vous n'avez pas investi dedans.",
    probability: 6,
    impacts: {} // Pas d'impact direct
  },
  {
    id: 18,
    title: "👽 Des extraterrestres atterrissent à Paris",
    description: "Ils apportent une technologie qui révolutionne tout. L'économie devient imprévisible.",
    probability: 0.5,
    impacts: { bitcoin: 5.0, actions: 3.0, or: 0.3 } // Crypto et actions explosent, or devient obsolète
  },
  {
    id: 19,
    title: "🎮 Les NFTs de photos de chat valent des milliards",
    description: "Une bulle spéculative sans précédent sur les NFTs félins.",
    probability: 7,
    impacts: { bitcoin: 4.0 } // Les crypto explosent
  },
  {
    id: 20,
    title: "🏴‍☠️ La France légalise la piraterie moderne",
    description: "Le trading haute fréquence devient un sport national, les marchés s'affolent.",
    probability: 3,
    impacts: { actions: 1.5, bitcoin: 2.0 }
  },

  // Événements modérés (plus probables)
  {
    id: 21,
    title: "📊 Croissance économique stable",
    description: "La France connaît 5 ans de croissance régulière à 2% par an.",
    probability: 20,
    impacts: { actions: 1.3, immo: 1.2, obligations: 1.1 } // Tout augmente modérément
  },
  {
    id: 22,
    title: "🌍 Transition énergétique réussie",
    description: "La France devient leader mondial des énergies renouvelables.",
    probability: 15,
    impacts: { actions: 1.4, immo: 1.3 } // Actions vertes et immobilier efficient
  },
  {
    id: 23,
    title: "🏥 Crise sanitaire mondiale",
    description: "Nouvelle pandémie, les marchés chutent mais l'or et les obligations résistent.",
    probability: 8,
    impacts: { actions: 0.7, immo: 0.8, or: 1.5, obligations: 1.3 }
  },
  {
    id: 24,
    title: "🎓 Révolution de l'éducation financière",
    description: "Les Français deviennent experts en finance, les marchés se stabilisent.",
    probability: 10,
    impacts: { actions: 1.2, obligations: 1.15, bitcoin: 1.3 }
  },
  {
    id: 25,
    title: "🚗 La voiture autonome révolutionne la mobilité",
    description: "L'immobilier de banlieue explose, les centres-villes se vident.",
    probability: 12,
    impacts: { immo: 1.4, actions: 1.3 }
  },
  {
    id: 26,
    title: "🤖 L'IA remplace 30% des emplois",
    description: "Chômage de masse, mais productivité en hausse. Marchés volatils.",
    probability: 9,
    impacts: { actions: 1.6, euro: 0.9, obligations: 1.2 }
  },
  {
    id: 27,
    title: "🍔 McDo rachète Carrefour",
    description: "Consolidation du secteur de la grande distribution, le CAC 40 monte.",
    probability: 5,
    impacts: { actions: 1.25 }
  },
  {
    id: 28,
    title: "☀️ Canicules à répétition en France",
    description: "Le marché de la climatisation explose, l'immobilier du Sud chute.",
    probability: 18,
    impacts: { immo: 0.85, actions: 1.15 }
  },
  {
    id: 29,
    title: "🎰 Les Français découvrent les options financières",
    description: "Trading spéculatif de masse, les marchés deviennent ultra volatils.",
    probability: 11,
    impacts: { actions: 1.5, bitcoin: 2.2 }
  },
  {
    id: 30,
    title: "🧘 Rien de spécial ne se passe",
    description: "5 années paisibles, les marchés suivent leur trajectoire normale.",
    probability: 25,
    impacts: {} // Pas d'impact particulier, juste les perfs de base
  }
];
