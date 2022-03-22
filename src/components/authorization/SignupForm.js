import './AuthForm.css';

const SignupForm = props => {
  return (
    <form className="auth-form">
      <h1 className="text-primary">Sign up</h1>
      <div className="wrapper-username">
        <div>
          <label for="firstname">First Name</label>
          <input className="input-field" id="firstname" type="text" />
        </div>
        <div>
          <label for="lastname">Last Name</label>
          <input className="input-field" id="lastname" type="text" />
        </div>
      </div>
      <label for="email">Email</label>
      <input className="input-field" id="email" type="email" />
      <label for="password">Password</label>

      <input className="input-field" id="password" type="password" />
      <label for="confirm-password">Confirm Password</label>

      <input className="input-field" id="confirm-password" type="password" />

      <div className="flex end">
        <a className="link text-small" href="#">
          forgot password?
        </a>
      </div>
      <button type="button" className="btn primary">
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
