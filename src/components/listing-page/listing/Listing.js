import './Listing.css';
import ProductCard from '../product-card/ProductCard';

const Listing = props => {
  return (
    <div class="listing-section">
      <div class="listing-section__head heading-5">
        Showing All Products
        <span class="text-grey heading-6">( showing 20 products)</span>
        <button class="btn-filter">
          <i class="bi bi-filter-right"></i>Filter
        </button>
      </div>

      <div class="sorting-container flex gap align-center">
        <div class="heading-6">Sort By:</div>
        {/* <input type="radio" name="sort" id="popularity" />
        <label htmlFor="popularity">Popularity</label> */}
        <input type="radio" name="sort" id="low-to-high" />
        <label htmlFor="low-to-high">Price - Low to High</label>
        <input type="radio" name="sort" id="high-to-low" />
        <label htmlFor="high-to-low">Price - High to Low</label>
      </div>

      <div class="listing-section__products">
        {props.products.map(el => (
          <ProductCard product={el} />
        ))}
      </div>

      <div class="listing-section__pages">
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
