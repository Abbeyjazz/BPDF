import { useState } from 'react';
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

  return (
    <div className="portfolio-allocation">
      <h2 className="panel-title">💼 Allocation</h2>

      <div className="current-value-compact">
        <span>Valeur:</span>
        <strong>{Math.round(currentValue).toLocaleString('fr-FR')}€</strong>
      </div>

      {character.constraints && Object.keys(character.constraints).length > 0 && (
        <div className="constraints-info-compact">
          {getConstraintInfo()}
        </div>
      )}

      <div className="allocation-grid">
        {assetKeys.map(key => {
          const asset = assets[key];
          const percentage = allocation[key] || 0;
          const euroAmount = Math.round((currentValue * percentage) / 100);

          return (
            <div key={key} className="asset-input-row">
              <div className="asset-label-grid">
                <span className="asset-emoji">{asset.emoji}</span>
                <span className="asset-name">{asset.name}</span>
              </div>
              <div className="input-group">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={percentage}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="percentage-input"
                />
                <span className="percent-symbol">%</span>
              </div>
              <div className="euro-value">{euroAmount.toLocaleString('fr-FR')}€</div>
            </div>
          );
        })}
      </div>

      <div className="total-and-submit">
        <div className="total-display">
          <span>Total:</span>
          <span className={`total-percent ${isValid ? 'valid' : 'invalid'}`}>
            {total}%
          </span>
        </div>
        <button
          onClick={handleSubmit}
          className="submit-btn"
          disabled={!isValid}
        >
          ✅ Valider
        </button>
      </div>
    </div>
  );
}

export default PortfolioAllocation;
