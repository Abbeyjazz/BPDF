import { useState, useEffect } from 'react';
import { events as initialEvents, analyzeAssetBalance } from '../data/events';
import { assets } from '../data/assets';
import './AdminPanel.css';

function AdminPanel() {
  const [events, setEvents] = useState(initialEvents);
  const [filter, setFilter] = useState('all'); // all, plausible, rare, blackswan
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id'); // id, probability, description
  const [editingEvent, setEditingEvent] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [assetStats, setAssetStats] = useState(null);

  // Calculer les stats à chaque changement
  useEffect(() => {
    const stats = calculateAssetStats(events);
    setAssetStats(stats);
  }, [events]);

  const calculateAssetStats = (eventList) => {
    const stats = {
      euro: { positive: 0, negative: 0, neutral: 0, totalImpact: 0 },
      immo: { positive: 0, negative: 0, neutral: 0, totalImpact: 0 },
      actions: { positive: 0, negative: 0, neutral: 0, totalImpact: 0 },
      obligations: { positive: 0, negative: 0, neutral: 0, totalImpact: 0 },
      bitcoin: { positive: 0, negative: 0, neutral: 0, totalImpact: 0 },
      or: { positive: 0, negative: 0, neutral: 0, totalImpact: 0 }
    };

    eventList.forEach(event => {
      if (!event.impacts) return;

      Object.entries(event.impacts).forEach(([asset, multiplier]) => {
        if (multiplier > 1.0) {
          stats[asset].positive++;
          stats[asset].totalImpact += (multiplier - 1);
        } else if (multiplier < 1.0) {
          stats[asset].negative++;
          stats[asset].totalImpact += (multiplier - 1);
        } else {
          stats[asset].neutral++;
        }
      });
    });

    return stats;
  };

  const getFilteredEvents = () => {
    let filtered = events;

    // Filtrer par catégorie
    if (filter === 'plausible') {
      filtered = filtered.filter(e => e.probability >= 5 && e.probability <= 25);
    } else if (filter === 'rare') {
      filtered = filtered.filter(e => e.probability >= 1 && e.probability < 5);
    } else if (filter === 'blackswan') {
      filtered = filtered.filter(e => e.probability < 1);
    }

    // Recherche textuelle
    if (searchTerm) {
      filtered = filtered.filter(e =>
        e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.id.toString().includes(searchTerm)
      );
    }

    // Tri
    if (sortBy === 'id') {
      filtered = [...filtered].sort((a, b) => a.id - b.id);
    } else if (sortBy === 'probability') {
      filtered = [...filtered].sort((a, b) => b.probability - a.probability);
    } else if (sortBy === 'description') {
      filtered = [...filtered].sort((a, b) => a.description.localeCompare(b.description));
    }

    return filtered;
  };

  const handleDeleteEvent = (id) => {
    if (confirm('Supprimer cet événement ?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowCreateForm(false);
  };

  const handleCreateNew = () => {
    const newId = Math.max(...events.map(e => e.id)) + 1;
    setEditingEvent({
      id: newId,
      description: '',
      probability: 10,
      impacts: {}
    });
    setShowCreateForm(true);
  };

  const handleSaveEvent = (updatedEvent) => {
    if (showCreateForm) {
      // Nouveau événement
      setEvents([...events, updatedEvent]);
    } else {
      // Mise à jour
      setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    }
    setEditingEvent(null);
    setShowCreateForm(false);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setShowCreateForm(false);
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(events, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `events_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedEvents = JSON.parse(event.target.result);
        if (confirm(`Importer ${importedEvents.length} événements ? Cela remplacera tous les événements actuels.`)) {
          setEvents(importedEvents);
        }
      } catch (error) {
        alert('Erreur lors de l\'import : fichier JSON invalide');
      }
    };
    reader.readAsText(file);
  };

  const getCategoryStats = () => {
    const plausible = events.filter(e => e.probability >= 5 && e.probability <= 25).length;
    const rare = events.filter(e => e.probability >= 1 && e.probability < 5).length;
    const blackSwan = events.filter(e => e.probability < 1).length;
    const neutral = events.filter(e => !e.impacts || Object.keys(e.impacts).length === 0).length;

    return { plausible, rare, blackSwan, neutral };
  };

  const filteredEvents = getFilteredEvents();
  const categoryStats = getCategoryStats();

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🎮 Administration BPDF</h1>
        <div className="admin-actions">
          <button className="btn-primary" onClick={handleCreateNew}>
            ➕ Nouvel événement
          </button>
          <button className="btn-secondary" onClick={handleExportJSON}>
            💾 Exporter JSON
          </button>
          <label className="btn-secondary" style={{ cursor: 'pointer' }}>
            📂 Importer JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              style={{ display: 'none' }}
            />
          </label>
          <a href="/" className="btn-back">← Retour au jeu</a>
        </div>
      </div>

      {/* Stats globales */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{events.length}</div>
            <div className="stat-label">Total événements</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{categoryStats.plausible}</div>
            <div className="stat-label">Plausibles (5-25%)</div>
            <div className="stat-target">Objectif: 140 (70%)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{categoryStats.rare}</div>
            <div className="stat-label">Rares (1-5%)</div>
            <div className="stat-target">Objectif: 40 (20%)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{categoryStats.blackSwan}</div>
            <div className="stat-label">Black Swan (&lt;1%)</div>
            <div className="stat-target">Objectif: 20 (10%)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{categoryStats.neutral}</div>
            <div className="stat-label">Neutres</div>
          </div>
        </div>

        {/* Balance des actifs */}
        {assetStats && (
          <div className="asset-balance">
            <h3>📊 Équilibre des actifs</h3>
            <div className="balance-grid">
              {Object.entries(assetStats).map(([asset, stats]) => {
                const total = stats.positive + stats.negative + stats.neutral;
                const balance = stats.positive - stats.negative;
                const isBalanced = Math.abs(balance) <= 5;

                return (
                  <div key={asset} className={`balance-card ${isBalanced ? 'balanced' : 'unbalanced'}`}>
                    <div className="balance-asset">{assets[asset]?.emoji} {assets[asset]?.name}</div>
                    <div className="balance-stats">
                      <span className="positive">+{stats.positive}</span>
                      <span className="negative">-{stats.negative}</span>
                      <span className={`balance ${balance > 0 ? 'pos' : balance < 0 ? 'neg' : 'neutral'}`}>
                        Balance: {balance > 0 ? '+' : ''}{balance}
                      </span>
                    </div>
                    {!isBalanced && <div className="warning">⚠️ Déséquilibré</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Filtres et recherche */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Catégorie:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Tous ({events.length})</option>
            <option value="plausible">Plausibles ({categoryStats.plausible})</option>
            <option value="rare">Rares ({categoryStats.rare})</option>
            <option value="blackswan">Black Swan ({categoryStats.blackSwan})</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Trier par:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">ID</option>
            <option value="probability">Probabilité</option>
            <option value="description">Description</option>
          </select>
        </div>

        <div className="filter-group search-group">
          <label>Recherche:</label>
          <input
            type="text"
            placeholder="Chercher dans les descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="results-count">
          {filteredEvents.length} événement(s) affiché(s)
        </div>
      </div>

      {/* Formulaire d'édition/création */}
      {editingEvent && (
        <EventForm
          event={editingEvent}
          onSave={handleSaveEvent}
          onCancel={handleCancelEdit}
          isNew={showCreateForm}
        />
      )}

      {/* Liste des événements */}
      <div className="events-list">
        <table className="events-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>ID</th>
              <th style={{ width: '50%' }}>Description</th>
              <th style={{ width: '80px' }}>Proba</th>
              <th style={{ width: '25%' }}>Impacts</th>
              <th style={{ width: '150px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map(event => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.description}</td>
                <td className="proba-cell">{event.probability}%</td>
                <td className="impacts-cell">
                  {event.impacts && Object.keys(event.impacts).length > 0 ? (
                    Object.entries(event.impacts).map(([asset, mult]) => (
                      <span key={asset} className={`impact-badge ${mult > 1 ? 'positive' : 'negative'}`}>
                        {assets[asset]?.emoji} {mult > 1 ? '+' : ''}{((mult - 1) * 100).toFixed(0)}%
                      </span>
                    ))
                  ) : (
                    <span className="no-impact">Neutre</span>
                  )}
                </td>
                <td className="actions-cell">
                  <button className="btn-edit" onClick={() => handleEditEvent(event)}>
                    ✏️ Éditer
                  </button>
                  <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Formulaire d'édition/création d'événement
function EventForm({ event, onSave, onCancel, isNew }) {
  const [formData, setFormData] = useState(event);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImpactChange = (asset, value) => {
    const newImpacts = { ...formData.impacts };
    if (value === '' || value === '1') {
      delete newImpacts[asset];
    } else {
      newImpacts[asset] = parseFloat(value);
    }
    setFormData({ ...formData, impacts: newImpacts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.description.trim()) {
      alert('La description est obligatoire');
      return;
    }
    if (formData.probability < 0 || formData.probability > 100) {
      alert('La probabilité doit être entre 0 et 100');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="event-form-overlay">
      <div className="event-form">
        <h2>{isNew ? '➕ Créer un événement' : '✏️ Éditer l\'événement'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID:</label>
            <input
              type="number"
              value={formData.id}
              disabled
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Description: *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="form-textarea"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>Probabilité (%): *</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={formData.probability}
              onChange={(e) => handleChange('probability', parseFloat(e.target.value))}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Impacts (multiplicateurs):</label>
            <div className="impacts-grid">
              {Object.entries(assets).map(([key, asset]) => (
                <div key={key} className="impact-input-group">
                  <label>{asset.emoji} {asset.name}:</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="1.0 = neutre"
                    value={formData.impacts?.[key] || ''}
                    onChange={(e) => handleImpactChange(key, e.target.value)}
                    className="form-input-small"
                  />
                  <span className="impact-helper">
                    {formData.impacts?.[key] ? (
                      formData.impacts[key] > 1 ? (
                        <span className="pos">+{((formData.impacts[key] - 1) * 100).toFixed(0)}%</span>
                      ) : (
                        <span className="neg">{((formData.impacts[key] - 1) * 100).toFixed(0)}%</span>
                      )
                    ) : (
                      <span className="neutral">-</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">
              💾 Sauvegarder
            </button>
            <button type="button" onClick={onCancel} className="btn-cancel">
              ❌ Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
