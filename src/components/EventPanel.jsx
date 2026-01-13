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
              <th>Événement</th>
              <th>Description</th>
              <th>Impact</th>
              <th>Proba</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td className="event-name">{event.title}</td>
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
