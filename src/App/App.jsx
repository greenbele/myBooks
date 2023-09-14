import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { initBooks } from '../constants';

import './App.css';

import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Aside from '../components/Aside/Aside.jsx';

import SignUpContent from '../pages/SignUpContent';
import LoginContent from '../pages/LoginContent';
import DashboardHomeContent from '../pages/DashboardHomeContent';
import LandingContent from '../pages/LandingContent';
import BookContent from '../pages/BookContent';

import {
  signUpURI,
  loginURI,
  realDataFullURI,
  BooksManager,
  booksURI,
} from '../constants';

import BooksService from '../services/backend';

// import axios from 'axios';
// import { sortBy } from 'lodash';

/* eslint-disable react/prop-types */

const App = () => {
  const [books, setBooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [asideVisibility, setAsideVisibility] = React.useState('hide');

  useEffect(() => {
    async function fetchData() {
      // fetch potential user data
      try {
        const res = await BooksService.getBooks(realDataFullURI);
        // successfull data fetch; status code in 2xx range
        BooksManager.initBooksManager(res.data.data);
        setBooks(res.data.data);
        setIsLoggedIn(true);
      } catch (err) {
        if (err.status == 401) {
          setIsLoggedIn(false);
        } else {
          console.log(`ERROR: ${err.toString()}`); // SCAFF
        }
      }
    }

    fetchData();

    setIsLoading(false);
  }, [isLoggedIn, isLoading]);

  /**
   * event handler for clicking on hamburger
   */
  const handleAsideClick = () => {
    if (asideVisibility === 'hide') {
      setAsideVisibility('show');
    } else {
      setAsideVisibility('hide');
    }
  };

  /**
   * perform actions on successful sign up
   */
  const handleAuthSuccess = (loggedIn) => {
    setIsLoggedIn(loggedIn);
  };

  /**
   * perform actions on successfull book creation.
   *
   * Logic:
   *
   * 1 - BooksManager should have been updated from BookContent component, so use it to setBooks
   */
  const handleBookCreation = () => {
    // 1

    console.log('handling book creation...'); // SCAFF
  };

  return (
    <div className="App">
      <Header loggedIn={isLoggedIn} onAsideClick={handleAsideClick} />

      <main>
        {
          isLoading
          ?
          <p>Loading...</p>
          :
          <Routes>
            <Route
              path='/home'
              element={
                <DashboardHomeContent
                  BooksManager={BooksManager}
                  isLoading={isLoading}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path='/'
              element={
                <LandingContent
                  isLoading={isLoading}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route path={booksURI}>
              <Route
                index
                element={
                  <BookContent
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    onBookCreation={handleBookCreation}
                  />
                }
              />
            </Route>

            <Route
              path={signUpURI}
              element={
                <SignUpContent
                  onSignUpSuccess={handleAuthSuccess}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                />
              }
            />

            <Route
              path={loginURI}
              element={
                <LoginContent
                  onLoginSuccess={handleAuthSuccess}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                />
              }
            />

            <Route path="*"
            />
          </Routes>
        }
      </main>

      <Aside books={books} onAsideClick={handleAsideClick} asideVisibility={asideVisibility} />

      <Footer />
    </div>
  );
};

export default App;
