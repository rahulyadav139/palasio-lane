import './AuthForm.css';

const LoginForm = props => {
  return (
    <form class="auth-form">
      <h1 class="text-primary">Log in</h1>
      <label for="email">Email</label>
      <input class="input-field" id="email" type="email" />
      <label for="password">Password</label>

      <div class="input-field-icon">
        <label>
          <input type="password" />
          <span class="icon small">
            <i class="fas fa-eye"></i>
          </span>
        </label>
      </div>

      <div class="flex end">
        <a class="link text-small" href="#">
          forgot password?
        </a>
      </div>

      <button type="button" class="btn primary">
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
