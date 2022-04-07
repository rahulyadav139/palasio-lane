import './SingleProductCard.css';

const SingleProductCard = props => {
  const { title, brand, imageUrl, price, discount } = props.product;
  return (
    <div class="card shadow product-detail">
      <div class="image">
        <img class="img-responsive" src={imageUrl} alt={title} />
      </div>
      <div class="product-detail__text">
        <h1 class="product-brand">{title}</h1>
        <h2 class="product-title">{brand}</h2>
        <div class="rating">
          4.4 <i class="fas fa-star"></i> | 3.9k Ratings
        </div>
        <div class="hr-line thin solid grey"></div>
        {discount !== 0 ? (
          <div class="price flex gap">
            <div class="price__original">{price}</div>
            <div class="price__discounted">
              {Math.floor(price * ((100 - discount) / 100))}
            </div>
          </div>
        ) : (
          <div class="price flex gap">
            <div class="price__discounted">{price}</div>
          </div>
        )}
        <div class="text-details">inclusive of all taxes</div>
        <div class="buttons">
          <button class="btn primary icon-with-text">
            Add to Cart
            <span>
              <i class="fas fa-shopping-cart"></i>
            </span>
          </button>
          <button class="btn outline primary">Wishlist</button>
        </div>
      </div>
    </div>
  );
};
export { SingleProductCard };
