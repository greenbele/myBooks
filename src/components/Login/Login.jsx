/* eslint-disable react/prop-types */

/**
 * Renders the login form.
 */
const LoginForm = ({
  onLogin,
}) => {
  return (
    <form onSubmit={onLogin}>
      <fieldset>
        <legend>
          <label htmlFor="email">Email</label>
        </legend>
        <input type="email" id="email" name="email" />
      </fieldset>

      <fieldset>
        <legend>
          <label htmlFor="password">Password</label>
        </legend>
        <input type="password" id="password" name="password" />
      </fieldset>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
