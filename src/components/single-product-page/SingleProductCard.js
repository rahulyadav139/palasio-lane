import './SingleProductCard.css';

import {
  useWishlist,
  useAuth,
  useAuthModal,
  useCart,
  useToast,
} from '../../hooks';
import { priceFormatter } from '../../utils';

const SingleProductCard = props => {
  const { showModal } = useAuthModal();
  const { setToast } = useToast();
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
    rating,
    _id: prodId,
    inStock,
  } = props.product;

  const product = {
    title,
    brand,
    price,
    quantity,
    imageUrl,
    discount,
    rating,
    _id: prodId,
  };

  const toggleWishListHandler = () => {
    if (!isAuth) return showModal();

    wishlist.some(el => el._id === prodId)
      ? removeFromWishlist(prodId)
      : addToWishlist(product);
  };

  const addToCartBtnClasses = inStock
    ? 'btn primary icon-with-text'
    : 'btn primary icon-with-text disable';

  const addToCartHandler = () => {
    if (!isAuth) return showModal();

    cart.some(el => el.product._id === prodId)
      ? setToast({
          status: true,
          type: 'loading',
          message: 'Already in the cart!',
        })
      : addToCart(product);
  };

  const wishlistButton =
    isAuth && wishlist.some(el => el._id === prodId) ? (
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
            <div className="price__original">{priceFormatter(price)}</div>
            <div className="price__discounted">
              {priceFormatter(price * ((100 - discount) / 100))}
            </div>
          </div>
        ) : (
          <div className="price flex gap">
            <div className="price__discounted">{priceFormatter(price)}</div>
          </div>
        )}
        <div className="text-details">inclusive of all taxes</div>
        <div className="buttons">
          <button
            onClick={addToCartHandler}
            className={addToCartBtnClasses}
            disabled={inStock ? false : true}
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
