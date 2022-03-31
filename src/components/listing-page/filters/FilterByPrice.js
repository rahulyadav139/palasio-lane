import { Fragment } from 'react';
import './FilterByPrice.css';

const FilterByPrice = props => {
  return (
    <Fragment>
      <h4>Price Range</h4>
      <div class="filter-section__price">
        <p>Max</p>
        <div class="input-field-icon price__input">
          <label>
            <span class="icon small">
              <i class="fas fa-rupee-sign"></i>
            </span>
            <input placeholder="Price" type="number" />
          </label>
        </div>
      </div>

      <input
        min="1000"
        max="10000"
        step="1000"
        class="styled-slider"
        type="range"
      />

      <div class="hr-line fad"></div>
    </Fragment>
  );
};
export default FilterByPrice;
