// import React from 'react';
import { Link } from 'react-router-dom';
import hamburger from '../../assets/hamburger.png';
import './Header.css';

/* eslint-disable react/prop-types */
const Header = ({
  loggedIn,
  onAsideClick,
}) => {
  const loggedInHeader = (
    <ul>
      <li className="hamburger">
        <img onClick={onAsideClick} src={hamburger} alt="" />
      </li>
      <li className="logo">
        <Link to="/">
          myBooks
        </Link>
      </li>
      <li>
        <Link to="/home">
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/logout">
          Logout
        </Link>
      </li>
    </ul>
  );

  const loggedOutHeader = (
    <ul>
      <li className="logo">
        <Link to="/">
          myBooks
        </Link>
      </li>
      <li>
        <Link to="/login">
          Login
        </Link>
      </li>
      <li>
        <Link to="/signup">
          Sign up
        </Link>
      </li>
    </ul>
  );

  return (
    <header>
      <nav>
        {
          loggedIn ?
          loggedInHeader :
          loggedOutHeader
        }
      </nav>
    </header>
  );
};

export default Header;
