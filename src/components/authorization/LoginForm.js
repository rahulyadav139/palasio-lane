import './AuthForm.css';
import {
  useInput,
  useAuth,
  useAuthModal,
  useWishlist,
  useCart,
} from '../../hooks';

const LoginForm = props => {
  const { loginHandler } = useAuth();
  const { resetModal } = useAuthModal();
  const { getUpdatedWishlist } = useWishlist();
  const { getUpdatedCart } = useCart();
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

    const res = await fetch('https://palasio-lane.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 404) {
      return console.log('user not found');
    }

    if (res.status === 401) {
      return console.log('invalid password');
    }

    const data = await res.json();

    loginHandler(data.token);

    getUpdatedWishlist(data.wishlist);

    getUpdatedCart(data.cart);

    resetModal();
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
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            type="password"
          />
          <span className="icon small">
            <i className="fas fa-eye"></i>
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
