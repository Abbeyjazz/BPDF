// Définition des 8 personnages du jeu

export const characters = [
  {
    id: 'adrien',
    name: 'Adrien',
    emoji: '👨‍💼',
    description: 'Le fan d\'immobilier',
    constraints: {
      immo: { min: 10 } // Minimum 10% en immobilier
    },
    personality: 'balanced', // Pour les bots
    color: '#e74c3c'
  },
  {
    id: 'antoine',
    name: 'Antoine',
    emoji: '🚀',
    description: 'L\'anti-cash radical',
    constraints: {
      euro: { max: 0 } // 0% en euros (pas le droit)
    },
    personality: 'aggressive',
    color: '#3498db'
  },
  {
    id: 'boris',
    name: 'Boris',
    emoji: '🛡️',
    description: 'Le prudent qui craque parfois',
    constraints: {},
    personality: 'conservative', // Prudent mais s'enflamme
    color: '#2ecc71'
  },
  {
    id: 'jason',
    name: 'Jason',
    emoji: '₿',
    description: 'Le crypto-believer',
    constraints: {
      bitcoin: { min: 1 } // Minimum 1% en Bitcoin
    },
    personality: 'crypto-fan',
    color: '#f39c12'
  },
  {
    id: 'jb',
    name: 'JB',
    emoji: '🏦',
    description: 'Le très prudent',
    constraints: {},
    personality: 'very-conservative',
    color: '#9b59b6'
  },
  {
    id: 'mako',
    name: 'Mako',
    emoji: '📊',
    description: 'L\'acheteur de tendances',
    constraints: {},
    personality: 'momentum', // Achète ce qui a pumpé
    color: '#1abc9c'
  },
  {
    id: 'maxime',
    name: 'Maxime',
    emoji: '🦈',
    description: 'Le requin qui prend des risques',
    constraints: {},
    personality: 'aggressive',
    color: '#e67e22'
  },
  {
    id: 'regio',
    name: 'Regio',
    emoji: '⚖️',
    description: 'L\'équilibré crypto',
    constraints: {
      bitcoin: { exact: 5 } // Toujours exactement 5% en crypto
    },
    personality: 'balanced',
    color: '#34495e'
  }
];

// Stratégies des bots selon leur personnalité
export const botStrategies = {
  'very-conservative': {
    // JB : très prudent
    baseAllocation: {
      euro: 20,
      obligations: 40,
      immo: 25,
      actions: 10,
      or: 5,
      bitcoin: 0
    },
    riskTolerance: 0.3 // Faible tolérance au risque
  },
  'conservative': {
    // Boris : prudent mais craque parfois
    baseAllocation: {
      euro: 10,
      obligations: 25,
      immo: 30,
      actions: 20,
      or: 10,
      bitcoin: 5
    },
    riskTolerance: 0.5,
    volatileChance: 0.15 // 15% de chance de faire un coup fou
  },
  'balanced': {
    // Adrien, Regio : équilibrés
    baseAllocation: {
      euro: 10,
      obligations: 20,
      immo: 25,
      actions: 30,
      or: 10,
      bitcoin: 5
    },
    riskTolerance: 0.6
  },
  'aggressive': {
    // Antoine, Maxime : preneurs de risques
    baseAllocation: {
      euro: 0,
      obligations: 10,
      immo: 15,
      actions: 45,
      or: 5,
      bitcoin: 25
    },
    riskTolerance: 0.85
  },
  'crypto-fan': {
    // Jason : crypto-believer
    baseAllocation: {
      euro: 5,
      obligations: 10,
      immo: 15,
      actions: 25,
      or: 5,
      bitcoin: 40
    },
    riskTolerance: 0.8
  },
  'momentum': {
    // Mako : suit les tendances
    baseAllocation: {
      euro: 5,
      obligations: 15,
      immo: 20,
      actions: 30,
      or: 10,
      bitcoin: 20
    },
    riskTolerance: 0.7,
    followTrends: true // Achète ce qui a performé au round précédent
  }
};
