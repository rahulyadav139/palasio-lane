import './SingleProductCard.css';
import { Link } from 'react-router-dom';

import { useWishlist, useAuth, useAuthModal, useCart } from '../../hooks';

const SingleProductCard = props => {
  const { showModal } = useAuthModal();
  const { isAuth } = useAuth();
  const { cart, addToCart } = useCart();
  const { wishlist, removeFromWishlist, addToWishlist } = useWishlist();
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

  const product = {
    title,
    brand,
    price,
    quantity,
    imageUrl,
    discount,
    exclusive,
    rating,
    _id: prodId,
  };

  const toggleWishListHandler = () => {
    if (!isAuth) return showModal();

    wishlist.items.some(el => el._id === prodId)
      ? removeFromWishlist(prodId)
      : addToWishlist(product);
  };

  const addToCartHandler = () => {
    if (!isAuth) return showModal();

    cart.items.some(el => el.product._id === prodId)
      ? console.log('already in the cart')
      : addToCart(product);
  };

  const wishlistButton =
    isAuth && wishlist.items.some(el => el._id === prodId) ? (
      <button onClick={toggleWishListHandler} className="btn primary">
        Wishlisted
      </button>
    ) : (
      <button onClick={toggleWishListHandler} className="btn outline primary">
        Wishlist
      </button>
    );
  return (
    <div className="card shadow product-detail">
      <div className="image">
        <img className="img-responsive" src={imageUrl} alt={title} />
      </div>

      <div className="product-detail__text">
        <h1 className="product-brand">{title}</h1>
        <h2 className="product-title">{brand}</h2>
        <div className="rating">
          4.4 <i className="fas fa-star"></i> | 3.9k Ratings
        </div>
        <div className="hr-line thin solid grey"></div>
        {discount !== 0 ? (
          <div className="price flex gap">
            <div className="price__original">{price}</div>
            <div className="price__discounted">
              {Math.floor(price * ((100 - discount) / 100))}
            </div>
          </div>
        ) : (
          <div className="price flex gap">
            <div className="price__discounted">{price}</div>
          </div>
        )}
        <div className="text-details">inclusive of all taxes</div>
        <div className="buttons">
          <button
            onClick={addToCartHandler}
            className="btn primary icon-with-text"
          >
            Add to Cart
            <span>
              <i className="fas fa-shopping-cart"></i>
            </span>
          </button>
          {wishlistButton}
        </div>
      </div>
    </div>
  );
};
export { SingleProductCard };
