import './CartProductCard.css';
import { useCart, useWishlist } from '../../hooks';
import { Link } from 'react-router-dom';
import { priceFormatter } from '../../utils';

const CartProductCard = props => {
  const { addToCart, removeFromCart, removeSingleProduct } = useCart();
  const { addToWishlist } = useWishlist();

  const {
    title,
    brand,
    price,
    imageUrl,
    discount,
    _id: prodId,
  } = props.product;
  const quantity = props.quantity;

  const moveToWishlistHandler = () => {
    removeSingleProduct(prodId);
    addToWishlist(props.product);
  };

  return (
    <div className="cart-items">
      <div className="card shadow cart-item">
        <div className="image">
          <Link to={`/product/${prodId}`}>
            <img src={imageUrl} alt={title} className="img-responsive" />
          </Link>
        </div>

        <div className="cart-item__details flex col">
          <div className="heading-6 text-grey">{brand}</div>

          <div className="heading-5">{title.substring(0, 22) + '...'}</div>
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

          <div className="flex gap align-center cart-item__quantity">
            <span className="heading-6">Quantity:</span>
            <button
              onClick={removeFromCart.bind(null, prodId)}
              className="btn icon small"
            >
              <i className="fas fa-minus-circle"></i>
            </button>
            <div className="flex center">{quantity}</div>
            <button
              onClick={addToCart.bind(null, props.product)}
              className="btn icon small"
            >
              <i className="fas fa-plus-circle"></i>
            </button>
          </div>

          <div className="cart-item__buttons">
            <button
              onClick={removeSingleProduct.bind(null, prodId)}
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
    </div>
  );
};
export { CartProductCard };
