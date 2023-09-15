import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BookFormData, loginURI } from '../constants';

import BookForm from '../components/Books/BookForm/BookForm';
import BookList from '../components/Books/BookList/BookList';

/* eslint-disable react/prop-types */

const bookFormData = new BookFormData();

/**
 * Puts all books components into a page.
 */
const BookContent = ({
  isLoading,
  isLoggedIn,
  onBookCreation,
  BooksManager,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(loginURI);
    }
  }, [isLoggedIn, navigate]);

  const introPara = 'Here you can see all your current books, and have the opportunity of creating new ones.';

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
  const handleBookFormSubmit = (e) => {
    e.preventDefault();

    // 1
    // TODO: notify user on success?
    const bookTitle = e.target[1].value;
    const searchTags = e.target[3].value;
    // clear input fields
    e.target[1].value = '';
    e.target[3].value = '';

    // 2
    const bookData = {
      bookTitle,
      searchTags,
    };

    // 3
    onBookCreation();
    bookFormData.inputOneValue = bookTitle;
    bookFormData.inputTwoValue = searchTags;

    console.log(bookData); // SCAFF
  };

  if (!bookFormData.inputOneID) {
    // new form data object; customize
    bookFormData.inputOneID = 'bookTitle';
    bookFormData.inputOneLabel = 'Book title';
    bookFormData.inputOneName = 'bookTitle';

    bookFormData.inputTwoID = 'searchTags';
    bookFormData.inputTwoLabel = 'Search Tags';
    bookFormData.inputTwoName = 'searchTags';

    bookFormData.buttonValue = 'Create';
  }

  return (
    isLoading || !isLoggedIn
    ?
    null
    :
    <>
      <h1>My Books Home</h1>
      <p>{introPara}</p>

      <div>
        <h2>Create new book</h2>

        <BookForm
          onBookFormSubmit={handleBookFormSubmit}
          bookFormData={bookFormData}
        />
      </div>

      <BookList
        BooksManager={BooksManager}
      />
    </>
  );
};

export default BookContent;
