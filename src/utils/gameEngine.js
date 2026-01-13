import { assets, assetKeys } from '../data/assets';
import { events } from '../data/events';
import { characters, botStrategies } from '../data/characters';

// Constantes du jeu
export const GAME_CONFIG = {
  TOTAL_ROUNDS: 12,
  YEARS_PER_ROUND: 5,
  STARTING_AGE: 20,
  STARTING_CAPITAL: 10000,
  EVENTS_PER_ROUND: 10
};

/**
 * Sélectionne aléatoirement N événements de la base de données
 */
export function selectRandomEvents(count = GAME_CONFIG.EVENTS_PER_ROUND) {
  const shuffled = [...events].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Détermine quels événements se réalisent selon leurs probabilités
 */
export function determineOccurringEvents(selectedEvents) {
  return selectedEvents.filter(event => {
    const roll = Math.random() * 100;
    return roll < event.probability;
  });
}

/**
 * Calcule la performance d'un actif sur une période de 5 ans
 * @param {string} assetKey - Clé de l'actif (ex: 'bitcoin')
 * @param {Array} occurringEvents - Événements qui se sont produits
 * @returns {number} - Multiplicateur de performance (ex: 1.5 = +50%, 0.8 = -20%)
 */
export function calculateAssetPerformance(assetKey, occurringEvents) {
  const asset = assets[assetKey];

  // Performance de base sur 5 ans avec volatilité
  const baseMultiplier = Math.pow(1 + asset.baseReturn, GAME_CONFIG.YEARS_PER_ROUND);

  // Ajouter la volatilité (distribution normale approximée)
  const randomFactor = (Math.random() - 0.5) * 2; // Entre -1 et 1
  const volatilityImpact = 1 + (randomFactor * asset.volatility);

  let finalMultiplier = baseMultiplier * volatilityImpact;

  // Appliquer les impacts des événements
  occurringEvents.forEach(event => {
    if (event.impacts && event.impacts[assetKey]) {
      finalMultiplier *= event.impacts[assetKey];
    }
  });

  // S'assurer qu'on ne va pas en négatif (minimum 5% de la valeur initiale)
  return Math.max(finalMultiplier, 0.05);
}

/**
 * Calcule les performances de tous les actifs pour le round
 */
export function calculateAllAssetPerformances(occurringEvents) {
  const performances = {};
  assetKeys.forEach(key => {
    performances[key] = calculateAssetPerformance(key, occurringEvents);
  });
  return performances;
}

/**
 * Calcule la nouvelle valeur du portefeuille après un round
 * @param {number} currentValue - Valeur actuelle du portefeuille
 * @param {Object} allocation - Allocation en % (ex: {euro: 50, bitcoin: 50})
 * @param {Object} performances - Performances de chaque actif
 * @returns {number} - Nouvelle valeur du portefeuille
 */
export function calculateNewPortfolioValue(currentValue, allocation, performances) {
  let newValue = 0;

  assetKeys.forEach(key => {
    const allocatedAmount = currentValue * (allocation[key] || 0) / 100;
    const performedAmount = allocatedAmount * performances[key];
    newValue += performedAmount;
  });

  return newValue;
}

/**
 * Valide qu'une allocation respecte les contraintes d'un personnage
 * @param {Object} allocation - Allocation en %
 * @param {Object} character - Personnage avec ses contraintes
 * @returns {Object} - {valid: boolean, errors: Array}
 */
export function validateAllocation(allocation, character) {
  const errors = [];

  // Vérifier que la somme fait 100%
  const total = Object.values(allocation).reduce((sum, val) => sum + val, 0);
  if (Math.abs(total - 100) > 0.01) {
    errors.push(`L'allocation doit faire 100% (actuellement ${total.toFixed(1)}%)`);
  }

  // Vérifier les contraintes du personnage
  if (character.constraints) {
    Object.entries(character.constraints).forEach(([assetKey, constraint]) => {
      const value = allocation[assetKey] || 0;

      if (constraint.min !== undefined && value < constraint.min) {
        errors.push(`${assets[assetKey].name} : minimum ${constraint.min}% requis (vous avez ${value}%)`);
      }

      if (constraint.max !== undefined && value > constraint.max) {
        errors.push(`${assets[assetKey].name} : maximum ${constraint.max}% autorisé (vous avez ${value}%)`);
      }

      if (constraint.exact !== undefined && Math.abs(value - constraint.exact) > 0.01) {
        errors.push(`${assets[assetKey].name} : doit être exactement ${constraint.exact}% (vous avez ${value}%)`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Génère l'allocation d'un bot en fonction de sa personnalité et des événements
 * @param {Object} character - Personnage bot
 * @param {Array} selectedEvents - Événements affichés ce round
 * @param {Object} previousPerformances - Performances du round précédent (pour momentum)
 * @param {Object} previousAllocation - Allocation précédente du bot (pour Mako)
 * @returns {Object} - Allocation en %
 */
export function generateBotAllocation(character, selectedEvents, previousPerformances = null, previousAllocation = null) {
  const strategy = botStrategies[character.personality];
  let allocation = { ...strategy.baseAllocation };

  // Cas spécial : Mako suit les tendances (momentum)
  // Règle : +5% minimum sur l'actif qui a le plus performé au round précédent
  if (character.id === 'mako' && previousPerformances && previousAllocation) {
    // Trouve l'actif qui a le mieux performé
    let bestAsset = null;
    let bestPerf = 0;
    Object.entries(previousPerformances).forEach(([key, perf]) => {
      if (perf > bestPerf) {
        bestPerf = perf;
        bestAsset = key;
      }
    });

    // Mako doit avoir au minimum son allocation précédente + 5% sur cet actif
    if (bestAsset) {
      const previousAlloc = previousAllocation[bestAsset] || 0;
      const minAllocation = Math.min(previousAlloc + 5, 100); // Au moins +5%, max 100%

      // Commence par l'allocation de base
      allocation = { ...strategy.baseAllocation };

      // Force l'allocation minimum sur le meilleur actif
      allocation[bestAsset] = Math.max(allocation[bestAsset] || 0, minAllocation);

      // Rééquilibre les autres actifs
      const remaining = 100 - allocation[bestAsset];
      const otherKeys = assetKeys.filter(k => k !== bestAsset);
      const otherTotal = otherKeys.reduce((sum, k) => sum + (allocation[k] || 0), 0);

      if (otherTotal > 0) {
        otherKeys.forEach(key => {
          allocation[key] = ((allocation[key] || 0) / otherTotal) * remaining;
        });
      }
    }
  }

  // Cas spécial : Boris peut s'enflammer (15% de chance)
  if (character.id === 'boris' && Math.random() < strategy.volatileChance) {
    // Boris fait un coup de folie : all-in sur un actif risqué
    const riskyAssets = ['bitcoin', 'actions'];
    const luckyAsset = riskyAssets[Math.floor(Math.random() * riskyAssets.length)];
    allocation = { euro: 0, immo: 20, actions: 0, obligations: 0, bitcoin: 0, or: 0 };
    allocation[luckyAsset] = 80;
  }

  // Ajuster l'allocation en fonction des probabilités des événements
  selectedEvents.forEach(event => {
    if (!event.impacts) return;

    const eventWeight = event.probability * strategy.riskTolerance / 100;

    Object.entries(event.impacts).forEach(([assetKey, impactMultiplier]) => {
      if (impactMultiplier > 1.5) {
        // Événement très positif : augmenter l'allocation
        allocation[assetKey] = (allocation[assetKey] || 0) + eventWeight * 10;
      } else if (impactMultiplier < 0.7) {
        // Événement très négatif : réduire l'allocation
        allocation[assetKey] = Math.max((allocation[assetKey] || 0) - eventWeight * 10, 0);
      }
    });
  });

  // Normaliser pour que la somme fasse 100%
  const total = Object.values(allocation).reduce((sum, val) => sum + val, 0);
  if (total > 0) {
    Object.keys(allocation).forEach(key => {
      allocation[key] = (allocation[key] / total) * 100;
    });
  }

  // Appliquer les contraintes du personnage
  if (character.constraints) {
    Object.entries(character.constraints).forEach(([assetKey, constraint]) => {
      if (constraint.exact !== undefined) {
        allocation[assetKey] = constraint.exact;
      } else if (constraint.min !== undefined) {
        allocation[assetKey] = Math.max(allocation[assetKey] || 0, constraint.min);
      } else if (constraint.max !== undefined) {
        allocation[assetKey] = Math.min(allocation[assetKey] || 0, constraint.max);
      }
    });

    // Re-normaliser après application des contraintes
    const newTotal = Object.values(allocation).reduce((sum, val) => sum + val, 0);
    if (newTotal > 0 && Math.abs(newTotal - 100) > 0.01) {
      // Ajuster les actifs non contraints
      const unconstrainedKeys = assetKeys.filter(key => {
        const constraint = character.constraints[key];
        return !constraint || (constraint.exact === undefined && constraint.min === undefined);
      });

      const diff = 100 - newTotal;
      const adjustPerKey = diff / unconstrainedKeys.length;

      unconstrainedKeys.forEach(key => {
        allocation[key] = Math.max((allocation[key] || 0) + adjustPerKey, 0);
      });
    }
  }

  // Arrondir à l'entier
  Object.keys(allocation).forEach(key => {
    allocation[key] = Math.round(allocation[key]);
  });

  // S'assurer que la somme fait exactement 100%
  const finalTotal = Object.values(allocation).reduce((sum, val) => sum + val, 0);
  if (finalTotal !== 100) {
    // Ajuster sur le premier actif non contraint
    const unconstrainedKeys = assetKeys.filter(key => {
      const constraint = character.constraints?.[key];
      return !constraint || constraint.exact === undefined;
    });

    if (unconstrainedKeys.length > 0) {
      const diff = 100 - finalTotal;
      allocation[unconstrainedKeys[0]] = Math.max(0, allocation[unconstrainedKeys[0]] + diff);
    }
  }

  return allocation;
}

/**
 * Initialise l'état du jeu pour tous les joueurs
 * @param {string} playerCharacterId - ID du personnage choisi par le joueur
 * @returns {Object} - État initial du jeu
 */
export function initializeGame(playerCharacterId) {
  const allPlayers = characters.map(char => ({
    character: char,
    isPlayer: char.id === playerCharacterId,
    portfolioValue: GAME_CONFIG.STARTING_CAPITAL,
    portfolioHistory: [GAME_CONFIG.STARTING_CAPITAL],
    allocation: null,
    alive: true
  }));

  return {
    round: 1,
    age: GAME_CONFIG.STARTING_AGE,
    players: allPlayers,
    selectedEvents: selectRandomEvents(),
    occurringEvents: [],
    assetPerformances: {},
    previousPerformances: null,
    history: []
  };
}

/**
 * Traite un round complet
 * @param {Object} gameState - État actuel du jeu
 * @param {Object} playerAllocation - Allocation du joueur
 * @returns {Object} - Nouvel état du jeu
 */
export function processRound(gameState, playerAllocation) {
  const { players, selectedEvents, round } = gameState;

  // Déterminer quels événements se produisent
  const occurringEvents = determineOccurringEvents(selectedEvents);

  // Calculer les performances de tous les actifs
  const assetPerformances = calculateAllAssetPerformances(occurringEvents);

  // Générer les allocations des bots
  const updatedPlayers = players.map(player => {
    let allocation;

    if (player.isPlayer) {
      allocation = playerAllocation;
    } else {
      allocation = generateBotAllocation(
        player.character,
        selectedEvents,
        gameState.previousPerformances,
        player.allocation // Passer l'allocation précédente
      );
    }

    // Calculer la nouvelle valeur du portefeuille
    const newValue = calculateNewPortfolioValue(
      player.portfolioValue,
      allocation,
      assetPerformances
    );

    return {
      ...player,
      allocation,
      portfolioValue: newValue,
      portfolioHistory: [...player.portfolioHistory, newValue]
    };
  });

  // Préparer les événements du prochain round
  const nextSelectedEvents = round < GAME_CONFIG.TOTAL_ROUNDS
    ? selectRandomEvents()
    : [];

  return {
    ...gameState,
    round: round + 1,
    age: GAME_CONFIG.STARTING_AGE + round * GAME_CONFIG.YEARS_PER_ROUND,
    players: updatedPlayers,
    selectedEvents: nextSelectedEvents,
    occurringEvents,
    assetPerformances,
    previousPerformances: assetPerformances,
    history: [
      ...gameState.history,
      {
        round,
        occurringEvents,
        assetPerformances,
        players: updatedPlayers.map(p => ({
          characterId: p.character.id,
          portfolioValue: p.portfolioValue,
          allocation: p.allocation
        }))
      }
    ]
  };
}

/**
 * Calcule le classement final
 */
export function getFinalRanking(players) {
  return [...players]
    .sort((a, b) => b.portfolioValue - a.portfolioValue)
    .map((player, index) => ({
      rank: index + 1,
      ...player
    }));
}
