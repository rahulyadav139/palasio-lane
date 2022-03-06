import './Header.css';
import Navigation from './Navigation';

import SearchInput from './SearchInput';

const Header = props => {
  return (
    <header class="nav-bar shadow">
      <div class="hamburger-icon">
        <i class="bi bi-list"></i>
      </div>
      <div class="hamburger-menu__backdrop hidden"></div>
      <div class="hamburger-menu hamburger-menu--hide">
        <div class="brand">
          <span class="brand__logo">
            <i class="bi bi-hurricane"></i>
          </span>
          <span class="brand__text">PALASIO LANE</span>
        </div>
        <div class="hr-line fad"></div>
        <ul class="hamburger-menu__items">
          <li class="hamburger-menu__item">Home</li>
          <li class="hamburger-menu__item">My Profile</li>
          <li class="hamburger-menu__item">My Orders</li>
        </ul>
        <div class="btn-container">
          <button class="btn primary">
            <a href="/">Logout</a>
          </button>
        </div>

        <div class="btn-container">
          <button class="btn primary">
            <a href="./login.html">Login</a>
          </button>
          <button class="btn primary outline">
            <a href="./signup.html"></a>Signup
          </button>
        </div>
        <div class="hr-line fad"></div>
      </div>

      <div class="brand">
        <span class="brand__logo">
          <i class="bi bi-hurricane"></i>
        </span>
        <span class="brand__text">
          PALASIO
          <br />
          LANE
        </span>
      </div>

      <SearchInput />

      <Navigation />
    </header>
  );
};
export default Header;
