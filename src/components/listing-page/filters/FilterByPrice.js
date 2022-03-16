import { Fragment } from 'react';
import './FilterByPrice.css';

const FilterByPrice = props => {
  return (
    <Fragment>
      <h4>Price Range</h4>
      <div className="filter-section__price">
        <p>Max</p>
        <div className="input-field-icon price__input">
          <label>
            <span className="icon small">
              <i className="fas fa-rupee-sign"></i>
            </span>
            <input placeholder="Price" type="number" />
          </label>
        </div>
      </div>

      <input
        min="1000"
        max="10000"
        step="1000"
        className="styled-slider"
        type="range"
      />

      <div className="hr-line fad"></div>
    </Fragment>
  );
};
export default FilterByPrice;
