import './Cart.css';
import { CartProductCard, PriceBreakoutCard } from '../../components';
import { useCart } from '../../hooks';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

const Cart = props => {
  const { cart } = useCart();

  const cartItemsQty = cart.reduce((acc, el) => (acc += el.quantity), 0) ?? 0;

  const headingMsg =
    cartItemsQty > 1 ? `( ${cartItemsQty} items )` : `( ${cartItemsQty} item )`;

  return (
    <main className="main">
      <div className="heading-4">
        My Cart <span className="text-grey heading-6">{headingMsg}</span>
      </div>
      <div className="hr-line fad"></div>
      {cart.length !== 0 ? (
        <div className="cart">
          <div className="cart-items">
            {cart.map(el => (
              <CartProductCard
                key={uuid()}
                product={el.product}
                quantity={el.quantity}
              />
            ))}
          </div>
          {cart.length !== 0 && <PriceBreakoutCard cart={cart} />}
        </div>
      ) : (
        <div className="empty-cart">
          <h2>Your cart is empty!</h2>
          <Link to="/">
            <button className="btn primary">Shop Now</button>
          </Link>
        </div>
      )}
    </main>
  );
};
export { Cart };
