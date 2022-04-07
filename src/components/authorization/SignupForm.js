import './AuthForm.css';
import {
  useInput,
  useAuth,
  useAuthModal,
  useFetch,
  useToast,
} from '../../hooks';
import { textFormatter } from '../../utils';
import { useState, Fragment } from 'react';

const SignupForm = props => {
  const { loginHandler } = useAuth();
  const { resetModal } = useAuthModal();
  const { sendData } = useFetch();
  const { setToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const passwordClasses = passwordIsInvalid
    ? 'input-field-icon responsive error'
    : 'input-field-icon responsive';

  const confirmPasswordClasses = confirmPasswordIsInvalid
    ? ' input-field-icon responsive error'
    : ' input-field-icon responsive';

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
      setToast({
        status: true,
        message: "password doesn't match",
        type: 'danger',
      });
      return;
    }

    const userData = {
      fullName: textFormatter(`${firstName} ${lastName}`),
      email,
      password,
    };

    const { data, error, status } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
      'PUT',
      userData,
      false
    );

    if (error) return;

    if (status === 409) {
      setToast({
        status: true,
        message: 'User is already registered!',
        type: 'danger',
      });
      return;
    }

    loginHandler(data.fullName, data.token, []);
    resetModal();
  };

  const showPasswordHandler = () => {
    setShowPassword(prev => !prev);
  };

  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(prev => !prev);
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

        <div className={passwordClasses}>
          <label>
            <input
              id="password"
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              type={showPassword ? 'text' : 'password'}
            />
            <span
              className="icon small btn-show-password"
              onClick={showPasswordHandler}
            >
              <i
                className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}
              ></i>
            </span>
          </label>
        </div>

        <label htmlFor="confirm-password">Confirm Password</label>

        <div className={confirmPasswordClasses}>
          <label>
            <input
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              id="confirm-password"
              className="input-field "
              type={showConfirmPassword ? 'text' : 'password'}
            />
            <span
              className="icon small btn-show-password"
              onClick={showConfirmPasswordHandler}
            >
              <i
                className={
                  showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                }
              ></i>
            </span>
          </label>
        </div>

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
    </Fragment>
  );
};
export default SignupForm;
