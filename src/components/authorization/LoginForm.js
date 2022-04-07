import './AuthForm.css';
import {
  useInput,
  useAuth,
  useAuthModal,
  useWishlist,
  useCart,
  useFetch,
  useToast,
} from '../../hooks';
import { useState } from 'react';

const LoginForm = props => {
  const { loginHandler } = useAuth();
  const { resetModal } = useAuthModal();
  const { getUpdatedWishlist } = useWishlist();
  const { getUpdatedCart } = useCart();
  const { sendData } = useFetch();
  const { setToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
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
  } = useInput(value => value.length !== 0);

  const emailClasses = emailIsInvalid
    ? 'input-field responsive error'
    : 'input-field responsive';
  const passwordClasses = passwordIsInvalid
    ? 'input-field-icon responsive error'
    : 'input-field-icon responsive';

  const submitHandler = async e => {
    e.preventDefault();

    if (!emailIsValid || !passwordIsValid) {
      emailIsTouched(true);
      passwordIsTouched(true);
      return;
    }

    const { data, status, error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      'POST',
      { email, password },
      false
    );

    if (error)
      return setToast({
        status: true,
        message: 'Something went wrong!',
        type: 'danger',
      });

    if (status === 404) {
      return setToast({
        status: true,
        message: 'User not found',
        type: 'danger',
      });
    }

    if (status === 401) {
      return setToast({
        status: true,
        message: 'Invalid password',
        type: 'danger',
      });
    }

    loginHandler(data.fullName, data.token, data.addresses);

    getUpdatedWishlist(data.wishlist);

    getUpdatedCart(data.cart);

    resetModal();
  };

  const guestLoginHandler = async () => {
    const { data, error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      'POST',
      {
        email: process.env.REACT_APP_GUEST_LOGIN_USERNAME,
        password: process.env.REACT_APP_GUEST_LOGIN_PASSWORD,
      },
      false
    );

    if (error)
      return setToast({
        status: true,
        message: 'Something went wrong!',
        type: 'danger',
      });

    console.log(data);

    loginHandler(data.fullName, data.token, data.addresses);

    getUpdatedWishlist(data.wishlist);

    getUpdatedCart(data.cart);

    resetModal();
  };

  const showPasswordHandler = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <form onSubmit={submitHandler} className="auth-form">
      <h1 className="text-primary">Log in</h1>
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
            <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
          </span>
        </label>
      </div>

      <div className="flex end">
        <span className="link text-small" href="#">
          forgot password?
        </span>
      </div>

      <button type="submit" className="btn primary">
        Login
      </button>

      <button
        onClick={guestLoginHandler}
        type="button"
        className="btn outline primary"
      >
        Guest Login
      </button>
      <p>
        New to palasio lane?{' '}
        <span
          onClick={props.onSwitch}
          className="btn-switch text-bold text-primary-dark"
        >
          Sign up
        </span>
      </p>
    </form>
  );
};
export default LoginForm;
