import './AuthForm.css';
import { useInput, useAuth, useAuthModal } from '../../hooks';
import { textFormatter } from '../../utils';
import { useState, useEffect, Fragment } from 'react';
// import { useAuth } from '../../contexts/auth-context';
// import { useAuthModal } from '../../contexts/auth-modal-context';

const SignupForm = props => {
  const [toast, setToast] = useState(null);
  const { loginHandler } = useAuth();
  const { resetModal } = useAuthModal();

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

  const {
    value: firstName,
    setIsTouched: firstNameIsTouched,
    isValid: firstNameIsValid,
    isInvalid: firstNameIsInvalid,
    changeHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
  } = useInput(value => value.length !== 0);

  const {
    value: lastName,
    setIsTouched: lastNameIsTouched,
    isValid: lastNameIsValid,
    isInvalid: lastNameIsInvalid,
    changeHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
  } = useInput(value => value.length !== 0);

  const {
    value: email,
    setIsTouched: emailIsTouched,
    isValid: emailIsValid,
    isInvalid: emailIsInvalid,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput(value => value.includes('@') && value.includes('.'));

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

  const firstNameClasses = firstNameIsInvalid ? inValidClasses : validClasses;
  const lastNameClasses = lastNameIsInvalid ? inValidClasses : validClasses;
  const emailClasses = emailIsInvalid ? inValidClasses : validClasses;
  const passwordClasses = passwordIsInvalid ? inValidClasses : validClasses;
  const confirmPasswordClasses = confirmPasswordIsInvalid
    ? inValidClasses
    : validClasses;

  const submitFormHandler = async e => {
    e.preventDefault();

    if (
      !firstNameIsValid ||
      !lastNameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !confirmPasswordIsValid
    ) {
      firstNameIsTouched(true);
      lastNameIsTouched(true);
      emailIsTouched(true);
      passwordIsTouched(true);
      confirmPasswordIsTouched(true);
      return;
    }

    if (password !== confirmPassword) {
      console.log("password doesn't match");
      return;
    }

    const res = await fetch('https://palasio-lane.herokuapp.com/auth/signup', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: textFormatter(`${firstName} ${lastName}`),
        email,
        password,
      }),
    });

    if (res.status === 409) {
      setToast('User is already registered!');
      return;
    }

    const data = await res.json();

    loginHandler(data.token);
    resetModal();
  };

  return (
    <Fragment>
      <form onSubmit={submitFormHandler} className="auth-form">
        <h1 className="text-primary">Sign up</h1>
        <div className="wrapper-username">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              value={firstName}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              className={firstNameClasses}
              id="firstName"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              value={lastName}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              className={lastNameClasses}
              id="lastName"
              type="text"
            />
          </div>
        </div>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          className={emailClasses}
          id="email"
          type="email"
        />
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

        <div className="flex end">
          <span className="link text-small" href="#">
            forgot password?
          </span>
        </div>
        <button type="submit" className="btn primary">
          Signup
        </button>
        <p>
          Already a member?{' '}
          <span
            onClick={props.onSwitch}
            className="btn-switch text-bold text-primary-dark"
          >
            Login
          </span>
        </p>
      </form>
      {toast && (
        <div class="toast danger">
          <span class="icon small white">
            <i class="fas fa-bell"></i>
          </span>
          {` ${toast}`}
        </div>
      )}
    </Fragment>
  );
};
export default SignupForm;
