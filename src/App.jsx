import { useState } from 'react';
import './App.css';
import CharacterSelect from './components/CharacterSelect';
import GameBoard from './components/GameBoard';
import ResultsScreen from './components/ResultsScreen';
import { initializeGame, GAME_CONFIG } from './utils/gameEngine';

function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'character-select', 'playing', 'results'
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [game, setGame] = useState(null);

  const handleStartGame = () => {
    setGameState('character-select');
  };

  const handleCharacterSelect = (characterId) => {
    setSelectedCharacter(characterId);
    const initialGame = initializeGame(characterId);
    setGame(initialGame);
    setGameState('playing');
  };

  const handleGameEnd = () => {
    setGameState('results');
  };

  const handlePlayAgain = () => {
    setSelectedCharacter(null);
    setGame(null);
    setGameState('menu');
  };

  return (
    <div className="app">
      {gameState === 'menu' && (
        <div className="menu-screen">
          <div className="menu-content">
            <h1 className="game-title">
              <span className="title-emoji">🎩</span>
              BPDF
              <span className="title-emoji">💰</span>
            </h1>
            <h2 className="game-subtitle">Bon Père De Famille</h2>
            <p className="game-description">
              Qui sera le plus riche du cimetière ?
            </p>
            <button className="start-button" onClick={handleStartGame}>
              🎮 Jouer à BPDF
            </button>
            <div className="game-info">
              <p>🎯 {GAME_CONFIG.TOTAL_ROUNDS} rounds • 💶 {GAME_CONFIG.STARTING_CAPITAL}€ de départ • 🎲 8 joueurs</p>
            </div>
          </div>
        </div>
      )}

      {gameState === 'character-select' && (
        <CharacterSelect onSelect={handleCharacterSelect} />
      )}

      {gameState === 'playing' && game && (
        <GameBoard
          game={game}
          setGame={setGame}
          onGameEnd={handleGameEnd}
        />
      )}

      {gameState === 'results' && game && (
        <ResultsScreen game={game} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
}

export default App;
