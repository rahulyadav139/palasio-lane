import './Wishlist.css';
import { WishlistProductCard } from '../../components';

import { useWishlist } from '../../hooks';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

const Wishlist = props => {
  const { wishlist } = useWishlist();

  const wishlistQty = wishlist.length;

  const headingMsg =
    wishlistQty > 1 ? `( ${wishlistQty} items )` : `( ${wishlistQty} item )`;

  return (
    <main className="main">
      <div className="heading-4">
        My Wishlist <span className="text-grey heading-6">{headingMsg}</span>
      </div>
      <div className="hr-line fad"></div>
      {wishlist.length !== 0 ? (
        <div className="wishlist">
          {wishlist.map(product => (
            <WishlistProductCard key={uuid()} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-wishlist">
          <h2>Your wishlist is empty!</h2>
          <Link to="/">
            <button className="btn primary">Shop Now</button>
          </Link>
        </div>
      )}
    </main>
  );
};
export { Wishlist };
