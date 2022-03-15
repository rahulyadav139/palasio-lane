import './WishlistProductCard.css';

const WishlistProductCard = props => {
  return (
    <div class="card shadow ecom">
      <div class="image">
        <img
          src="https://i.picsum.photos/id/534/536/354.jpg?hmac=tab6Z5S4lvYxZsVcDIxELokB38Smjq75X4XQxpRBgg0"
          alt=""
        />

        <span class="badge highlight top left">-20%</span>

        <span class="badge bottom left">
          4.4 <i class="fas fa-star"></i> | 123
        </span>
      </div>

      <h1 class="product-brand">Impos Decor</h1>

      <h2 class="product-title">Car Seat Cover</h2>
      <div class="price">
        <div class="price__original">$100</div>
        <div class="price__discounted">$80</div>
      </div>

      <button class="btn primary">
        <strong>
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </strong>
      </button>

      <button class="btn-dismiss">
        <i class="fas fa-times"></i>
      </button>
    </div>
  );
};
export { WishlistProductCard };
