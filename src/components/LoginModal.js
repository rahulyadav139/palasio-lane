import './AuthModal.css';
import Modal from './ui/Modal';

const LoginModal = props => {
  return (
    <Modal>
      <div class="modal-login modal-auth shadow">
        <div class="modal-auth__brand flex center col">
          <div class="brand-logo">
            <i class="bi bi-hurricane"></i>
          </div>
          <h1 class="text-white">palasio lane</h1>
        </div>
        <form class="modal-auth__form">
          <h1 class="text-primary">Log in</h1>
          <label for="email">Email</label>
          <input class="input-field" id="email" type="email" />
          <label for="password">Password</label>

          <div class="input-field-icon">
            <label>
              <input type="password" />
              <span class="icon small">
                <i class="fas fa-eye"></i>
              </span>
            </label>
          </div>

          <div class="flex end">
            <a class="link text-small" href="#">
              forgot password?
            </a>
          </div>

          <button type="button" class="btn primary">
            Login
          </button>
          <p>
            New to palasio lane?
            <a href="./signup.html" class="btn-signup link primary">
              {' '}
              Sign up
            </a>
          </p>
        </form>
        <button class="btn-dismiss btn icon medium">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </Modal>
  );
};
export default LoginModal;
