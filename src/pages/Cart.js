import './Cart.css';
import {
  CartProductCard,
  PriceBreakoutCard,
  Header,
  Footer,
} from '../components';
import { Fragment } from 'react';
// import { CartProductCard } from '../components/cart/CartProductCard';

const Cart = props => {
  return (
    <Fragment>
      <Header />

      <main class="main">
        <div class="heading-4">
          My Cart <span class="text-grey heading-6">( 3 items )</span>
        </div>
        <div class="hr-line fad"></div>
        <div class="cart">
          <CartProductCard />
          <PriceBreakoutCard />
        </div>
      </main>

      <Footer />
    </Fragment>
  );
};
export default Cart;
