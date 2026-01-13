// Définition des 8 personnages du jeu

export const characters = [
  {
    id: 'adrien',
    name: 'Adrien',
    emoji: '👨‍💼',
    description: 'Le fan d\'immobilier',
    constraints: {
      immo: { min: 40 } // Minimum 40% en immobilier
    },
    personality: 'balanced',
    color: '#e74c3c'
  },
  {
    id: 'antoine',
    name: 'Antoine',
    emoji: '🚀',
    description: 'L\'anti-cash et anti-or',
    constraints: {
      actions: { min: 30 }, // Minimum 30% en actions
      or: { max: 0 } // Pas d'or
    },
    personality: 'aggressive',
    color: '#3498db'
  },
  {
    id: 'boris',
    name: 'Boris',
    emoji: '🛡️',
    description: 'Immo et or, les valeurs sûres',
    constraints: {
      immo: { min: 20 }, // Minimum 20% en immobilier
      or: { min: 20 } // Minimum 20% en or
    },
    personality: 'conservative',
    color: '#2ecc71'
  },
  {
    id: 'jason',
    name: 'Jason',
    emoji: '₿',
    description: 'Le crypto-maxi',
    constraints: {
      bitcoin: { min: 30 }, // Minimum 30% en Bitcoin
      immo: { max: 0 } // Pas d'immobilier
    },
    personality: 'crypto-fan',
    color: '#f39c12'
  },
  {
    id: 'jb',
    name: 'JB',
    emoji: '🏦',
    description: 'Le vrai BPF',
    constraints: {
      obligations: { min: 35 } // Minimum 35% en obligations
    },
    personality: 'very-conservative',
    color: '#9b59b6'
  },
  {
    id: 'mako',
    name: 'Mako',
    emoji: '📊',
    description: 'Crypto maxi, pas d\'immo',
    constraints: {
      bitcoin: { min: 20 }, // Minimum 20% en Bitcoin
      immo: { max: 10 } // Maximum 10% en immobilier
    },
    personality: 'momentum',
    color: '#1abc9c'
  },
  {
    id: 'maxime',
    name: 'Maxime',
    emoji: '🦈',
    description: 'Ni Bitcoin ni or',
    constraints: {
      bitcoin: { max: 0 }, // Pas de Bitcoin
      or: { max: 0 } // Pas d'or
    },
    personality: 'aggressive',
    color: '#e67e22'
  },
  {
    id: 'regio',
    name: 'Regio',
    emoji: '⚖️',
    description: 'Bitcoin et or minimum',
    constraints: {
      bitcoin: { min: 15 }, // Minimum 15% en Bitcoin
      or: { min: 15 } // Minimum 15% en or
    },
    personality: 'balanced',
    color: '#34495e'
  }
];

// Stratégies des bots selon leur personnalité
export const botStrategies = {
  'very-conservative': {
    // JB : min 35% obligations
    baseAllocation: {
      euro: 25,
      obligations: 35,
      immo: 20,
      actions: 10,
      or: 10,
      bitcoin: 0
    },
    riskTolerance: 0.3
  },
  'conservative': {
    // Boris : min 20% immo + min 20% or
    baseAllocation: {
      euro: 10,
      obligations: 20,
      immo: 20,
      actions: 25,
      or: 20,
      bitcoin: 5
    },
    riskTolerance: 0.5,
    volatileChance: 0.15 // 15% de chance de faire un coup fou
  },
  'balanced': {
    // Adrien : min 40% immo
    // Regio : min 15% BTC + min 15% or
    // Allocation générique, sera ajustée par contraintes
    baseAllocation: {
      euro: 10,
      obligations: 15,
      immo: 40,
      actions: 15,
      or: 15,
      bitcoin: 5
    },
    riskTolerance: 0.6
  },
  'aggressive': {
    // Antoine : min 30% actions + 0% or
    // Maxime : 0% BTC + 0% or
    baseAllocation: {
      euro: 5,
      obligations: 10,
      immo: 15,
      actions: 50,
      or: 0,
      bitcoin: 20
    },
    riskTolerance: 0.85
  },
  'crypto-fan': {
    // Jason : min 30% BTC + 0% immo
    baseAllocation: {
      euro: 10,
      obligations: 15,
      immo: 0,
      actions: 30,
      or: 15,
      bitcoin: 30
    },
    riskTolerance: 0.8
  },
  'momentum': {
    // Mako : min 20% BTC + max 10% immo
    baseAllocation: {
      euro: 10,
      obligations: 15,
      immo: 10,
      actions: 25,
      or: 20,
      bitcoin: 20
    },
    riskTolerance: 0.7,
    followTrends: true // Achète ce qui a performé au round précédent
  }
};
