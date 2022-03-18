import './WishlistProductCard.css';
import { useWishlist } from '../../hooks';

const WishlistProductCard = props => {
  const {
    title,
    brand,
    price,
    discount,
    imageUrl,
    _id: prodId,
  } = props.product;
  const { removeFromWishlist } = useWishlist();
  return (
    <div class="card shadow ecom">
      <div class="image">
        <img src={imageUrl} alt={title} />

        {discount !== 0 && (
          <span class="badge highlight top left">{`-${discount}%`}</span>
        )}
        <span class="badge bottom left">
          4.4 <i class="fas fa-star"></i> | 123
        </span>
      </div>

      <h1 class="product-brand">{brand}</h1>

      <h2 class="product-title">{title.substring(0, 22) + '...'}</h2>
      {discount !== 0 ? (
        <div class="price">
          <div class="price__original">{price}</div>
          <div class="price__discounted">
            {Math.floor(price * ((100 - discount) / 100))}
          </div>
        </div>
      ) : (
        <div class="price">
          <div class="price__discounted">{price}</div>
        </div>
      )}

      <button class="btn primary">
        <strong>
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </strong>
      </button>

      <button
        onClick={removeFromWishlist.bind(null, prodId)}
        class="btn-dismiss"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
  );
};
export { WishlistProductCard };
