import './Navigation.css';
import { useAuth, useAuthModal, useWishlist, useFetch } from '../../hooks';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

let initialized = true;
const Navigation = props => {
  const { isAuth, logoutHandler } = useAuth();
  const { sendData } = useFetch();
  const { showModal } = useAuthModal();
  const { wishlist, errorToUpdateWishlist } = useWishlist();

  const wishlistQty = wishlist.quantity;

  useEffect(() => {
    if (!initialized) {
      (async () => {
        const { error } = await sendData(
          'http://localhost:8080/admin/wishlist',
          'PUT',
          wishlist,
          true
        );

        if (error) {
          return errorToUpdateWishlist();
        }
      })();

      return;
    }

    if (isAuth && initialized) {
      initialized = false;
    }
  }, [wishlistQty, initialized, isAuth]);

  const userLogoutHandler = () => {
    logoutHandler();
    initialized = true;
  };

  return (
    <nav>
      <ul className="list-items">
        <li>
          <div className="theme-toggle">
            <input
              type="checkbox"
              className="theme-toggle__checkbox"
              id="theme-toggle"
            />
            <label className="theme-toggle__label" htmlFor="theme-toggle">
              <span className="icon medium primary">
                <i className="fas fa-moon"></i>{' '}
                <i className="fas fa-sun hidden"></i>
              </span>
            </label>
          </div>
        </li>

        {isAuth && (
          <li className="list-item">
            <Link to="/wishlist">
              <div className="badge-container">
                <button className="btn icon medium primary badge-counter">
                  <i className="fas fa-heart"></i>
                </button>
                {wishlist.quantity !== 0 && (
                  <span className="badge-number">{wishlist.quantity}</span>
                )}
              </div>
            </Link>
          </li>
        )}
        <li className="list-item">
          <div className="badge-container">
            <button className="btn icon medium primary badge-counter">
              <i className="fas fa-shopping-cart"></i>
            </button>
            <span className="badge-number">10</span>
          </div>
        </li>
        {isAuth && (
          <li className="profile-item list-item">
            <div className="avatar small">
              <img
                src="https://i.picsum.photos/id/704/536/354.jpg?hmac=k_PDx86tD-ILOtsUOKY9t5LAL5ycKiQ4ryVdlxhWoek"
                alt="sample"
              />
            </div>

            <div className="profile-item-dropdown shadow">
              <ul>
                <li>
                  <span className="icon primary small">
                    <i className="fas fa-user"></i>
                  </span>
                  <span>My Profile</span>
                </li>

                <li>
                  <span className="icon primary small">
                    <i className="bi bi-box"></i>
                  </span>
                  <span>Orders</span>
                </li>
              </ul>
              <button onClick={userLogoutHandler} className="btn primary">
                Logout
              </button>
            </div>
          </li>
        )}
        {!isAuth && (
          <li className="login-item">
            <button
              onClick={showModal}
              className="btn-login btn primary text-bold"
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navigation;
