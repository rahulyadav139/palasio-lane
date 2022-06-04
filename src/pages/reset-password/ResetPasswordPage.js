import './ResetPasswordPage.css';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useInput, useFetch, useToast, useLoading } from '../../hooks';
import { useEffect, useState } from 'react';
import { PageNotFound } from '../page-not-found/PageNotFound';

const ResetPasswordPage = props => {
  const [userId, setUserId] = useState('');
  const { sendData } = useFetch();
  const navigate = useNavigate();
  const { setToast } = useToast();
  const { passwordToken } = useParams();
  const { loading } = useLoading();

  useEffect(() => {
    (async () => {
      const { data, error, status } = await sendData(
        process.env.REACT_APP_BACKEND_URL + '/auth/check-reset-token',
        'POST',
        { passwordToken },
        false
      );

      if (error)
        return setToast({
          status: true,
          type: 'danger',
          message: 'Something went wrong!',
        });

      if (status === 404) return setUserId(null);

      setUserId(data.userId);
    })();
  }, []);

  const {
    value: password,
    setIsTouched: passwordIsTouched,
    isValid: passwordIsValid,
    isInvalid: passwordIsInvalid,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput(value => value.length >= 6);

  const {
    value: confirmPassword,
    setIsTouched: confirmPasswordIsTouched,
    isValid: confirmPasswordIsValid,
    isInvalid: confirmPasswordIsInvalid,
    changeHandler: confirmPasswordChangeHandler,
    blurHandler: confirmPasswordBlurHandler,
  } = useInput(value => value.length >= 6);

  const validClasses = 'input-field responsive';
  const inValidClasses = 'input-field responsive error';

  const passwordClasses = passwordIsInvalid ? inValidClasses : validClasses;
  const confirmPasswordClasses = confirmPasswordIsInvalid
    ? inValidClasses
    : validClasses;

  const resetPasswordHandler = async e => {
    e.preventDefault();

    if (!passwordIsValid || !confirmPasswordIsValid) {
      passwordIsTouched(true);
      confirmPasswordIsTouched(true);
      return;
    }

    const regexSmallLater = /[a-z]/g;
    const regexCapitalLater = /[A-Z]/g;
    const regexSpecialChar = /[^a-zA-Z0-9]/g;

    if (
      !password.match(regexSmallLater) ||
      !password.match(regexCapitalLater) ||
      !password.match(regexSpecialChar)
    ) {
      setToast({
        type: 'danger',
        status: true,
        message:
          'Password should be at least 6 characters long and includes capital letter, small letter and special character! ',
      });
      return;
    }

    if (password !== confirmPassword) {
      setToast({
        status: true,
        message: "password doesn't match",
        type: 'danger',
      });
      return;
    }

    const { error } = await sendData(
      process.env.REACT_APP_BACKEND_URL + '/auth/reset-password',
      'POST',
      { newPassword: password, userId },
      false
    );

    if (error) {
      setToast({
        status: true,
        message: 'Something went wrong!',
        type: 'danger',
      });
      return;
    }

    navigate('/');

    setToast({
      status: true,
      type: 'success',
      message: 'Reset password successfully!',
    });
  };
  return (
    <>
      {!loading && userId && (
        <main className="main">
          <div className="brand reset-page-brand">
            <Link to="/">
              <span className="brand__logo">
                <i className="bi bi-hurricane"></i>
              </span>
              <span className="brand__text"> PALASIO LANE</span>
            </Link>
          </div>
          <div className="heading-4">Reset Password</div>
          <div className="hr-line fad"></div>
          <form onSubmit={resetPasswordHandler} className="reset-password-form">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              className={passwordClasses}
              id="password"
              type="password"
            />
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              className={confirmPasswordClasses}
              id="confirm-password"
              type="password"
            />
            <button type="submit" className="btn primary">
              Reset Password
            </button>
            <Link to="/">
              <button type="button" className="btn outline primary">
                Cancel
              </button>
            </Link>
          </form>
        </main>
      )}

      {userId === null && <PageNotFound />}
    </>
  );
};
export { ResetPasswordPage };
