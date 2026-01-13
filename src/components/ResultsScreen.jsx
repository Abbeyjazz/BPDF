import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getFinalRanking, GAME_CONFIG } from '../utils/gameEngine';
import './ResultsScreen.css';

function ResultsScreen({ game, onPlayAgain }) {
  const finalRanking = getFinalRanking(game.players);
  const winner = finalRanking[0];
  const player = finalRanking.find(p => p.isPlayer);

  // Préparer les données pour le graphe
  const chartData = [];
  for (let round = 0; round <= GAME_CONFIG.TOTAL_ROUNDS; round++) {
    const dataPoint = {
      round,
      age: GAME_CONFIG.STARTING_AGE + round * GAME_CONFIG.YEARS_PER_ROUND
    };

    game.players.forEach(p => {
      dataPoint[p.character.name] = Math.round(p.portfolioHistory[round] || 0);
    });

    chartData.push(dataPoint);
  }

  return (
    <div className="results-screen">
      <div className="final-header">
        <h1>🏁 Résultats Finaux</h1>
        <p className="final-subtitle">De 20 à 80 ans : qui est le meilleur investisseur ?</p>
      </div>

      {/* Podium */}
      <div className="podium">
        {finalRanking.slice(0, 3).map((p, index) => {
          const medals = ['🥇', '🥈', '🥉'];
          const isPlayer = p.isPlayer;

          return (
            <div
              key={p.character.id}
              className={`podium-place place-${index + 1} ${isPlayer ? 'is-player' : ''}`}
              style={{ borderColor: p.character.color }}
            >
              <div className="podium-medal">{medals[index]}</div>
              <div className="podium-emoji">{p.character.emoji}</div>
              <div className="podium-name">{p.character.name}</div>
              {isPlayer && <div className="podium-you">VOUS</div>}
              <div className="podium-value">
                {Math.round(p.portfolioValue).toLocaleString('fr-FR')}€
              </div>
            </div>
          );
        })}
      </div>

      {/* Message personnalisé */}
      <div className="player-result-message">
        {player.rank === 1 && (
          <div className="message victory">
            🎉 <strong>VICTOIRE !</strong> Tu as écrasé la concurrence ! Tu es le meilleur Bon Père De Famille ! 💰
          </div>
        )}
        {player.rank === 2 && (
          <div className="message second">
            💪 Pas mal ! Tu finis 2ème, presque au sommet !
          </div>
        )}
        {player.rank === 3 && (
          <div className="message third">
            👏 Sur le podium ! Pas mal du tout.
          </div>
        )}
        {player.rank > 3 && player.rank <= 5 && (
          <div className="message middle">
            😅 Dans la moyenne. Il faut travailler ta stratégie !
          </div>
        )}
        {player.rank > 5 && (
          <div className="message last">
            💸 Aïe... Tu as fini {player.rank}ème. Retente ta chance !
          </div>
        )}
      </div>

      {/* Graphe d'évolution */}
      <div className="chart-section">
        <h2>📊 Évolution des Patrimoines</h2>
        <ResponsiveContainer width="100%" height={400}>
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
            {game.players.map(p => (
              <Line
                key={p.character.id}
                type="monotone"
                dataKey={p.character.name}
                stroke={p.character.color}
                strokeWidth={p.isPlayer ? 3 : 2}
                dot={p.isPlayer}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Classement complet */}
      <div className="final-ranking">
        <h2>🏆 Classement Final</h2>
        <div className="ranking-table">
          {finalRanking.map(p => {
            const isPlayer = p.isPlayer;
            const profit = p.portfolioValue - GAME_CONFIG.STARTING_CAPITAL;
            const profitPercent = ((profit / GAME_CONFIG.STARTING_CAPITAL) * 100).toFixed(0);

            return (
              <div
                key={p.character.id}
                className={`ranking-row ${isPlayer ? 'is-player' : ''}`}
                style={{ borderLeftColor: p.character.color }}
              >
                <div className="rank-number">#{p.rank}</div>
                <div className="rank-character">
                  <span className="rank-emoji">{p.character.emoji}</span>
                  <span className="rank-name">{p.character.name}</span>
                  {isPlayer && <span className="rank-you">VOUS</span>}
                </div>
                <div className="rank-stats">
                  <div className="rank-value">
                    {Math.round(p.portfolioValue).toLocaleString('fr-FR')}€
                  </div>
                  <div className={`rank-profit ${profit >= 0 ? 'positive' : 'negative'}`}>
                    {profit >= 0 ? '+' : ''}{profitPercent}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="final-footer">
        <button onClick={onPlayAgain} className="play-again-button">
          🔄 Rejouer
        </button>
      </div>
    </div>
  );
}

export default ResultsScreen;
