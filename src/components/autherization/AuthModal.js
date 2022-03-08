import './AuthModal.css';
import Modal from './ui/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const LoginModal = props => {
  const isLogin = props.isLogin;
  return (
    <Modal>
      <div className="modal-login modal-auth shadow">
        <div className="modal-auth__brand flex center col">
          <div className="brand-logo">
            <i className="bi bi-hurricane"></i>
          </div>
          <h1 className="text-white">palasio lane</h1>
        </div>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <button className="btn-dismiss btn icon medium">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </Modal>
  );
};
export default LoginModal;
