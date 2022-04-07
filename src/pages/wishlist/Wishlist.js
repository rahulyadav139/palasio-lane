import './Wishlist.css';
import { WishlistProductCard, Header, Footer } from '../../components';
import { Fragment } from 'react';
import { useWishlist } from '../../hooks';
import { v4 as uuid } from 'uuid';

const Wishlist = props => {
  const { wishlist } = useWishlist();

  const wishlistQty = wishlist.length;
  console.log(wishlist);

  const headingMsg =
    wishlistQty > 1 ? `( ${wishlistQty} items )` : `( ${wishlistQty} item )`;

  return (
    <Fragment>
      <Header />
      <main className="main">
        <div className="heading-4">
          My Wishlist <span className="text-grey heading-6">{headingMsg}</span>
        </div>
        <div className="hr-line fad"></div>
        <div className="wishlist">
          {wishlist.map(product => (
            <WishlistProductCard key={uuid()} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};
export { Wishlist };
