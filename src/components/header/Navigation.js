import './Navigation.css';
import { useAuth } from '../../contexts/auth-context';
import { useAuthModal } from '../../contexts/auth-modal-context';

const Navigation = props => {
  const { isAuth, logoutHandler } = useAuth();


  const { showModal } = useAuthModal();
  // console.log(showModal);

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
            <label className="theme-toggle__label" for="theme-toggle">
              <span className="icon medium primary">
                <i className="fas fa-moon"></i>{' '}
                <i className="fas fa-sun hidden"></i>
              </span>
            </label>
          </div>
        </li>

        {isAuth && (
          <li className="list-item">
            <div className="badge-container">
              <button className="btn icon medium primary badge-counter">
                <i className="fas fa-heart"></i>
              </button>
              <span className="badge-number">10</span>
            </div>
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
              <button onClick={logoutHandler} className="btn primary">
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
