import { Link } from "react-router-dom";

import BookForm from '../BookForm/BookForm';
import { BookFormData } from '../../../constants';
import { useState } from "react";

/* eslint-disable react/prop-types */

// TODO: add button click callbacks

const Book = ({
  book,
  handleBookEditFormSubmit,
  handleBookDeleteButtonClick,
  maskMethods: {
    setIsMaskDisplay,
    setActiveEvent,
    onMaskEvent,
  },
}) => {
  const [isActive, setIsActive] = useState(false);

  const bookFormData = new BookFormData();
  Object.seal(bookFormData);

  // console.log('book in Book component:', book); // SCAFF

  const formData = {
    inputOneID: 'bookTitle',
    inputOneLabel: 'Book title',
    inputOneName: 'bookTitle',
    inputOneValue: book.bookTitle,
    inputTwoID: 'searchTags',
    inputTwoLabel: 'Search tags',
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
    return handleBookEditFormSubmit(e, book.bookTitle, setDisable, bookFormData);
  };

  /**
   * perform local actions on book Delete button click.
   */
  const handleBookDeleteButtonClickLocal = () => {
    handleBookDeleteButtonClick(book.bookTitle);
  };

  /**
   * perform local actions on book Edit button click.
   */
  const handleBookEditButtonClickLocal = () => {
    if (isActive) {
      onMaskEvent(); // mask and activeness states changed/off
    } else {
      // activating for element display; manually register active event handler and set active states
      setIsActive(true);
      setIsMaskDisplay(true);
      setActiveEvent([setIsActive, false]); // register for use when element is de-activated
    }
  };

  const classNm = isActive ? 'book-edit-active' : 'book-edit-inactive';

  return (
    <li className="Book__li">
      <h3 className="Book__h3">{book.bookTitle}</h3>

      {/* book toolbar */}
      <div className="Book-actions">
        <Link className="Book__a_open" to={book.bookURI}>Open</Link>
        <button className="Book__button_edit" onClick={handleBookEditButtonClickLocal}>Edit</button>
        <button className="Book__button_delete" onClick={handleBookDeleteButtonClickLocal}>Delete</button>
      </div>

      {/* book edit form */}
      <BookForm
        bookFormData={bookFormData}
        onBookFormSubmit={handleBookEditFormSubmitLocal}
        isEditing={true}
        classNm={classNm}
        onMaskEvent={onMaskEvent}
      />
    </li>
  );
};

export default Book;
