import './Filters.css';
import FilterByCarModels from './FilterByCarModels';
import FilterByPrice from './FilterByPrice';
import FilterByRatings from './FilterByRatings';

const Filters = props => {
  const resetFilterHandler = () => {
    props.onGetStar(null);
    props.onGetPrice('');
    props.onGetCarModels([]);
  };
  return (
    <div className="filter-section">
      <div className="filter-section__head flex space-between align-center">
        <div className="heading-5">FILTERS</div>
        <button onClick={resetFilterHandler}>Reset</button>
      </div>
      <div className="first-line hr-line fad"></div>

      <FilterByPrice onGetPrice={props.onGetPrice} price={props.price} />
      <FilterByCarModels
        onGetCarModels={props.onGetCarModels}
        products={props.products}
        carModels={props.carModels}
      />
      <FilterByRatings onGetStar={props.onGetStar} star={props.star} />

      <div className="filter-section__buttons">
        <button className="btn primary">Filter</button>
        <button className="btn-reset btn outline primary">Reset</button>
      </div>
    </div>
  );
};
export { Filters };
