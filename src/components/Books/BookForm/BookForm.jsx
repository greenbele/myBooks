/* eslint-disable react/prop-types */

/**
 * Renders the form for creating a new book.
 */
const BookForm = ({
  onBookFormSubmit,
  bookFormData,
}) => {
  return (
    <div>
      <h2>Create new book</h2>

      <form onSubmit={onBookFormSubmit}>
        <fieldset>
          <legend>
            <label htmlFor={bookFormData.inputOneID}>{bookFormData.inputOneLabel}</label>
          </legend>
          <input type={bookFormData.inputOneType} id={bookFormData.inputOneID} name={bookFormData.inputOneName} required />
        </fieldset>

        <fieldset>
          <legend>
            <label htmlFor={bookFormData.inputTwoID}>{bookFormData.inputTwoLabel}</label>
          </legend>
          <input type={bookFormData.inputTwoType} id={bookFormData.inputTwoID} name={bookFormData.inputTwoName} />
        </fieldset>

        <button type="submit">{bookFormData.buttonValue}</button>
      </form>
    </div>
  );
};

export default BookForm;
