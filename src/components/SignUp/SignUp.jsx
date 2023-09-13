// import * as React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signUpURI } from '../../constants';

/* eslint-disable react/prop-types */

/**
 * Renders the sign up form
 */
const SignUpForm = ({
  onFormSubmit,
}) => {
  return (
    <>
      <form onSubmit={onFormSubmit}>
        <fieldset>
          <legend>
            <label htmlFor="firstName">First Name</label>
          </legend>
          <input type="text" id="firstName" name="firstName" />
        </fieldset>

        <fieldset>
          <legend>
            <label htmlFor="lastName">Last Name</label>
          </legend>
          <input type="text" id="lastName" name="lastName" />
        </fieldset>

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

        <fieldset>
          <legend>
            <label htmlFor="confirmPassword">Confirm Password</label>
          </legend>
          <input type="password" id="confirmPassword" name="confirmPassword" />
        </fieldset>

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUpForm;
