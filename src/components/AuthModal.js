import './AuthModal.css';
import Modal from './ui/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const LoginModal = props => {
  const isLogin = props.isLogin;
  return (
    <Modal>
      <div class="modal-login modal-auth shadow">
        <div class="modal-auth__brand flex center col">
          <div class="brand-logo">
            <i class="bi bi-hurricane"></i>
          </div>
          <h1 class="text-white">palasio lane</h1>
        </div>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <button class="btn-dismiss btn icon medium">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </Modal>
  );
};
export default LoginModal;
