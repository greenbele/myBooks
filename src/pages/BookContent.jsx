import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { loginURI } from '../constants';

import BookForm from '../components/Books/BookForm/BookForm';

/* eslint-disable react/prop-types */

/**
 * Puts all books components into a page.
 */
const BookContent = ({
  isLoading,
  isLoggedIn,
  onBookCreation,
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
   * Algorithm:
   *
   * 1 - collect bookTitle (0) and searchTags (1) field values
   * 2 - send to backend service for validation and storage
   * 3 -
   *   a - on success status (201), update BooksManager and call App's onBookCreation
   *   b - on failure, set error messages for [re-]rendering
   * 4 - there might be need to reset form fields on success
   */
  const handleBookFormSubmit = (e) => {
    e.preventDefault();

    // 1
    const bookTitle = e.target[1].value;
    const searchTags = e.target[3].value;

    // 2
    const bookData = {
      bookTitle,
      searchTags,
    };

    // 3
    onBookCreation();

    console.log(bookData); // SCAFF
  };

  return (
    isLoading || !isLoggedIn
    ?
    null
    :
    <>
      <h1>My Books Home</h1>
      <p>{introPara}</p>

      <BookForm onBookFormSubmit={handleBookFormSubmit} />
    </>
  );
};

export default BookContent;
