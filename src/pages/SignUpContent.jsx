import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { dashboardURI } from '../constants';

import SignUpForm from '../components/SignUp/SignUp';
import Notification from '../components/Notification/Notification';

/* eslint-disable react/prop-types */

/* Renders the signup page main content */
const SignUpContent = ({
  onSignUpSuccess,
  isLoggedIn,
  isLoading,
}) => {
  const [err, setErr] = React.useState([]);

  const navigate = useNavigate();
  React.useEffect(() => {
    if (isLoggedIn) {
      // navigate home instead
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  /**
   * handles sign up form submission
   */
  const handleSignUp = (e) => {
    e.preventDefault();

    // collect values of firstName, lastName, email,
    // ...password, and confirmPassword fields
    const firstName = e.target[1].value;
    const lastName = e.target[3].value;
    const email = e.target[5].value;
    const password = e.target[7].value;
    const confirmPassword = e.target[9].value;

    let errArray = [];

    // collect error messages, if any
    if (password !== confirmPassword) {
      errArray.push('Ensure `password` and `confirmPassword` match');
      console.log(err); // SCAFF
      // navigate('/');
    }

    // set error messages to display, if any
    setErr(errArray);

    // data for transfer to backend
    const dataObj = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    // perform actions on sign up success
    onSignUpSuccess(true);
    navigate(dashboardURI);

    console.log('Collect all form controls\' values, do requisite validation, and submit to backend.'); // SCAFF
    // console.log(Object.entries(e.target[1].name)); // SCAFF
    // console.log(Object.entries(e.target[1].name)); // SCAFF
    console.log(dataObj); // SCAFF
  };

  // conditionally render form based on App status
  // note: on first App (which is ancestor of this component)...
  // ...render, isLoggedIn will be false, and isLoading true!
  return (
    isLoading || isLoggedIn
    ?
    null
    :
    <>
      {err.length ? <Notification messages={err} /> : null }

      <SignUpForm onFormSubmit={handleSignUp} />
    </>
  );
};

export default SignUpContent;
