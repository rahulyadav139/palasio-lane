import './Wishlist.css';
import { WishlistProductCard, Header, Footer } from '../components';
import { Fragment } from 'react';

const Wishlist = props => {
  return (
    <Fragment>
      <Header />
      <main class="main">
        <div class="heading-4">
          My Wishlist <span class="text-grey heading-6">( 193 items )</span>
        </div>
        <div class="hr-line fad"></div>
        <div class="wishlist">
          <WishlistProductCard />
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};
export default Wishlist;
