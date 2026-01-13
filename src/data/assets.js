// Définition des actifs disponibles dans le jeu

export const assets = {
  euro: {
    name: "Euro",
    emoji: "💶",
    baseReturn: 0, // 0% par an
    volatility: 0.02, // Très faible volatilité (2%)
    description: "Liquidités en euros, protection contre les variations mais pas de rendement"
  },
  immo: {
    name: "Immobilier",
    emoji: "🏠",
    baseReturn: 0.05, // 5% par an
    volatility: 0.10, // Volatilité faible (10%)
    description: "Investissement immobilier en France, rendement stable"
  },
  actions: {
    name: "Actions",
    emoji: "📈",
    baseReturn: 0.07, // 7% par an
    volatility: 0.18, // Volatilité moyenne (18%)
    description: "Actions françaises et européennes, potentiel de croissance élevé"
  },
  obligations: {
    name: "Obligations",
    emoji: "📄",
    baseReturn: 0.03, // 3% par an
    volatility: 0.05, // Très faible volatilité (5%)
    description: "Obligations d'État françaises, sécurité et revenus réguliers"
  },
  bitcoin: {
    name: "Bitcoin",
    emoji: "₿",
    baseReturn: 0.15, // 15% par an (très optimiste !)
    volatility: 0.50, // Très volatile (50% !)
    description: "Cryptomonnaie, potentiel explosif mais très risqué"
  },
  or: {
    name: "Or",
    emoji: "🥇",
    baseReturn: 0.02, // 2% par an
    volatility: 0.12, // Volatilité faible (12%)
    description: "Métal précieux, valeur refuge en temps de crise"
  }
};

// Liste ordonnée des actifs pour l'affichage
export const assetKeys = ['euro', 'immo', 'actions', 'obligations', 'bitcoin', 'or'];
