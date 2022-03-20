import './Wishlist.css';
import { WishlistProductCard, Header, Footer } from '../../components';
import { Fragment } from 'react';
import { useWishlist } from '../../hooks';
import { v4 as uuid } from 'uuid';

const Wishlist = props => {
  const { wishlist } = useWishlist();
  console.log(wishlist);

  return (
    <Fragment>
      <Header />
      <main className="main">
        <div className="heading-4">
          My Wishlist{' '}
          <span className="text-grey heading-6">{`( ${wishlist.totalQuantity} items )`}</span>
        </div>
        <div className="hr-line fad"></div>
        <div className="wishlist">
          {wishlist.items.map(product => (
            <WishlistProductCard key={uuid()} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};
export { Wishlist };
