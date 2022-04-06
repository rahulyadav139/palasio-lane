import './SingleProductCard.css';

const SingleProductCard = props => {
  return (
    <div class="card shadow product-detail">
      <div class="image">
        <img
          class="img-responsive"
          src="https://i.picsum.photos/id/534/536/354.jpg?hmac=tab6Z5S4lvYxZsVcDIxELokB38Smjq75X4XQxpRBgg0"
          alt="sample"
        />
      </div>
      <div class="product-detail__text">
        <h1 class="product-brand">
          In publishing and graphic design, Lorem ipsum is a placeholder text
        </h1>
        <h2 class="product-title">Loud Speaker</h2>
        <div class="rating">
          4.4 <i class="fas fa-star"></i> | 3.9k Ratings
        </div>
        <div class="hr-line thin solid grey"></div>
        <div class="price flex gap">
          <div class="price__original">$100</div>
          <div class="price__discounted">$80</div>
        </div>
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
