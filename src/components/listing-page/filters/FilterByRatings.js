import { Fragment } from 'react';
import './FilterByRatings.css';
import { v4 as uuid } from 'uuid';

const FilterByRatings = props => {
  const changeStarHandler = e => {
    props.onGetStar(e.target.value);
  };

  return (
    <Fragment>
      <h4>Rating</h4>

      <div className="rating-wrapper">
        {Array.from({ length: 4 }).map((el, i) => (
          <div key={uuid()}>
            <input
              type="radio"
              name="filter-rating"
              id={`rate-${4 - i}`}
              value={4 - i}
              onChange={changeStarHandler}
              checked={(4 - i).toString() === props.star}
            />
            <label htmlFor={`rate-${4 - i}`}>
              <span className="starred">
                {Array.from({ length: 4 - i }).map((el, i) => (
                  <i key={uuid()} className="fas fa-star"></i>
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
