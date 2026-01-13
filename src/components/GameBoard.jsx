import { useState } from 'react';
import './GameBoard.css';
import EventPanel from './EventPanel';
import PortfolioAllocation from './PortfolioAllocation';
import RoundResults from './RoundResults';
import { processRound, validateAllocation, GAME_CONFIG } from '../utils/gameEngine';

function GameBoard({ game, setGame, onGameEnd }) {
  const [showResults, setShowResults] = useState(false);
  const [roundResults, setRoundResults] = useState(null);

  const player = game.players.find(p => p.isPlayer);

  const handleAllocationSubmit = (allocation) => {
    // Valider l'allocation
    const validation = validateAllocation(allocation, player.character);

    if (!validation.valid) {
      alert('Allocation invalide :\n' + validation.errors.join('\n'));
      return;
    }

    // Traiter le round
    const newGameState = processRound(game, allocation);

    // Préparer les résultats à afficher
    setRoundResults({
      occurringEvents: newGameState.occurringEvents,
      assetPerformances: newGameState.assetPerformances,
      players: newGameState.players
    });

    setGame(newGameState);
    setShowResults(true);
  };

  const handleContinue = () => {
    setShowResults(false);
    setRoundResults(null);

    // Vérifier si le jeu est terminé
    if (game.round > GAME_CONFIG.TOTAL_ROUNDS) {
      onGameEnd();
    }
  };

  if (showResults && roundResults) {
    return (
      <RoundResults
        round={game.round - 1}
        results={roundResults}
        onContinue={handleContinue}
        isGameOver={game.round > GAME_CONFIG.TOTAL_ROUNDS}
        game={game}
      />
    );
  }

  return (
    <div className="game-board">
      {/* Header avec infos du round */}
      <div className="game-header">
        <div className="round-info">
          <span className="round-label">Round {game.round}/{GAME_CONFIG.TOTAL_ROUNDS}</span>
          <span className="age-label">🎂 {game.age} ans</span>
        </div>
        <div className="player-info">
          <span className="player-name">
            {player.character.emoji} {player.character.name}
          </span>
          <span className="portfolio-value">
            💰 {Math.round(player.portfolioValue).toLocaleString('fr-FR')}€
          </span>
        </div>
      </div>

      {/* Contenu principal : 2 panels côte à côte */}
      <div className="game-content">
        <div className="left-panel">
          <EventPanel events={game.selectedEvents} />
        </div>

        <div className="right-panel">
          <PortfolioAllocation
            character={player.character}
            currentValue={player.portfolioValue}
            onSubmit={handleAllocationSubmit}
            previousAllocation={player.allocation}
          />
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
