import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import _ from 'lodash';
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
  BookModel,
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
      handleMaskEvent();
    } else {
      setAsideVisibility('hide');
      handleMaskEvent();
    }
  };

  /**
   * perform actions on successful sign up
   */
  const handleAuthSuccess = (loggedIn) => {
    setIsLoggedIn(loggedIn);
  };

  /**
   * perform requisite actions when user submits book form.
   *
   * Logic:
   *
   * 1 - collect bookTitle (0) and searchTags (1) field values
   *
   * 2 - send to backend service for validation and storage
   *
   * 3 -
   *   a - on success status (201), update BooksManager and call App's onBookCreation.
   *   Also update bookFormData in-memory to allow easy of update during a client session.
   *
   *   b - on failure, set error messages for [re-]rendering
   *
   * 4 - there might be need to reset form fields on success
   */
  const handleBookCreateFormSubmit = (e) => {
    e.preventDefault();

    // 1
    // TODO: notify user on success?
    const bookTitle = e.target[1].value;
    const searchTags = e.target[3].value;
    // clear input fields
    e.target[1].value = '';
    e.target[3].value = '';

    // 2

    // 3
    /* on success... */
    // update BooksManager
    const newBook = new BookModel();
    Object.seal(newBook);
    const bookCreateObj = {
      bookTitle,
      searchTags,
    };
    Object.assign(newBook, bookCreateObj);
    const err = BooksManager.addBook(newBook);
    if (err.length) {
      // book creation error; likely duplicate title
      return err;
    }

    // update state
    setBooks(_.cloneDeep(BooksManager.books));
    /* on failure... */

    // console.log(bookCreateObj); // SCAFF

    // no creation error (title duplicate)
    return [];
  };

  /**
   * perform actions on form submission.
   *
   * Logic:
   *
   * 1 - collect bookTitle and searchTags field values
   *
   * 2 - send data to backend for validation and update
   *
   * 3 -
   *   a - on success response, update BooksManager, App state, and [probably] bookFormData
   *   b - on failure, notify user
   *
   * 4 - remove mask (by calling App's handleMaskEvent)
   *
   * Note - it's ensured that at least one field is changed.
   */
  const handleBookEditFormSubmit = (e, oldBookTitle, setDisable/*, bookFormData */) => {
    e.preventDefault();

    // 1
    const newBookTitle = e.target[1].value;
    const newSearchTags = e.target[3].value;

    // 2 - validate client side?
    //  update BooksManager
    const updateData = {
      bookTitle: newBookTitle,
      searchTags: newSearchTags,
    };
    const err = BooksManager.updateBook(updateData, oldBookTitle);
    if (err.length) {
      // error messages present; likely duplicate book titles
      return err;
    }
    // update state
    setBooks(_.cloneDeep(BooksManager.books));
    // disable submit button manually on book update
    setDisable(true);

    // 3
    // update form data object
    // bookFormData.inputOneValue = bookTitle;
    // bookFormData.inputTwoValue = searchTags;

    // 4
    // handleMaskEvent();

    // console.log(updateData); // SCAFF

    // no title duplicate error
    return [];
  };

  /**
   * perform actions on book delete button click.
   */
  const handleBookDeleteButtonClick = (bookTitle) => {
    try {
      // update manager
      BooksManager.deleteBook(bookTitle);

      // update state
      setBooks(_.cloneDeep(BooksManager.books));

      // TODO: send to backend for update
    } catch (err) {
      console.log('ERROR - handleBookDeleteButtonClick:', err.toString()); // SCAFF
    }
  };

  // test feature

  const [isMaskDisplay, setIsMaskDisplay] = useState(false);

  const display = {
    width: '100vw',
    height: '100vh',
    display: 'block',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '999',
    backgroundColor: 'rgba(0,0,0,0.5)',
  };

  const noDisplay = {
    display: 'none',
  };

  /*
  const buttonDisplay = {
    display: 'block',
    zIndex: '1000',
  };
  */

  const maskStyle = isMaskDisplay ? display : noDisplay;

  const handleMaskEvent = () => {
    setIsMaskDisplay(!isMaskDisplay);
  };

  // end test feature

  return (
    <div className="App">
      {
      /*<button style={buttonDisplay} onClick={testFunction}>××××</button>*/
      }
      <div style={maskStyle}>
      </div>
      <Header
        isLoggedIn={isLoggedIn}
        onAsideClick={handleAsideClick}
      />

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
                    handleBookCreateFormSubmit={handleBookCreateFormSubmit}
                    handleBookEditFormSubmit={handleBookEditFormSubmit}
                    handleBookDeleteButtonClick={handleBookDeleteButtonClick}
                    BooksManager={BooksManager}
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
