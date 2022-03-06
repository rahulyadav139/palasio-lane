import './Navigation.css';

const Navigation = props => {
  return (
    <nav>
      <ul class="list-items">
        <li>
          <div class="theme-toggle">
            <input
              type="checkbox"
              class="theme-toggle__checkbox"
              id="theme-toggle"
            />
            <label class="theme-toggle__label" for="theme-toggle">
              <span class="icon medium primary">
                <i class="fas fa-moon"></i> <i class="fas fa-sun hidden"></i>
              </span>
            </label>
          </div>
        </li>

        <li class="list-item">
          <div class="badge-container">
            <button class="btn icon medium primary badge-counter">
              <i class="fas fa-heart"></i>
            </button>
            <span class="badge-number">10</span>
          </div>
        </li>
        <li class="list-item">
          <div class="badge-container">
            <button class="btn icon medium primary badge-counter">
              <i class="fas fa-shopping-cart"></i>
            </button>
            <span class="badge-number">10</span>
          </div>
        </li>
        <li class="profile-item list-item">
          <div class="avatar small">
            <img
              src="https://i.picsum.photos/id/704/536/354.jpg?hmac=k_PDx86tD-ILOtsUOKY9t5LAL5ycKiQ4ryVdlxhWoek"
              alt="sample"
            />
          </div>

          <div class="profile-item-dropdown shadow">
            <ul>
              <li>
                <span class="icon primary small">
                  <i class="fas fa-user"></i>
                </span>
                <span>My Profile</span>
              </li>

              <li>
                <span class="icon primary small">
                  <i class="bi bi-box"></i>
                </span>
                <span>Orders</span>
              </li>
            </ul>
            <button class="btn primary">Logout</button>
          </div>
        </li>
        <li class="login-item">
          <button class="btn-login btn primary text-bold">Login</button>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
