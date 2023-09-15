import { Link } from "react-router-dom";

import BookForm from '../BookForm/BookForm';
import { BookFormData } from '../../../constants';

const bookFormData = new BookFormData();

/* eslint-disable react/prop-types */

// TODO: add button click callbacks

const Book = ({
  book,
  BooksManager,
}) => {
  if (!bookFormData.inputOneID) {
    // new form data object; customize
    bookFormData.inputOneID = 'bookTitle';
    bookFormData.inputOneLabel = 'Book title';
    bookFormData.inputOneName = 'bookTitle';

    bookFormData.inputTwoID = 'searchTags';
    bookFormData.inputTwoLabel = 'Search Tags';
    bookFormData.inputTwoName = 'searchTags';

    bookFormData.buttonValue = 'Update';

    bookFormData.submitDisabled = true;
  }

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
      />
    </li>
  );
};

export default Book;
