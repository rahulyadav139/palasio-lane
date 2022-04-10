import './ChangePassword.css';
import { useInput, useToast, useFetch } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const ChangePassword = props => {
  const { setToast } = useToast();
  const { sendData } = useFetch();
  const navigate = useNavigate();

  const {
    value: oldPassword,
    setIsTouched: oldPasswordIsTouched,
    isValid: oldPasswordIsValid,
    isInvalid: oldPasswordIsInvalid,
    changeHandler: oldPasswordChangeHandler,
    blurHandler: oldPasswordBlurHandler,
  } = useInput(value => value.trim().length >= 6);

  const {
    value: newPassword,
    setIsTouched: newPasswordIsTouched,
    isValid: newPasswordIsValid,
    isInvalid: newPasswordIsInvalid,
    changeHandler: newPasswordChangeHandler,
    blurHandler: newPasswordBlurHandler,
  } = useInput(value => value.trim().length >= 6);

  const {
    value: confirmNewPassword,
    setIsTouched: confirmNewPasswordIsTouched,
    isValid: confirmNewPasswordIsValid,
    isInvalid: confirmNewPasswordIsInvalid,
    changeHandler: confirmNewPasswordChangeHandler,
    blurHandler: confirmNewPasswordBlurHandler,
  } = useInput(value => value.trim().length >= 6);

  const validClasses = 'input-field responsive';
  const inValidClasses = 'input-field responsive error';

  const oldPasswordClasses = oldPasswordIsInvalid
    ? inValidClasses
    : validClasses;
  const newPasswordClasses = newPasswordIsInvalid
    ? inValidClasses
    : validClasses;
  const confirmNewPasswordClasses = confirmNewPasswordIsInvalid
    ? inValidClasses
    : validClasses;

  const submitFormHandler = async e => {
    e.preventDefault();

    if (
      !oldPasswordIsValid ||
      !newPasswordIsValid ||
      !confirmNewPasswordIsValid
    ) {
      oldPasswordIsTouched(true);
      newPasswordIsTouched(true);
      confirmNewPasswordIsTouched(true);
      return;
    }
    const regexSmallLater = /[a-z]/g;
    const regexCapitalLater = /[A-Z]/g;
    const regexSpecialChar = /[^a-zA-Z0-9]/g;

    if (
      !newPassword.match(regexSmallLater) ||
      !newPassword.match(regexCapitalLater) ||
      !newPassword.match(regexSpecialChar)
    ) {
      return setToast({
        type: 'danger',
        status: true,
        message:
          'Password should be at least 6 characters long and includes capital letter, small letter and special character! ',
      });
    }

    if (newPassword !== confirmNewPassword)
      return setToast({
        status: true,
        type: 'danger',
        message: "Password doesn't match!",
      });

    const { error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/admin/change-password`,
      'POST',
      { newPassword },
      true
    );

    if (error)
      return setToast({
        status: true,
        type: 'danger',
        message: 'Something went wrong!',
      });

    setToast({
      status: true,
      type: 'success',
      message: 'Password changes successfully!',
    });

    navigate('/profile');
  };
  return (
    <form onSubmit={submitFormHandler} className="form-change-password">
      <label htmlFor="old-password" className="text-bold">
        Old Password
      </label>
      <input
        value={oldPassword}
        onChange={oldPasswordChangeHandler}
        onBlur={oldPasswordBlurHandler}
        className={oldPasswordClasses}
        id="old-password"
        type="password"
      />
      <label htmlFor="new-password" className="text-bold">
        New Password
      </label>
      <input
        value={newPassword}
        onChange={newPasswordChangeHandler}
        onBlur={newPasswordBlurHandler}
        className={newPasswordClasses}
        id="new-password"
        type="password"
      />
      <label htmlFor="confirm-new-password" className="text-bold">
        Confirm New Password
      </label>
      <input
        value={confirmNewPassword}
        onChange={confirmNewPasswordChangeHandler}
        onBlur={confirmNewPasswordBlurHandler}
        className={confirmNewPasswordClasses}
        id="confirm-new-password"
        type="password"
      />
      <button className="btn primary">Update Password</button>
    </form>
  );
};
export { ChangePassword };
