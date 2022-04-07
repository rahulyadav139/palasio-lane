import './CartProductCard.css';
import { useCart, useWishlist } from '../../hooks';
import { Link } from 'react-router-dom';
import { priceFormatter } from '../../utils';

const CartProductCard = ({ product, quantity }) => {
  const { addToCart, decreaseCartItemQuantity, removeProduct } = useCart();
  const { addToWishlist } = useWishlist();

  const {
    title,
    brand,
    price,
    imageUrl,
    discount,
    _id: prodId,
    inStock,
  } = product;

  const moveToWishlistHandler = () => {
    removeProduct(prodId);
    addToWishlist(prodId);
  };

  const discountedPrice = price * ((100 - discount) / 100);

  return (
    <div className="card shadow cart-item">
      <div className="image">
        <Link to={`/product/${prodId}`}>
          <img src={imageUrl} alt={title} className="img-responsive" />
        </Link>
        {!inStock && (
          <span className="overlay">
            <p>out of stock</p>
          </span>
        )}
      </div>

      <div className="cart-item__details flex col">
        <div className="heading-6 text-grey">{brand}</div>

        <div className="heading-5">{title.substring(0, 22) + '...'}</div>
        {discount !== 0 ? (
          <div className="price">
            <div className="price__original">{priceFormatter(price)}</div>
            <div className="price__discounted">
              {priceFormatter(discountedPrice)}
            </div>
          </div>
        ) : (
          <div className="price">
            <div className="price__discounted">{priceFormatter(price)}</div>
          </div>
        )}

        <div className="flex gap align-center cart-item__quantity">
          <span className="heading-6">Quantity:</span>
          <button
            onClick={decreaseCartItemQuantity.bind(null, prodId)}
            className="btn icon small"
          >
            <i className="fas fa-minus-circle"></i>
          </button>
          <div className="flex center">{quantity}</div>
          <button
            onClick={addToCart.bind(null, prodId)}
            className="btn icon small"
          >
            <i className="fas fa-plus-circle"></i>
          </button>
        </div>

        <div className="cart-item__buttons">
          <button
            onClick={removeProduct.bind(null, prodId)}
            className="btn primary"
          >
            <strong>Remove From Cart</strong>
          </button>
          <button
            onClick={moveToWishlistHandler}
            className="btn outline primary"
          >
            <strong>Move to Wishlist</strong>
          </button>
        </div>
      </div>
    </div>
  );
};
export { CartProductCard };
