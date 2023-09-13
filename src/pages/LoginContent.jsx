import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/Login/Login';

//import { initBooks } from '../constants';

/* eslint-disable react/prop-types */

/**
 * Render main content of login page
 */
const LoginContent = ({
  onLoginSuccess,
  isLoggedIn,
  isLoading,
}) => {
  const navigate = useNavigate();
  if (isLoggedIn) {
    // user already logged in; navigate home
    navigate('/');
  }

  /**
   * perform requisite actions on login success
   */
  const handleLogin = (e) => {
    e.preventDefault();

    // collect form data
    const email = e.target[1].value;
    const password = e.target[3].value;

    // package for transfer to backend
    const loginData = {
      email,
      password,
    };

    // perform action on login success
    onLoginSuccess(true);

    console.log(loginData); // SCAFF
  };

  // conditionally render form based on App status
  // note: on first App (which is ancestor of this component)...
  // ...render, isLoggedIn will be false, and isLoading true!
  return (
    isLoading
    ?
    null
    :
    <>
      <LoginForm onLogin={handleLogin} />
    </>
  );
};

export default LoginContent;
