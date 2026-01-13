import { assets } from '../data/assets';
import './RoundResults.css';

function RoundResults({ round, results, onContinue, isGameOver }) {
  const { occurringEvents, assetPerformances, players } = results;

  // Trier les joueurs par valeur de portfolio
  const sortedPlayers = [...players].sort((a, b) => b.portfolioValue - a.portfolioValue);

  return (
    <div className="round-results">
      <div className="results-header">
        <h1>
          {isGameOver ? '🏁 Fin de la Partie !' : `📊 Résultats du Round ${round}`}
        </h1>
      </div>

      <div className="results-content">
        {/* Événements qui se sont produits */}
        <section className="results-section">
          <h2>🎲 Événements Survenus</h2>
          {occurringEvents.length === 0 ? (
            <p className="no-events">Aucun événement majeur ne s'est produit.</p>
          ) : (
            <div className="occurred-events">
              {occurringEvents.map(event => (
                <div key={event.id} className="occurred-event">
                  <div className="event-title">{event.title}</div>
                  <div className="event-description">{event.description}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Performances des actifs */}
        <section className="results-section">
          <h2>📈 Performances des Actifs</h2>
          <div className="asset-performances">
            {Object.entries(assetPerformances).map(([key, perf]) => {
              const asset = assets[key];
              const change = ((perf - 1) * 100).toFixed(1);
              const isPositive = perf >= 1;

              return (
                <div key={key} className="performance-row">
                  <span className="perf-asset">
                    {asset.emoji} {asset.name}
                  </span>
                  <span className={`perf-value ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '+' : ''}{change}%
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Classement */}
        <section className="results-section">
          <h2>🏆 Classement</h2>
          <div className="leaderboard">
            {sortedPlayers.map((player, index) => {
              const isPlayer = player.isPlayer;
              const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';

              return (
                <div
                  key={player.character.id}
                  className={`leaderboard-row ${isPlayer ? 'is-player' : ''}`}
                  style={{ borderLeftColor: player.character.color }}
                >
                  <div className="rank">
                    {medal || `#${index + 1}`}
                  </div>
                  <div className="player-info-row">
                    <span className="player-emoji">{player.character.emoji}</span>
                    <span className="player-name">{player.character.name}</span>
                    {isPlayer && <span className="you-badge">VOUS</span>}
                  </div>
                  <div className="player-value">
                    {Math.round(player.portfolioValue).toLocaleString('fr-FR')}€
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="results-footer">
        <button onClick={onContinue} className="continue-button">
          {isGameOver ? '🎉 Voir les Résultats Finaux' : '➡️ Continuer'}
        </button>
      </div>
    </div>
  );
}

export default RoundResults;
