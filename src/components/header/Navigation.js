import './Navigation.css';
import { useAuth, useAuthModal, useWishlist, useCart } from '../../hooks';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navigation = props => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');
  const { isAuth, logoutHandler, user } = useAuth();
  const { showModal } = useAuthModal();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const wishlistQty = wishlist.length;
  const cartItemsQty = cart.reduce((acc, el) => (acc += el.quantity), 0);

  useEffect(() => {
    theme === 'dark'
      ? document.querySelector('body').classList.add('dark-theme')
      : document.querySelector('body').classList.remove('dark-theme');
  }, [theme]);

  const themeHandler = e => {
    if (e.target.checked) {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
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
              onChange={themeHandler}
            />
            <label className="theme-toggle__label" htmlFor="theme-toggle">
              <span className="icon medium primary">
                <i
                  className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}
                ></i>
              </span>
            </label>
          </div>
        </li>

        {isAuth ? (
          <>
            <li className="list-item">
              <Link to="/wishlist">
                <div className="badge-container">
                  <button className="btn icon medium primary badge-counter">
                    <i className="fas fa-heart"></i>
                  </button>
                  {wishlistQty !== 0 && (
                    <span className="badge-number">{wishlistQty}</span>
                  )}
                </div>
              </Link>
            </li>

            <li className="list-item">
              <Link to="/cart">
                <div className="badge-container">
                  <button className="btn icon medium primary badge-counter">
                    <i className="fas fa-shopping-cart"></i>
                  </button>

                  {cartItemsQty !== 0 && (
                    <span className="badge-number">{cartItemsQty}</span>
                  )}
                </div>
              </Link>
            </li>

            <li className="profile-item list-item">
              <div className="avatar small">{user[0]}</div>

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
                <button onClick={logoutHandler} className="btn primary">
                  Logout
                </button>
              </div>
            </li>
          </>
        ) : (
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
