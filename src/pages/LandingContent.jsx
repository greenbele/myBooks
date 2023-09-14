import { Link, useNavigate } from 'react-router-dom';

import { dashboardURI, loginURI, signUpURI } from '../constants';
import { useEffect } from 'react';

/* eslint-disable react/prop-types */

const LandingContent = ({
  isLoading,
  isLoggedIn,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      // navigate to dashboard
      navigate(dashboardURI);
    }
  }, [isLoggedIn, navigate]);

  /*
  if (isLoggedIn) {
    return null;
  }
  */

  const loginLink = <Link to={loginURI}>Continue</Link>;
  const signupLink = <Link to={signUpURI}>Start writing them down</Link>;

  return (
    isLoading || isLoggedIn
    ?
    null
    :
    <>
      <h1>Welcome to myBooks!</h1>

      <p>
        Every idea is precious. Never forget any bit, but collect them all into something you can call &quo;my book&quo;
      </p>
      <p>Dont push the ideas aside any more - {signupLink}</p>
      <p>Already started a book? {loginLink}</p>
    </>
  );
};

export default LandingContent;
