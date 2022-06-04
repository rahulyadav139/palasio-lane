import './ForgotPassword.css';
import { Modal } from '../ui/Modal';

import { useFetch, useToast, useInput } from '../../hooks';

const ForgotPassword = ({ onHideForgotPasswordModal }) => {
  const { sendData } = useFetch();
  const { setToast } = useToast();

  const {
    value: email,
    setIsTouched: emailIsTouched,
    isValid: emailIsValid,
    isInvalid: emailIsInvalid,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(
    value =>
      value.trim().length >= 4 && value.includes('@') && value.includes('.')
  );

  const resetPasswordHandler = async () => {
    if (!emailIsValid) {
      emailIsTouched(true);
      return;
    }

    const { error, status } = await sendData(
      process.env.REACT_APP_BACKEND_URL + '/auth/send-reset-token',
      'POST',
      { email },
      false
    );

    if (error)
      return setToast({
        status: true,
        type: 'danger',
        message: 'Something went wrong!',
      });

    if (status === 404)
      return setToast({
        status: true,
        type: 'danger',
        message: 'Invalid email address!',
      });

    if (status === 500)
      return setToast({
        status: true,
        type: 'danger',
        message: 'Server error!',
      });

    setToast({
      status: true,
      type: 'loading',
      message: 'Email sent!',
    });
    onHideForgotPasswordModal();
  };

  const emailClasses = emailIsInvalid
    ? 'input-field responsive error'
    : 'input-field responsive';

  return (
    <Modal onReset={onHideForgotPasswordModal}>
      <div className="modal shadow">
        <h3>Reset Password</h3>
        <p>Enter the email address you used when you created your account.</p>
        <input
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          className={emailClasses}
          id="email"
          type="email"
          placeholder="Email"
        />
        <button onClick={resetPasswordHandler} className="btn primary">
          Continue
        </button>
        <button
          onClick={onHideForgotPasswordModal}
          className="btn-modal-dismiss medium btn icon"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </Modal>
  );
};
export { ForgotPassword };
