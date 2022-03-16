import './SingleProductCard.css';

const SingleProductCard = props => {
  const { title, brand, imageUrl, price, discount } = props.product;
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
          <button className="btn primary icon-with-text">
            Add to Cart
            <span>
              <i className="fas fa-shopping-cart"></i>
            </span>
          </button>
          <button className="btn outline primary">Wishlist</button>
        </div>
      </div>
    </div>
  );
};
export { SingleProductCard };
