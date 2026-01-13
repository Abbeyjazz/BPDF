import { useState } from 'react';
import { assets, assetKeys } from '../data/assets';
import './PortfolioAllocation.css';

function PortfolioAllocation({ character, currentValue, onSubmit }) {
  // Initialiser avec une allocation équilibrée
  const initialAllocation = {};
  const equalShare = Math.floor(100 / assetKeys.length);
  assetKeys.forEach((key, index) => {
    initialAllocation[key] = index === 0 ? 100 - (equalShare * (assetKeys.length - 1)) : equalShare;
  });

  const [allocation, setAllocation] = useState(initialAllocation);

  const handleChange = (assetKey, value) => {
    const numValue = parseFloat(value) || 0;
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
    if (Math.abs(total - 100) > 0.1) {
      alert(`L'allocation doit faire 100% (actuellement ${total.toFixed(1)}%)`);
      return;
    }

    onSubmit(allocation);
  };

  const handleAutoBalance = () => {
    const total = getTotalAllocation();
    if (total === 0) return;

    const balanced = {};
    assetKeys.forEach(key => {
      balanced[key] = (allocation[key] / total) * 100;
    });
    setAllocation(balanced);
  };

  const total = getTotalAllocation();
  const isValid = Math.abs(total - 100) < 0.1;

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
          const value = allocation[key] || 0;

          return (
            <div key={key} className="asset-row">
              <div className="asset-info">
                <span className="asset-emoji">{asset.emoji}</span>
                <div className="asset-details">
                  <span className="asset-name">{asset.name}</span>
                  <span className="asset-description">{asset.description}</span>
                </div>
              </div>
              <div className="asset-input-group">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={value.toFixed(1)}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="allocation-input"
                />
                <span className="percent-sign">%</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="allocation-summary">
        <div className="total-row">
          <span>Total :</span>
          <span className={`total-value ${isValid ? 'valid' : 'invalid'}`}>
            {total.toFixed(1)}%
          </span>
        </div>
        {!isValid && (
          <div className="balance-helper">
            <button onClick={handleAutoBalance} className="balance-button">
              ⚖️ Rééquilibrer à 100%
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="submit-button"
        disabled={!isValid}
      >
        ✅ Valider l'allocation
      </button>
    </div>
  );
}

export default PortfolioAllocation;
