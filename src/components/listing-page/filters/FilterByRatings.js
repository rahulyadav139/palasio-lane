import { Fragment } from 'react';
import './FilterByRatings.css';
import { v4 as uuid } from 'uuid';

const FilterByRatings = props => {
  return (
    <Fragment>
      <h4>Rating</h4>

      <div class="rating-wrapper">
        {Array.from({ length: 4 }).map((el, i) => (
          <div key={uuid()}>
            <input
              type="radio"
              name="filter-rating"
              id={`rate-${4 - i}`}
              value={4 - i}
            />
            <label for={`rate-${4 - i}`}>
              <span class="starred">
                {Array.from({ length: 4 - i }).map((el, i) => (
                  <i key={uuid()} class="fas fa-star"></i>
                ))}
              </span>
            </label>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
export default FilterByRatings;
