import { Fragment } from 'react';
import './FilterByCarModels.css';
import { v4 as uuid } from 'uuid';

const FilterByCarModels = ({ products }) => {
  const carDetails = products
    .map(el => el.car)
    .filter(el => el !== 'universal');
  // // console.log([...carDetails]);
  // const carDetailsUnique = new Set([...carDetails]);

  // console.log(carDetailsUnique);

  const carDetailsForFilter = carDetails.reduce((acc, car) => {
    if (!acc.length) {
      acc.push({ manufacturer: car.manufacturer, models: [car.model] });
      return acc;
    }

    const index = acc.findIndex(el => el.manufacturer === car.manufacturer);

    if (index < 0) {
      acc.push({ manufacturer: car.manufacturer, models: [car.model] });
      return acc;
    }

    if (acc[index].models.includes(car.model)) return acc;

    acc[index].models.push(car.model);

    return acc;
  }, []);

  const clickHandler = e => {
    console.log(e.target.value);
  };

  return (
    <Fragment>
      {carDetailsForFilter.length !== 0 && (
        <Fragment>
          <h4>Car Model</h4>
          {carDetailsForFilter.map(car => (
            <div key={uuid()} className="car-item">
              <input
                className="car__brand-input"
                type="checkbox"
                id={car.manufacturer}
              />{' '}
              <label className="car__brand-label" htmlFor={car.manufacturer}>
                {car.manufacturer}
              </label>
              <ul className="car__models">
                {car.models.map((model, i) => (
                  <li key={uuid()}>
                    <label htmlFor={`${car.manufacturer}-${i + 1}`}>
                      <input
                        onClick={clickHandler}
                        type="checkbox"
                        id={`${car.manufacturer}-${i + 1}`}
                        value={model}
                      />
                      {model}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="hr-line fad"></div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default FilterByCarModels;
