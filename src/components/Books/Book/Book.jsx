import { Link } from "react-router-dom";

import BookForm from '../BookForm/BookForm';
import { BookFormData } from '../../../constants';

/* eslint-disable react/prop-types */

// TODO: add button click callbacks

const Book = ({
  book,
  BooksManager,
  handleBookEditFormSubmit,
}) => {
  const bookFormData = new BookFormData();
  Object.seal(bookFormData);

  // console.log('book in Book component:', book); // SCAFF

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
    submitDisabled: true, // deprecated
  };

  Object.assign(bookFormData, formData);

  // console.log('bookFormData in Book component:', bookFormData); // SCAFF

  /**
   * perform local actions on form submission before dispatching to App.
   */
  const handleBookEditFormSubmitLocal = (e, setDisable) => {
    handleBookEditFormSubmit(e, book.bookTitle, setDisable, bookFormData);
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
        isEditing={true}
      />
    </li>
  );
};

export default Book;
