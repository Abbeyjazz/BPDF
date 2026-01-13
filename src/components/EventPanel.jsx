import { assets } from '../data/assets';
import './EventPanel.css';

function EventPanel({ events }) {
  const getImpactDescription = (impacts) => {
    if (!impacts || Object.keys(impacts).length === 0) {
      return 'Pas d\'impact direct sur les actifs';
    }

    return Object.entries(impacts).map(([assetKey, multiplier]) => {
      const asset = assets[assetKey];
      const change = ((multiplier - 1) * 100).toFixed(0);
      const emoji = multiplier > 1 ? '📈' : '📉';
      const sign = multiplier > 1 ? '+' : '';

      return `${emoji} ${asset.emoji} ${asset.name} ${sign}${change}%`;
    }).join(' • ');
  };

  return (
    <div className="event-panel">
      <h2 className="panel-title">
        📰 Événements Possibles
      </h2>
      <p className="panel-subtitle">
        Ces événements PEUVENT se produire durant les 5 prochaines années...
      </p>

      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <h3 className="event-title">{event.title}</h3>
              <span className="event-probability">{event.probability}%</span>
            </div>
            <p className="event-description">{event.description}</p>
            <div className="event-impact">
              {getImpactDescription(event.impacts)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventPanel;
