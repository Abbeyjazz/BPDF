import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { assets, assetKeys } from '../data/assets';
import './PortfolioAllocation.css';

function PortfolioAllocation({ character, currentValue, onSubmit, previousAllocation = null }) {
  // Initialiser avec l'allocation précédente si elle existe, sinon allocation équilibrée
  const getInitialAllocation = () => {
    if (previousAllocation) {
      return previousAllocation;
    }

    const initialAllocation = {};
    const equalShare = Math.floor(100 / assetKeys.length);
    assetKeys.forEach((key, index) => {
      initialAllocation[key] = index === 0 ? 100 - (equalShare * (assetKeys.length - 1)) : equalShare;
    });
    return initialAllocation;
  };

  const [allocation, setAllocation] = useState(getInitialAllocation());

  const handleChange = (assetKey, value) => {
    const numValue = parseInt(value) || 0;
    setAllocation(prev => ({
      ...prev,
      [assetKey]: Math.max(0, Math.min(100, numValue))
    }));
  };

  const getTotalAllocation = () => {
    return Object.values(allocation).reduce((sum, val) => sum + val, 0);
  };

  const handleSubmit = () => {
    const total = getTotalAllocation();
    if (total !== 100) {
      alert(`L'allocation doit faire 100% (actuellement ${total}%)`);
      return;
    }

    onSubmit(allocation);
  };

  const total = getTotalAllocation();
  const isValid = total === 100;

  const getConstraintInfo = () => {
    if (!character.constraints || Object.keys(character.constraints).length === 0) {
      return null;
    }

    return Object.entries(character.constraints).map(([assetKey, constraint], index) => {
      const assetName = assets[assetKey].name;
      if (constraint.exact !== undefined) {
        return <div key={index}>⚠️ {assetName} : exactement {constraint.exact}%</div>;
      }
      if (constraint.min !== undefined) {
        return <div key={index}>⚠️ {assetName} : minimum {constraint.min}%</div>;
      }
      if (constraint.max !== undefined) {
        return <div key={index}>⚠️ {assetName} : maximum {constraint.max}%</div>;
      }
      return null;
    });
  };

  // Préparer les données pour le camembert
  const pieData = assetKeys
    .map(key => ({
      name: assets[key].name,
      value: allocation[key] || 0,
      emoji: assets[key].emoji,
      color: getAssetColor(key)
    }))
    .filter(item => item.value > 0);

  return (
    <div className="portfolio-allocation">
      <h2 className="panel-title">
        💼 Allocation de Patrimoine
      </h2>

      <div className="current-value">
        <span>Valeur actuelle :</span>
        <strong>{Math.round(currentValue).toLocaleString('fr-FR')}€</strong>
      </div>

      {character.constraints && Object.keys(character.constraints).length > 0 && (
        <div className="constraints-info">
          {getConstraintInfo()}
        </div>
      )}

      <div className="allocation-inputs">
        {assetKeys.map(key => {
          const asset = assets[key];
          const percentage = allocation[key] || 0;
          const euroAmount = Math.round((currentValue * percentage) / 100);

          return (
            <div key={key} className="asset-row-compact">
              <div className="asset-label">
                <span className="asset-emoji-small">{asset.emoji}</span>
                <span className="asset-name-small">{asset.name}</span>
              </div>
              <div className="asset-input-compact">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={percentage}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="allocation-input-small"
                />
                <span className="percent-sign-small">%</span>
                <span className="euro-amount">{euroAmount.toLocaleString('fr-FR')}€</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="allocation-summary">
        <div className="total-row">
          <span>Total :</span>
          <span className={`total-value ${isValid ? 'valid' : 'invalid'}`}>
            {total}%
          </span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="submit-button"
        disabled={!isValid}
      >
        ✅ Valider l'allocation
      </button>

      {/* Camembert en bas */}
      <div className="pie-chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label={({ emoji, value }) => value > 0 ? `${emoji} ${value}%` : ''}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Couleurs pour le camembert
function getAssetColor(assetKey) {
  const colors = {
    euro: '#3498db',
    immo: '#e67e22',
    actions: '#2ecc71',
    obligations: '#9b59b6',
    bitcoin: '#f39c12',
    or: '#f1c40f'
  };
  return colors[assetKey] || '#95a5a6';
}

export default PortfolioAllocation;
