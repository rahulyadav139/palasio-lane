import './WishlistProductCard.css';
import { useWishlist, useCart } from '../../hooks';
import { Link } from 'react-router-dom';
import { priceFormatter } from '../../utils';

const WishlistProductCard = props => {
  const {
    title,
    brand,
    price,
    discount,
    imageUrl,
    exclusive,
    _id: prodId,
  } = props.product;
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const addToCartHandler = () => {
    removeFromWishlist(prodId);
    addToCart(props.product);
  };

  return (
    <div className="card shadow ecom">
      <Link to={`/product/${prodId}`}>
        <div className="image">
          <img src={imageUrl} alt={title} />

          {discount !== 0 && (
            <span className="badge highlight top left">{`-${discount}%`}</span>
          )}
          <span className="badge bottom left">
            4.4 <i className="fas fa-star"></i> | 123
          </span>
        </div>
      </Link>

      <h1 className="product-brand">{brand}</h1>

      <h2 className="product-title">{title.substring(0, 22) + '...'}</h2>
      {discount !== 0 ? (
        <div className="price">
          <div className="price__original">{priceFormatter(price)}</div>
          <div className="price__discounted">
            {priceFormatter(price * ((100 - discount) / 100))}
          </div>
        </div>
      ) : (
        <div className="price">
          <div className="price__discounted">{priceFormatter(price)}</div>
        </div>
      )}

      <button onClick={addToCartHandler} className="btn primary">
        <strong>
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </strong>
      </button>

      <button
        onClick={removeFromWishlist.bind(null, prodId)}
        className="btn-dismiss"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};
export { WishlistProductCard };
