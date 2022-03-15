import './AuthForm.css';

const LoginForm = props => {
  return (
    <form className="auth-form">
      <h1 className="text-primary">Log in</h1>
      <label for="email">Email</label>
      <input className="input-field" id="email" type="email" />
      <label for="password">Password</label>

      <div className="input-field-icon">
        <label>
          <input type="password" />
          <span className="icon small">
            <i className="fas fa-eye"></i>
          </span>
        </label>
      </div>

      <div className="flex end">
        <a className="link text-small" href="#">
          forgot password?
        </a>
      </div>

      <button type="button" className="btn primary">
        Login
      </button>
      <p>
        New to palasio lane?{' '}
        <span className="text-bold text-primary-dark">Sign up</span>
      </p>
    </form>
  );
};
export default LoginForm;
