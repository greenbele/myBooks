import { Link } from "react-router-dom";

import BookForm from '../BookForm/BookForm';
import { BookFormData } from '../../../constants';

const bookFormData = new BookFormData();

/* eslint-disable react/prop-types */

// TODO: add button click callbacks

const Book = ({
  book,
  BooksManager,
  handleMaskEvent,
}) => {
  if (!bookFormData.inputOneID) {
    // new form data object; customize
    bookFormData.inputOneID = 'bookTitle';
    bookFormData.inputOneLabel = 'Book title';
    bookFormData.inputOneName = 'bookTitle';
    bookFormData.inputOneValue = book.bookTitle;

    // console.log('#######->', book.bookTitle); // SCAFF

    bookFormData.inputTwoID = 'searchTags';
    bookFormData.inputTwoLabel = 'Search Tags';
    bookFormData.inputTwoName = 'searchTags';
    bookFormData.inputTwoValue = book.searchTags;

    bookFormData.buttonValue = 'Update';

    bookFormData.submitDisabled = true;
  }

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
   */
  const handleBookEditFormSubmit = (e) => {
    // 1
    const bookTitle = e.target[1].value;
    const searchTags = e.target[3].value;

    // 2
    const data = {
      bookTitle,
      searchTags,
    };

    // 3

    // 4
    handleMaskEvent();

    console.log(data); // SCAFF
  };

  return (
    <li>
      <h3>{book.bookTitle}</h3>

      {/* book toolbar */}
      <div>
        <Link to={BooksManager.getBookViewURI(book)}>Open</Link>
        <button>Edit</button>
        <button>Delete</button>
      </div>

      {/* book edit form */}
      <BookForm
        bookFormData={bookFormData}
        onBookFormSubmit={handleBookEditFormSubmit}
      />
    </li>
  );
};

export default Book;
