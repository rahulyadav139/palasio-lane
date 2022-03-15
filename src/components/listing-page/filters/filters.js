import './Filters.css';
import FilterByCarModels from './FilterByCarModels';
import FilterByPrice from './FilterByPrice';
import FilterByRatings from './FilterByRatings';

const Filters = props => {
  return (
    <div class="filter-section">
      <div class="filter-section__head flex space-between align-center">
        <div class="heading-5">FILTERS</div>
        <button>Reset</button>
      </div>
      <div class="first-line hr-line fad"></div>

      <FilterByPrice />
      <FilterByCarModels products={props.products} />
      <FilterByRatings />

      <div class="filter-section__buttons">
        <button class="btn primary">Filter</button>
        <button class="btn-reset btn outline primary">Reset</button>
      </div>
    </div>
  );
};
export { Filters };
