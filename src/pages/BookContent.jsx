import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BookFormData, loginURI } from '../constants';

import BookForm from '../components/Books/BookForm/BookForm';
import BookList from '../components/Books/BookList/BookList';

/* eslint-disable react/prop-types */

const bookFormData = new BookFormData();
Object.seal(bookFormData);

/**
 * Puts all books components into a page.
 */
const BookContent = ({
  isLoading,
  isLoggedIn,
  BooksManager,
  handleBookCreateFormSubmit,
  handleBookEditFormSubmit,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(loginURI);
    }
  }, [isLoggedIn, navigate]);

  const introPara = 'Here you can see all your current books, and have the opportunity of creating new ones.';

  /**
   * perform local actions when user submits book form.
   *
   * Logic:
   *
   * 1 - perform local actions and dispatch to App
   */
  const handleBookCreateFormSubmitLocal = (e) => {
    e.preventDefault();

    handleBookCreateFormSubmit(e, bookFormData);
  };

  /*
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
  */

  const formData = {
    inputOneID: 'bookTitle',
    inputOneLabel: 'Book title',
    inputOneName: 'bookTitle',
    inputTwoID: 'searchTags',
    inputTwoLabel: 'Search Tags',
    inputTwoName: 'searchTags',
    buttonValue: 'Create',
  };

  Object.assign(bookFormData, formData);

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
          onBookFormSubmit={handleBookCreateFormSubmitLocal}
          bookFormData={bookFormData}
        />
      </div>

      <BookList
        BooksManager={BooksManager}
        handleBookEditFormSubmit={handleBookEditFormSubmit}
      />
    </>
  );
};

export default BookContent;
