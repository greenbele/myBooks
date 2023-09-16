import { Link } from "react-router-dom";

import BookForm from '../BookForm/BookForm';
import { BookFormData } from '../../../constants';

const bookFormData = new BookFormData();
Object.seal(bookFormData);

/* eslint-disable react/prop-types */

// TODO: add button click callbacks

const Book = ({
  book,
  BooksManager,
  handleBookEditFormSubmit,
}) => {
  /*
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
  */

  const formData = {
    inputOneID: 'bookTitle',
    inputOneLabel: 'Book title',
    inputOneName: 'bookTitle',
    inputOneValue: book.bookTitle,
    inputTwoID: 'searchTags',
    inputTwoLabel: 'Search Tags',
    inputTwoName: 'searchTags',
    inputTwoValue: book.searchTags,
    buttonValue: 'Update',
    submitDisabled: true,
  };

  Object.assign(bookFormData, formData);

  /**
   * perform local actions on form submission before dispatching to App.
   */
  const handleBookEditFormSubmitLocal = (e) => {
    handleBookEditFormSubmit(e, bookFormData);
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
        onBookFormSubmit={handleBookEditFormSubmitLocal}
      />
    </li>
  );
};

export default Book;
