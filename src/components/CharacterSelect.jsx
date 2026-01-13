import { characters } from '../data/characters';
import { assets } from '../data/assets';
import './CharacterSelect.css';

function CharacterSelect({ onSelect }) {
  const getConstraintText = (character) => {
    if (!character.constraints || Object.keys(character.constraints).length === 0) {
      return 'Aucune contrainte particulière';
    }

    return Object.entries(character.constraints).map(([assetKey, constraint]) => {
      const assetName = assets[assetKey].name;
      if (constraint.exact !== undefined) {
        return `Toujours ${constraint.exact}% en ${assetName}`;
      }
      if (constraint.min !== undefined) {
        return `Min ${constraint.min}% en ${assetName}`;
      }
      if (constraint.max !== undefined) {
        return `Max ${constraint.max}% en ${assetName}`;
      }
      return '';
    }).join(' • ');
  };

  return (
    <div className="character-select">
      <div className="select-header">
        <h1>Choisis ton personnage</h1>
        <p>Chaque personnage a ses propres contraintes d'investissement</p>
      </div>

      <div className="characters-grid">
        {characters.map(char => (
          <div
            key={char.id}
            className="character-card"
            onClick={() => onSelect(char.id)}
            style={{ borderColor: char.color }}
          >
            <div className="character-emoji">{char.emoji}</div>
            <h3 className="character-name">{char.name}</h3>
            <p className="character-description">{char.description}</p>
            <div className="character-constraint">
              📋 {getConstraintText(char)}
            </div>
            <button className="select-button" style={{ backgroundColor: char.color }}>
              Choisir {char.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterSelect;
