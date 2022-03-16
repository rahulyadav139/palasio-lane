import './CarModels.css';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

const CarModels = props => {
  const [showCarModels, setShowCarModels] = useState(true);
  const { models, manufacturer } = props;

  const showCarModelsHandler = () => {
    setShowCarModels(prev => !prev);
  };

  const changeCarModelsHandler = e => {
    console.log(e.target.value);
  };

  return (
    <div className="car-item">
      <button onClick={showCarModelsHandler}>{manufacturer}</button>
      {showCarModels && (
        <ul className="car__models">
          {models.map((model, i) => (
            <li key={uuid()}>
              <input
                onChange={changeCarModelsHandler}
                type="checkbox"
                id={`${manufacturer}-${i + 1}`}
                value={model}
              />
              <label htmlFor={`${manufacturer}-${i + 1}`}>{model}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CarModels;
