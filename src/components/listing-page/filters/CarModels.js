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
   

    if (e.target.checked) {
      const newArr = [...props.carModels, e.target.value];
      props.onGetCarModels(newArr);
     
      return;
    }

    const newArr = props.carModels.filter(el => el !== e.target.value);
  
    props.onGetCarModels(newArr);
   
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
                checked={props.carModels.includes(model)}
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
