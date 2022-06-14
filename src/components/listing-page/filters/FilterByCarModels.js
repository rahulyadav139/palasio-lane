import { Fragment } from 'react';

import { v4 as uuid } from 'uuid';

import CarModels from './CarModels';

const FilterByCarModels = props => {
  const products = props.products;

  const carDetails = products
    .map(el => el.car)
    .filter(el => el !== 'universal');

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

  return (
    <Fragment>
      {carDetailsForFilter.length !== 0 && (
        <Fragment>
          <h4>Car Model</h4>
          {carDetailsForFilter?.map(car => (
            <CarModels
              key={uuid()}
              manufacturer={car.manufacturer}
              models={car.models}
              onGetCarModels={props.onGetCarModels}
              carModels={props.carModels}
            />
          ))}

          <div className="hr-line fad"></div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default FilterByCarModels;
