import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BookFormData, loginURI } from '../constants';

import ChapterForm from '../components/BookDetail/ChapterForm/ChapterForm';
import ChapterList from '../components/BookDetail/ChapterList/ChapterList';
// import EditMenu from '../components/ChapterEdit/EditMenu';

import * as _ from "lodash";

/* eslint-disable react/prop-types */

/**
 * Puts all books components into a page.
 */
const BookDetailContent = ({
  isLoading,
  isLoggedIn,
  BooksManager,
  handleChapterCreateFormSubmit,
  handleChapterEditFormSubmit,
  handleChapterDeleteButtonClick,
}) => {
  const bookFormData = new BookFormData();
  Object.seal(bookFormData);

  // get dynamic bookTitle part of the matched URL
  const { bookTitle } = useParams();

  // use bookTitle to get book object of concern
  const book = _.find(BooksManager.books, ['bookTitle', bookTitle]);
  if (!book) {
    // no such book; TODO: something like navigating user to a 404 not found page
    console.log('ERROR - BookDetailContent: book not found'); // SCAFF
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(loginURI);
    }
  }, [isLoggedIn, navigate]);

  const introPara = `Each book you own is made up of zero or more chapters. On this page, you can see all current chapters of ${bookTitle}, create new, and update existing ones. Happy writing!`;

  /**
   * perform local actions when user submits book form.
   *
   * Logic:
   *
   * 1 - perform local actions and dispatch to App
   */
  const handleChapterCreateFormSubmitLocal = (e) => {
    const options = {
      e,
      bookTitle,
      bookFormData,
    };

    return handleChapterCreateFormSubmit(options);
  };

  // prepare form data for chapter creation
  const formData = {
    inputOneID: 'chapterTitle',
    inputOneLabel: 'Chapter title',
    inputOneName: 'chapterTitle',
    inputTwoID: 'searchTags',
    inputTwoLabel: 'Search Tags',
    inputTwoName: 'searchTags',
    buttonValue: 'Create',
  };

  Object.assign(bookFormData, formData);

  return (
    isLoading || !isLoggedIn || !book
    ?
    null
    :
    <>
      <h1>{bookTitle} Contents</h1>
      <p>{introPara}</p>

      <div>
        <h2>Create new chapter</h2>

        <ChapterForm
          onBookFormSubmit={handleChapterCreateFormSubmitLocal}
          bookFormData={bookFormData}
        />
      </div>

      {/* SCAFF */}
      {/*<EditMenu />*/}

      <ChapterList
        book={book}
        handleChapterEditFormSubmit={handleChapterEditFormSubmit}
        handleChapterDeleteButtonClick={handleChapterDeleteButtonClick}
      />
    </>
  );
};

export default BookDetailContent;
