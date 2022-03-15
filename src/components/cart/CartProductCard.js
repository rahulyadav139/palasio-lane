import './CartProductCard.css';

const CartProductCard = props => {
  return (
    <div class="cart-items">
      <div class="card shadow cart-item">
        <div class="image">
          <img
            src="https://i.picsum.photos/id/534/536/354.jpg?hmac=tab6Z5S4lvYxZsVcDIxELokB38Smjq75X4XQxpRBgg0"
            alt="sample"
            class="img-responsive"
          />
        </div>
        <div class="cart-item__details flex col">
          <div class="heading-6 text-grey">Impos Decor</div>

          <div class="heading-5">Vintage artifacts vase</div>
          <div class="price flex gap">
            <div class="price__old text-grey text-strike">$100</div>
            <div class="price__new text-bold text-primary-dark">$80</div>
          </div>

          <div class="flex gap align-center cart-item__quantity">
            <span class="heading-6">Quantity:</span>
            <button class="btn icon small">
              <i class="fas fa-minus-circle"></i>
            </button>
            <div class="flex center">5</div>
            <button class="btn icon small">
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>

          <div class="cart-item__buttons">
            <button class="btn primary">
              <strong>Remove From Cart</strong>
            </button>
            <button class="btn outline primary">
              <strong>Move to Wishlist</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export { CartProductCard };
