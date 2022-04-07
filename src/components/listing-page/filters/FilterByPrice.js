import { Fragment } from 'react';
import './FilterByPrice.css';

const FilterByPrice = props => {
  const priceChangeHandler = e => {
    if (e.target.value > 10000) {
      props.onGetPrice(10000);
      return;
    }

    if (e.target.value < 1000) {
      props.onGetPrice(1000);
      return;
    }
    props.onGetPrice(e.target.value);
  };

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
            <input
              value={props.price}
              onChange={priceChangeHandler}
              placeholder="Price"
              type="number"
            />
          </label>
        </div>
      </div>

      <input
        min="1000"
        max="10000"
        step="1000"
        className="styled-slider"
        type="range"
        value={props.price || 1000}
        onChange={priceChangeHandler}
      />

      <div className="hr-line fad"></div>
    </Fragment>
  );
};
export default FilterByPrice;
