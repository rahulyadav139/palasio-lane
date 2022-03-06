import './AuthForm.css';

const SignupForm = props => {
  return (
    <form class="auth-form">
      <h1 class="text-primary">Sign up</h1>
      <div class="wrapper-username">
        <div>
          <label for="firstname">First Name</label>
          <input class="input-field" id="firstname" type="text" />
        </div>
        <div>
          <label for="lastname">Last Name</label>
          <input class="input-field" id="lastname" type="text" />
        </div>
      </div>
      <label for="email">Email</label>
      <input class="input-field" id="email" type="email" />
      <label for="password">Password</label>

      <input class="input-field" id="password" type="password" />
      <label for="confirm-password">Confirm Password</label>

      <input class="input-field" id="confirm-password" type="password" />

      <div class="flex end">
        <a class="link text-small" href="#">
          forgot password?
        </a>
      </div>
      <button type="button" class="btn primary">
        Signup
      </button>
      <p>
        Already a member?{' '}
        <span className="text-bold text-primary-dark">Login</span>
      </p>
    </form>
  );
};
export default SignupForm;
