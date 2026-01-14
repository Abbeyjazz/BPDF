import { assets } from '../data/assets';
import './EventPanel.css';

function EventPanel({ events }) {
  const getImpactDescription = (impacts) => {
    if (!impacts || Object.keys(impacts).length === 0) {
      return 'Aucun';
    }

    return Object.entries(impacts).map(([assetKey, multiplier]) => {
      const asset = assets[assetKey];
      const change = ((multiplier - 1) * 100).toFixed(0);
      const sign = multiplier > 1 ? '+' : '';
      return `${asset.emoji}${sign}${change}%`;
    }).join(' ');
  };

  return (
    <div className="event-panel">
      <h2 className="panel-title">
        📰 Événements Possibles
      </h2>
      <p className="panel-subtitle">
        Ces événements PEUVENT se produire durant les 5 prochaines années
      </p>

      <div className="events-table-container">
        <table className="events-table">
          <thead>
            <tr>
              <th className="desc-col">Description</th>
              <th className="impact-col">Impact</th>
              <th className="proba-col">Proba</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td className="event-desc">{event.description}</td>
                <td className="event-impact">{getImpactDescription(event.impacts)}</td>
                <td className="event-proba">{event.probability}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventPanel;
