import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HamburgerNavigation.css';
import {
  useAuth,
  useAuthModal,
  useWishlist,
  useCart,
  useOrder,
  useToast,
} from '../../hooks';

const HamburgerNavigation = props => {
  const [isHamburgerNav, setIsHamburgerNav] = useState(false);
  const { isAuth, logoutHandler } = useAuth();
  const { showModal } = useAuthModal();
  const { getUpdatedCart } = useCart();
  const { getUpdatedWishlist } = useWishlist();
  const { resetOrderDetails } = useOrder();
  const { setToast } = useToast();

  const backdropClasses = isHamburgerNav
    ? 'hamburger-menu__backdrop'
    : 'hamburger-menu__backdrop hidden';

  const hamburgerMenuClasses = isHamburgerNav
    ? 'hamburger-menu'
    : 'hamburger-menu hamburger-menu--hide';

  const userLogoutHandler = () => {
    getUpdatedCart([]);
    getUpdatedWishlist([]);
    resetOrderDetails();
    logoutHandler();
    setIsHamburgerNav(false);
    setToast({
      status: true,
      type: 'success',
      message: 'Logout successfully!',
    });
  };

  const userLoginHandler = () => {
    setIsHamburgerNav(false);
    showModal();
  };

  return (
    <Fragment>
      <div
        onClick={() => setIsHamburgerNav(prev => !prev)}
        className="hamburger-icon"
      >
        <i className="bi bi-list"></i>
      </div>
      <div
        onClick={() => setIsHamburgerNav(prev => !prev)}
        className={backdropClasses}
      ></div>
      <div className={hamburgerMenuClasses}>
        <Link to="/">
          <div className="brand">
            <span className="brand__logo">
              <i className="bi bi-hurricane"></i>
            </span>
            <span className="brand__text">PALASIO LANE</span>
          </div>
        </Link>
        <div className="hr-line fad"></div>
        <ul className="hamburger-menu__items">
          <Link to="/">
            <li
              onClick={() => setIsHamburgerNav(false)}
              className="hamburger-menu__item"
            >
              Home
            </li>
          </Link>

          {isAuth && (
            <Link to="/profile">
              <li
                onClick={() => setIsHamburgerNav(false)}
                className="hamburger-menu__item"
              >
                My Profile
              </li>
            </Link>
          )}

          {isAuth && (
            <Link to="/">
              <li
                onClick={() => setIsHamburgerNav(false)}
                className="hamburger-menu__item"
              >
                My Orders
              </li>
            </Link>
          )}
        </ul>
        <div className="btn-container">
          {isAuth ? (
            <button onClick={userLogoutHandler} className="btn primary">
              Logout
            </button>
          ) : (
            <button onClick={userLoginHandler} className="btn primary">
              Login
            </button>
          )}
        </div>

        <div className="hr-line fad"></div>
      </div>
    </Fragment>
  );
};
export default HamburgerNavigation;
