import './ForgotPassword.css';
import { Modal } from '../ui/Modal';

const ForgotPassword = ({ onHideForgotPasswordModal }) => {
  return (
    <Modal onReset={onHideForgotPasswordModal}>
      <div class="modal shadow">
        <h3>Reset Password</h3>
        <p>Enter the email address you used when you created your account.</p>
        <input class="input-field" placeholder="Email address" type="text" />
        <button class="btn primary">Continue</button>
        <button
          onClick={onHideForgotPasswordModal}
          class="btn-modal-dismiss medium btn icon"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </Modal>
  );
};
export { ForgotPassword };
