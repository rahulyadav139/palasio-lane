import './ProductCard';
import { Link } from 'react-router-dom';

const ProductCard = props => {
  const {
    title,
    brand,
    price,
    quantity,
    imageUrl,
    discount,
    exclusive,
    rating,
  } = props.product;

  const productCardClasses = exclusive
    ? 'card shadow ribbon ecom'
    : 'card shadow ecom';

  return (
    <div class={productCardClasses} ribbon-content="Exclusive">
      <div class="image">
        <img src={imageUrl} alt={title} />

        {discount !== 0 && (
          <span class="badge highlight top left">{`-${discount}%`}</span>
        )}

        <span class="badge bottom left">
          4.4 <i class="fas fa-star"></i> | 123
        </span>
      </div>
      <div class="flex space-between">
        <h1 class="product-brand">{brand}</h1>
        <button class="btn icon medium primary">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <Link to="/">
        <h2 class="product-title">{title.substring(0, 22) + '...'}</h2>
      </Link>
      {discount !== 0 && (
        <div class="price">
          <div class="price__original">{price}</div>
          <div class="price__discounted">
            {Math.floor(price * ((100 - discount) / 100))}
          </div>
        </div>
      )}
      {!discount && (
        <div class="price">
          <div class="price__discounted">{price}</div>
        </div>
      )}

      <button class="btn primary">
        <strong>Add</strong>
      </button>

      {!quantity && (
        <span class="overlay">
          <p>out of stock</p>
        </span>
      )}
    </div>
  );
};
export default ProductCard;
