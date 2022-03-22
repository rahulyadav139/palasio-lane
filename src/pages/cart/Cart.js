import './Cart.css';
import {
  CartProductCard,
  PriceBreakoutCard,
  Header,
  Footer,
} from '../../components';
import { Fragment } from 'react';
import { useCart } from '../../hooks';
import { v4 as uuid } from 'uuid';

const Cart = props => {
  const { cart } = useCart();
  console.log(cart);
  const cartItemsQty = cart.reduce((acc, el) => (acc += el.quantity), 0) ?? 0;

  const headingMsg =
    cartItemsQty > 1 ? `( ${cartItemsQty} items )` : `( ${cartItemsQty} item )`;

  return (
    <Fragment>
      <Header />

      <main className="main">
        <div className="heading-4">
          My Cart <span className="text-grey heading-6">{headingMsg}</span>
        </div>
        <div className="hr-line fad"></div>
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
      </main>

      <Footer />
    </Fragment>
  );
};
export { Cart };
