import './ProductCard.css';
import { Link } from 'react-router-dom';
import { useWishlist, useAuth, useAuthModal } from '../../../hooks';

const ProductCard = props => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { isAuth } = useAuth();
  const { showModal } = useAuthModal();
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

  const productCardClasses = exclusive
    ? 'card shadow ribbon ecom'
    : 'card shadow ecom';

  const toggleWishListHandler = prodId => {
    if (!isAuth) return showModal();

    wishlist.items.includes(prodId)
      ? removeFromWishlist(prodId)
      : addToWishlist(prodId);
  };

  return (
    <div className={productCardClasses} ribbon-content="Exclusive">
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
      <div className="flex space-between">
        <h1 className="product-brand">{brand}</h1>
        <button
          onClick={toggleWishListHandler.bind(null, prodId)}
          className="btn btn-wishlist icon medium primary"
        >
          {isAuth && wishlist.items.includes(prodId) ? (
            <i class="fas fa-heart"></i>
          ) : (
            <i className="far fa-heart"></i>
          )}
        </button>
      </div>

      <h2 className="product-title">{title.substring(0, 22) + '...'}</h2>

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
