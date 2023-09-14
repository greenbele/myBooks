import { useNavigate } from 'react-router-dom';

import DashboardHome from '../components/DashboardHome/DashboardHome';

import { loginURI } from '../constants';
import { useEffect } from 'react';

/* eslint-disable react/prop-types */

let n = 0; // SCAFF

const DashboardHomeContent = ({
  BooksManager,
  isLoading,
  isLoggedIn,
}) => {
  console.log(n++); // SCAFF

  // redirect a logged-out user on component [re-]render
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(loginURI);
    }
  }, [isLoggedIn, navigate]);

  // if user is logged out, render nothing at first,
  // ...and redirect them afterward via useEffect.
  return (
    isLoading || !isLoggedIn
    ?
    null
    :
    <>
      <DashboardHome BooksManager={BooksManager} />
    </>
  );
};

export default DashboardHomeContent;
