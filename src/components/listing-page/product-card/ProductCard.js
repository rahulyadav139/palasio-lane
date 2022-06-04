import './ProductCard.css';
import { Link } from 'react-router-dom';
import {
  useWishlist,
  useAuth,
  useAuthModal,
  useCart,
  useToast,
} from '../../../hooks';
import { priceFormatter } from '../../../utils';

const ProductCard = props => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { isAuth } = useAuth();
  const { setToast } = useToast();
  const { showModal } = useAuthModal();
  const { cart, addToCart } = useCart();
  const {
    title,
    brand,
    price,
    inStock,
    imageUrl,
    discount,
    exclusive,
    rating,
    _id: prodId,
  } = props.product;

  const productCardClasses = exclusive
    ? 'card shadow ribbon ecom'
    : 'card shadow ecom';

  const toggleWishListHandler = () => {
    if (!isAuth) return showModal();

    wishlist.includes(prodId)
      ? removeFromWishlist(prodId)
      : addToWishlist(prodId);
  };

  const addToCartHandler = () => {
    if (!isAuth) return showModal();

    cart.some(cartItem => cartItem.product === prodId)
      ? setToast({
          status: true,
          type: 'loading',
          message: 'Already in the cart!',
        })
      : addToCart(prodId);
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
            {rating} <i className="fas fa-star"></i> |{' '}
            {Math.floor(Math.random() * 1000)}
          </span>
        </div>
      </Link>
      <div className="flex space-between">
        <h1 className="product-brand">{brand}</h1>
        <button
          onClick={toggleWishListHandler}
          className="btn btn-wishlist icon medium primary"
        >
          <i
            className={
              isAuth && wishlist.includes(prodId)
                ? 'fas fa-heart'
                : 'far fa-heart'
            }
          ></i>
        </button>
      </div>

      <h2 className="product-title">{title.substring(0, 22) + '...'}</h2>

      {discount !== 0 && (
        <div className="price">
          <div className="price__original">{priceFormatter(price)}</div>
          <div className="price__discounted">
            {priceFormatter(price * ((100 - discount) / 100))}
          </div>
        </div>
      )}
      {!discount && (
        <div className="price">
          <div className="price__discounted">{priceFormatter(price)}</div>
        </div>
      )}

      <button onClick={addToCartHandler} className="btn primary">
        <strong>Add</strong>
      </button>

      {!inStock && (
        <Link to={`/product/${prodId}`}>
          <span className="overlay">
            <p>out of stock</p>
          </span>
        </Link>
      )}
    </div>
  );
};
export default ProductCard;
