import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import _ from 'lodash';
// import { initBooks } from '../constants';

import './App.scss';

import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Aside from '../components/Aside/Aside.jsx';

import SignUpContent from '../pages/SignUpContent';
import LoginContent from '../pages/LoginContent';
import DashboardHomeContent from '../pages/DashboardHomeContent';
import LandingContent from '../pages/LandingContent';
import BookSummaryContent from '../pages/BookSummaryContent';
import BookDetailContent from '../pages/BookDetailContent';
import ChapterViewContent from '../pages/ChapterViewContent';
import ChapterEditContent from '../pages/ChapterEditContent';

import {
  signUpURI,
  loginURI,
  realDataFullURI,
  BooksManager,
  booksURI,
  BookModel,
  ChapterModel,
} from '../constants';

import BooksService from '../services/backend';

// import axios from 'axios';
// import { sortBy } from 'lodash';

/* eslint-disable react/prop-types */

// let asideCount = 0;

const App = () => {
  localStorage.setItem('App', _.now()); // SCAFF
  console.log('Rendering App...'); // SCAFF

  const [books, setBooks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [asideVisibility, setAsideVisibility] = React.useState('hide');
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // fetch potential user data
      try {
        // get response object
        const res = await BooksService.getBooks(realDataFullURI);
        // successfull data fetch; status code in 2xx range
        BooksManager.initBooksManager(res.data.data);
        // save books updater function in manager
        BooksManager.setAppBooks = setBooks;
        setBooks(res.data.data);
        setIsLoggedIn(true);
      } catch (err) {
        if (err.status == 401) {
          setIsLoggedIn(false);
        } else {
          console.log(`ERROR - App:useEffect:fetchData: ${err.toString()}`); // SCAFF
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
      // register the hide event handler, and the arg(s) to call it with
      const handler = [setAsideVisibility, 'hide'];
      setActiveEvent(handler);
      // show sidebar
      setAsideVisibility('show');
      // turn background mask on
      setIsMaskDisplay(true);

      // console.log('App:handleAsideClick: #####->', asideVisibility); // SCAFF
    } else {
      // setAsideVisibility('hide');
      handleMaskEvent(); // will hide both mask and element
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
   *   a - on success status (201), update BooksManager and App state
   *
   *   b - on failure, set error messages for [re-]rendering
   *
   * 4 - there might be need to reset form fields on success
   */
  const handleBookCreateFormSubmit = (e) => {
    e.preventDefault();

    // 1
    // TODO: notify user on success?
    const bookTitle = e.target[0].value;
    const searchTags = e.target[1].value;
    // clear input fields
    e.target[0].value = '';
    e.target[1].value = '';

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
   * perform actions when user submits chapter creation form.
   *
   * Logic:
   *
   * 1 - collect chapterTitle (0) and searchTags (1) field values
   *
   * 2 - send to backend service for validation and storage
   *
   * 3 -
   *   a - on success status (201), update BooksManager and App state
   *
   *   b - on failure, set error messages for [re-]rendering
   *
   * 4 - there might be need to reset form fields on success
   */
  const handleChapterCreateFormSubmit = ({
    e,
    bookTitle,
  }) => {
    e.preventDefault();

    // 1
    // TODO: notify user on success?
    const chapterTitle = e.target[0].value;
    const searchTags = e.target[1].value;
    // clear input fields
    e.target[0].value = '';
    e.target[1].value = '';

    // 2

    // 3
    /* on success... */
    // update BooksManager
    const newChapter = new ChapterModel();
    Object.seal(newChapter);
    const chapterCreateObj = {
      chapterTitle,
      searchTags,
    };
    Object.assign(newChapter, chapterCreateObj);
    const options = {
      bookTitle,
    };
    const err = BooksManager.addChapter(newChapter, options);
    if (err.length) {
      // book creation error; likely duplicate title
      return err;
    }

    // update state
    setBooks(_.cloneDeep(BooksManager.books));
    /* on failure... */

    // console.log(chapterCreateObj); // SCAFF

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
    const newBookTitle = e.target[0].value;
    const newSearchTags = e.target[1].value;

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
    handleMaskEvent();

    // console.log(updateData); // SCAFF

    // no title duplicate error
    return [];
  };

  /**
   * perform actions on form submission.
   *
   * Logic:
   *
   * 1 - collect chapterTitle and searchTags field values
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
  const handleChapterEditFormSubmit = ({
    e,
    bookTitle,
    oldChapterTitle,
    setDisable,
  }) => {
    e.preventDefault();

    // 1
    const newChapterTitle = e.target[0].value;
    const newSearchTags = e.target[1].value;

    // 2 - validate client side?
    //  update BooksManager
    const updateData = {
      chapterTitle: newChapterTitle,
      searchTags: newSearchTags,
    };
    const options = {
      bookTitle,
      oldChapterTitle,
    };
    const err = BooksManager.updateChapter(updateData, options);
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
    handleMaskEvent();

    // console.log(updateData); // SCAFF

    // no title duplicate error
    return [];
  };

  /**
   * handle submission of element edit form.
   */
  const handleElementEditFormSubmit = (e, {
    setIsToolbarDisabled,
    setIsEditing,
    setIsSubmitButtonDisabled,
    ...options
  }) => {
    e.preventDefault();

    //console.log(options, e.target[0].value); // SCAFF

    // get edited content
    const content = e.target[0].value;

    // update book manager
    BooksManager.updatePageContent(content, options);

    // update App state
    setBooks(_.cloneDeep(BooksManager.books));

    // manually update page edit-related states
    setIsEditing(false);
    setIsToolbarDisabled(false);
    setIsSubmitButtonDisabled(true);
  };

  /**
   * handle element creation event.
   */
  const handleElementCreateToolbarButtonClick = (tagName, options) => {
    // update books manager
    BooksManager.addPageContent(tagName, options);

    // update App
    setBooks(_.cloneDeep(BooksManager.books));
  };

  /**
   * handle element order change.
   */
  const handleElementOrderChange = (orderOne, orderTwo, options) => {
    try {
      // update manager
      BooksManager.changeElementOrder(orderOne, orderTwo, options);

      // update App
      setBooks(_.cloneDeep(BooksManager.books));
    } catch (err) {
      console.log('ERROR - App:handleElementOrderChange:', err.toString()); // SCAFF
    }
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

  /**
   * perform actions on chapter delete button click.
   */
  const handleChapterDeleteButtonClick = ({
    chapterTitle,
    bookTitle,
  }) => {
    try {
      // update manager
      const options = {
        bookTitle,
      };
      BooksManager.deleteChapter(chapterTitle, options);

      // update App state
      setBooks(_.cloneDeep(BooksManager.books));

      // TODO: send to backend for update
    } catch (err) {
      console.log('ERROR - handleChapterDeleteButtonClick:', err.toString()); // SCAFF
    }
  };

  /**
   * perform actions on toolbar delete button click.
   */
  const handleToolbarDeleteButtonClick = (orderNum, options) => {
    // update books manager
    BooksManager.deletePageElement(orderNum, options);

    // update App
    setBooks(_.cloneDeep(BooksManager.books));
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
    // console.log('App:handleMaskEvent: #####->', asideVisibility, activeEvent); // SCAFF

    // hide mask
    setIsMaskDisplay(!isMaskDisplay);
    // hide active element;
    activeEvent[0](activeEvent[1]); // 0 - function; 1 - arg
    // reset active state
    setActiveEvent(null);
  };

  // end test feature

  // methods for dealing with background mask-related events
  const maskMethods = {
    setIsMaskDisplay,
    setActiveEvent,
    onMaskEvent: handleMaskEvent,
  };

  return (
    <div className="App">
      {/* background mask */}
      <div
        style={maskStyle}
        onClick={handleMaskEvent}
      >
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
              {/* books home route */}
              <Route
                index
                element={
                  <BookSummaryContent
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    handleBookCreateFormSubmit={handleBookCreateFormSubmit}
                    handleBookEditFormSubmit={handleBookEditFormSubmit}
                    handleBookDeleteButtonClick={handleBookDeleteButtonClick}
                    BooksManager={BooksManager}
                    maskMethods={maskMethods}
                  />
                }
              />

              {/* individual book routes */}
              <Route
                path={`${booksURI}/:bookTitle`}
                element={
                  <BookDetailContent
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    handleChapterCreateFormSubmit={handleChapterCreateFormSubmit}
                    handleChapterEditFormSubmit={handleChapterEditFormSubmit}
                    handleChapterDeleteButtonClick={handleChapterDeleteButtonClick}
                    BooksManager={BooksManager}
                    maskMethods={maskMethods}
                  />
                }
              />

              <Route
                path={`:bookTitle/chapters/:chapterTitle`}
                element={
                  <ChapterViewContent
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    BooksManager={BooksManager}
                  />
                }
              />

              <Route
                path={`:bookTitle/chapters/:chapterTitle/edit`}
                element={
                  <ChapterEditContent
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    BooksManager={BooksManager}
                    onElementEditFormSubmit={handleElementEditFormSubmit}
                    onElementOrderChange={handleElementOrderChange}
                    onToolbarDeleteButtonClick={handleToolbarDeleteButtonClick}
                    onElementCreateToolbarButtonClick={handleElementCreateToolbarButtonClick}
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

      {
        isLoggedIn
        ? <Aside books={books} onAsideClick={handleAsideClick} asideVisibility={asideVisibility} />
        : null
      }

      <Footer />
    </div>
  );
};

export default App;
