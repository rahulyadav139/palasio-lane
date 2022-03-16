import './Filters.css';
import FilterByCarModels from './FilterByCarModels';
import FilterByPrice from './FilterByPrice';
import FilterByRatings from './FilterByRatings';

const Filters = props => {
  const getFilteredProducts = products => {
    return price => {
      let firstFiltered;
      if (!price) {
        firstFiltered = products;
      } else {
        firstFiltered = products.filter(
          product => price >= (product.price * (100 - product.discount)) / 100
        );
      }
      return model => {
        let secondFiltered;
        if (!model) {
          secondFiltered = firstFiltered;
        } else {
          secondFiltered = firstFiltered.filter(
            product => product.car.model === model
          );
        }
        return rating => {
          let thirdFiltered;
          if (!rating) {
            thirdFiltered = secondFiltered;
          } else {
            thirdFiltered = secondFiltered.filter(
              product => rating >= product.rating
            );
          }
          return thirdFiltered;
        };
      };
    };
  };
  return (
    <div className="filter-section">
      <div className="filter-section__head flex space-between align-center">
        <div className="heading-5">FILTERS</div>
        <button>Reset</button>
      </div>
      <div className="first-line hr-line fad"></div>

      <FilterByPrice />
      <FilterByCarModels products={props.products} />
      <FilterByRatings />

      <div className="filter-section__buttons">
        <button className="btn primary">Filter</button>
        <button className="btn-reset btn outline primary">Reset</button>
      </div>
    </div>
  );
};
export { Filters };
