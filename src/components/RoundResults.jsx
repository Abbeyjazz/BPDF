import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { assets, assetKeys } from '../data/assets';
import { GAME_CONFIG } from '../utils/gameEngine';
import './RoundResults.css';

// Composant custom pour afficher l'emoji à la fin de chaque ligne
const CustomizedDot = (props) => {
  const { cx, cy, payload, dataKey, emoji, isLast } = props;

  if (!isLast) {
    return null;
  }

  return (
    <g>
      <circle cx={cx} cy={cy} r={14} fill="white" stroke="#333" strokeWidth={2} />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="18"
      >
        {emoji}
      </text>
    </g>
  );
};

function RoundResults({ round, results, onContinue, isGameOver, game }) {
  const { occurringEvents, assetPerformances, players } = results;
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Trier les joueurs par valeur de portfolio
  const sortedPlayers = [...players].sort((a, b) => b.portfolioValue - a.portfolioValue);

  // Calculer les perfs
  const playersWithPerf = sortedPlayers.map(player => {
    const previousValue = player.portfolioHistory[player.portfolioHistory.length - 2] || GAME_CONFIG.STARTING_CAPITAL;
    const currentValue = player.portfolioValue;
    const roundPerf = ((currentValue - previousValue) / previousValue) * 100;
    const totalPerf = ((currentValue - GAME_CONFIG.STARTING_CAPITAL) / GAME_CONFIG.STARTING_CAPITAL) * 100;

    return {
      ...player,
      roundPerf,
      totalPerf,
      previousValue
    };
  });

  // Préparer les données pour le graphe
  const chartData = [];
  const maxRound = Math.max(...players.map(p => p.portfolioHistory.length)) - 1;

  for (let i = 0; i <= maxRound; i++) {
    const dataPoint = {
      round: i,
      age: GAME_CONFIG.STARTING_AGE + i * GAME_CONFIG.YEARS_PER_ROUND
    };

    players.forEach(p => {
      dataPoint[p.character.name] = Math.round(p.portfolioHistory[i] || 0);
    });

    chartData.push(dataPoint);
  }

  const getImpactDescription = (impacts) => {
    if (!impacts || Object.keys(impacts).length === 0) {
      return 'Aucun impact direct';
    }

    return Object.entries(impacts).map(([assetKey, multiplier]) => {
      const asset = assets[assetKey];
      const change = ((multiplier - 1) * 100).toFixed(0);
      const sign = multiplier > 1 ? '+' : '';
      return `${asset.emoji} ${asset.name} ${sign}${change}%`;
    }).join(' • ');
  };

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
                  <div className="event-impact-reminder">
                    💥 Impact : {getImpactDescription(event.impacts)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Performances des actifs en tableau */}
        <section className="results-section">
          <h2>📈 Performances des Actifs</h2>
          <table className="asset-perf-table">
            <thead>
              <tr>
                <th>Actif</th>
                <th>Perf %</th>
                <th>Investi</th>
                <th>Gain/Perte</th>
              </tr>
            </thead>
            <tbody>
              {assetKeys.map(key => {
                const asset = assets[key];
                const perf = assetPerformances[key];
                const change = ((perf - 1) * 100).toFixed(1);
                const isPositive = perf >= 1;

                // Calculer pour le joueur
                const player = playersWithPerf.find(p => p.isPlayer);
                const allocation = player.allocation || {};
                const invested = Math.round((player.previousValue * (allocation[key] || 0)) / 100);
                const gainLoss = Math.round(invested * (perf - 1));

                return (
                  <tr key={key}>
                    <td className="asset-cell">
                      {asset.emoji} {asset.name}
                    </td>
                    <td className={`perf-cell ${isPositive ? 'positive' : 'negative'}`}>
                      {isPositive ? '+' : ''}{change}%
                    </td>
                    <td className="invested-cell">
                      {invested.toLocaleString('fr-FR')}€
                    </td>
                    <td className={`gain-cell ${gainLoss >= 0 ? 'positive' : 'negative'}`}>
                      {gainLoss >= 0 ? '+' : ''}{gainLoss.toLocaleString('fr-FR')}€
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Graphe d'évolution */}
        <section className="results-section">
          <h2>📊 Évolution des Patrimoines</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="age"
                label={{ value: 'Âge', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                label={{ value: 'Patrimoine (€)', angle: -90, position: 'insideLeft' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value) => `${Math.round(value).toLocaleString('fr-FR')}€`}
                labelFormatter={(age) => `${age} ans`}
              />
              <Legend />
              {players.map(p => (
                <Line
                  key={p.character.id}
                  type="monotone"
                  dataKey={p.character.name}
                  stroke={p.character.color}
                  strokeWidth={p.isPlayer ? 3 : 2}
                  dot={(dotProps) => {
                    const isLast = dotProps.index === chartData.length - 1;
                    return <CustomizedDot {...dotProps} emoji={p.character.emoji} isLast={isLast} />;
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </section>

        {/* Classement avec colonnes de perf */}
        <section className="results-section">
          <h2>🏆 Classement</h2>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rang</th>
                <th>Joueur</th>
                <th>Patrimoine</th>
                <th>Perf Round</th>
                <th>Perf Totale</th>
              </tr>
            </thead>
            <tbody>
              {playersWithPerf.map((player, index) => {
                const isPlayer = player.isPlayer;
                const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';

                return (
                  <tr
                    key={player.character.id}
                    className={`leaderboard-row-table ${isPlayer ? 'is-player' : ''} ${selectedPlayer?.character.id === player.character.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPlayer(selectedPlayer?.character.id === player.character.id ? null : player)}
                    style={{ borderLeftColor: player.character.color }}
                  >
                    <td className="rank-cell">
                      {medal || `#${index + 1}`}
                    </td>
                    <td className="player-cell">
                      <span className="player-emoji-table">{player.character.emoji}</span>
                      <span className="player-name-table">{player.character.name}</span>
                      {isPlayer && <span className="you-badge-table">VOUS</span>}
                    </td>
                    <td className="value-cell">
                      {Math.round(player.portfolioValue).toLocaleString('fr-FR')}€
                    </td>
                    <td className={`perf-round-cell ${player.roundPerf >= 0 ? 'positive' : 'negative'}`}>
                      {player.roundPerf >= 0 ? '+' : ''}{player.roundPerf.toFixed(1)}%
                    </td>
                    <td className={`perf-total-cell ${player.totalPerf >= 0 ? 'positive' : 'negative'}`}>
                      {player.totalPerf >= 0 ? '+' : ''}{player.totalPerf.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Détails du joueur sélectionné */}
          {selectedPlayer && (
            <div className="player-detail-panel">
              <h3>📋 Allocation de {selectedPlayer.character.emoji} {selectedPlayer.character.name}</h3>
              <table className="allocation-detail-table">
                <thead>
                  <tr>
                    <th>Actif</th>
                    <th>Allocation</th>
                    <th>Investi</th>
                    <th>Perf</th>
                    <th>Gain/Perte</th>
                  </tr>
                </thead>
                <tbody>
                  {assetKeys.map(key => {
                    const asset = assets[key];
                    const allocation = selectedPlayer.allocation?.[key] || 0;
                    const invested = Math.round((selectedPlayer.previousValue * allocation) / 100);
                    const perf = assetPerformances[key];
                    const perfPercent = ((perf - 1) * 100).toFixed(1);
                    const gainLoss = Math.round(invested * (perf - 1));

                    if (allocation === 0) return null;

                    return (
                      <tr key={key}>
                        <td>{asset.emoji} {asset.name}</td>
                        <td>{allocation}%</td>
                        <td>{invested.toLocaleString('fr-FR')}€</td>
                        <td className={perf >= 1 ? 'positive' : 'negative'}>
                          {perf >= 1 ? '+' : ''}{perfPercent}%
                        </td>
                        <td className={gainLoss >= 0 ? 'positive' : 'negative'}>
                          {gainLoss >= 0 ? '+' : ''}{gainLoss.toLocaleString('fr-FR')}€
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
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
