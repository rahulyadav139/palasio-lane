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

    _id: prodId,
  } = props.product;

  const productCardClassNamees = exclusive
    ? 'card shadow ribbon ecom'
    : 'card shadow ecom';

  return (
    <div className={productCardClassNamees} ribbon-content="Exclusive">
      <div className="image">
        <img src={imageUrl} alt={title} />

        {discount !== 0 && (
          <span className="badge highlight top left">{`-${discount}%`}</span>
        )}

        <span className="badge bottom left">
          4.4 <i className="fas fa-star"></i> | 123
        </span>
      </div>
      <div className="flex space-between">
        <h1 className="product-brand">{brand}</h1>
        <button className="btn icon medium primary">
          <i className="far fa-heart"></i>
        </button>
      </div>
      <Link to={`/product/${prodId}`}>
        <h2 className="product-title">{title.substring(0, 22) + '...'}</h2>
      </Link>
      {discount !== 0 && (
        <div className="price">
          <div className="price__original">{price}</div>
          <div className="price__discounted">
            {Math.floor(price * ((100 - discount) / 100))}
          </div>
        </div>
      )}
      {!discount && (
        <div className="price">
          <div className="price__discounted">{price}</div>
        </div>
      )}

      <button className="btn primary">
        <strong>Add</strong>
      </button>

      {!quantity && (
        <span className="overlay">
          <p>out of stock</p>
        </span>
      )}
    </div>
  );
};
export default ProductCard;
