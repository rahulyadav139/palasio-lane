import './AuthModal.css';
import { Modal } from '../ui/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';


const AuthModal = props => {
  const { isAuthTypeLogin, onReset, onSwitch } = props;

  return (
    <Modal onReset={onReset}>
      <div className="modal-login modal-auth shadow">
        <div className="modal-auth__brand flex center col">
          <div className="brand-logo">
            <i className="bi bi-hurricane"></i>
          </div>
          <h1 className="text-white">palasio lane</h1>
        </div>

        {isAuthTypeLogin ? (
          <LoginForm onSwitch={onSwitch} />
        ) : (
          <SignupForm onSwitch={onSwitch} />
        )}

        <button onClick={onReset} className="btn-dismiss btn icon medium">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </Modal>
  );
};
export { AuthModal };
