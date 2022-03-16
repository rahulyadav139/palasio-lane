import './Listing.css';
import ProductCard from '../product-card/ProductCard';
import { v4 as uuid } from 'uuid';

const Listing = props => {
  return (
    <div className="listing-section">
      <div className="listing-section__head heading-5">
        Showing All Products
        <span className="text-grey heading-6">( showing 20 products)</span>
        <button className="btn-filter">
          <i className="bi bi-filter-right"></i>Filter
        </button>
      </div>

      <div className="sorting-container flex gap align-center">
        <div className="heading-6">Sort By:</div>
        {/* <input type="radio" name="sort" id="popularity" />
        <label htmlFor="popularity">Popularity</label> */}
        <input type="radio" name="sort" id="low-to-high" />
        <label htmlFor="low-to-high">Price - Low to High</label>
        <input type="radio" name="sort" id="high-to-low" />
        <label htmlFor="high-to-low">Price - High to Low</label>
      </div>

      <div className="listing-section__products">
        {props.products.map(el => (
          <ProductCard key={uuid()} product={el} />
        ))}
      </div>

      <div className="listing-section__pages">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>{'>'}</li>
        </ul>
      </div>
    </div>
  );
};
export { Listing };
