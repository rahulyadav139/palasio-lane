import './EditEmail.css';
import { useInput, useFetch, useToast, useAuth } from '../../hooks';

const EditEmail = ({ onEdit }) => {
  const { sendData } = useFetch();
  const { setToast } = useToast();
  const { updateEmail } = useAuth();
  const {
    value: email,
    setIsTouched: emailIsTouched,
    isValid: emailIsValid,
    isInvalid: emailIsInvalid,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(
    value =>
      value.trim().length >= 4 &&
      value.trim().includes('@') &&
      value.trim().includes('.')
  );

  const emailClasses = !emailIsInvalid
    ? 'input-field responsive'
    : 'input-field responsive error';

  const submitFormHandler = async e => {
    e.preventDefault();

    if (!emailIsValid) return emailIsTouched(true);

    const { error, status } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/admin/update-email`,
      'POST',
      { updatedEmail: email.toLowerCase() },
      true
    );

    if (error)
      return setToast({
        status: true,
        type: 'danger',
        message: 'Something went wrong!',
      });

    if (status === 409) {
      return setToast({
        status: true,
        type: 'danger',
        message: 'Are you kidding me? This is a test account.',
      });
    }

    if (status === 403)
      return setToast({
        status: true,
        type: 'danger',
        message: 'This email is already registered!',
      });

    setToast({
      status: true,
      type: 'success',
      message: 'Email updated successfully!',
    });

    updateEmail(email.toLowerCase());

    onEdit(prev => ({ ...prev, email: false }));
  };

  return (
    <div>
      <form onSubmit={submitFormHandler} className="form-update-email">
        <label htmlFor="email" className="text-bold">
          Email
        </label>
        <input
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          className={emailClasses}
          id="email"
          type="email"
        />
        <button type="submit" className="btn primary">
          Update Email
        </button>
        <button
          onClick={() => onEdit(prev => ({ ...prev, email: false }))}
          type="submit"
          className="btn primary outline"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
export { EditEmail };
