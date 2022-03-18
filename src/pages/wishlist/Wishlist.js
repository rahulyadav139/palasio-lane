import './Wishlist.css';
import { WishlistProductCard, Header, Footer } from '../../components';
import { Fragment, useEffect, useState } from 'react';
import { useAuth, useWishlist, useFetch } from '../../hooks';
import { v4 as uuid } from 'uuid';

const Wishlist = props => {
  const [wishlist, setWishlist] = useState({});
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { getData } = useFetch();
  const { wishlist: updatedWishlist } = useWishlist();
  const wishlistQty = updatedWishlist.quantity;

  useEffect(() => {
    try {
      console.log('wishlist page');
      (async () => {
        setLoading(true);

        const res = await fetch('http://localhost:8080/admin/wishlist', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        const data = await res.json();

        setWishlist(data.wishlist);
        setLoading(false);
      })();
    } catch (err) {
      console.log(err);
    }
  }, [token, wishlistQty]);
  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <Header />
          <main className="main">
            <div className="heading-4">
              My Wishlist{' '}
              <span className="text-grey heading-6">{`( ${wishlist.quantity} items )`}</span>
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
      )}
    </Fragment>
  );
};
export { Wishlist };
