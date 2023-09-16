/* eslint-disable react/prop-types */

/**
 * Renders the form for creating and updating books and chapters.
 */
const BookForm = ({
  onBookFormSubmit,
  bookFormData,
}) => {
  return (
    <form onSubmit={onBookFormSubmit}>
      <fieldset>
        <legend>
          <label htmlFor={bookFormData.inputOneID}>{bookFormData.inputOneLabel}</label>
        </legend>
        <input
          type={bookFormData.inputOneType}
          id={bookFormData.inputOneID}
          name={bookFormData.inputOneName}
          defaultValue={bookFormData.inputOneValue}
          required
        />
      </fieldset>

      <fieldset>
        <legend>
          <label htmlFor={bookFormData.inputTwoID}>{bookFormData.inputTwoLabel}</label>
        </legend>
        <input
          type={bookFormData.inputTwoType}
          id={bookFormData.inputTwoID}
          name={bookFormData.inputTwoName}
          defaultValue={bookFormData.inputTwoValue}
        />
      </fieldset>

      <input
        type="submit"
        value={bookFormData.buttonValue}
        disabled={bookFormData.submitDisabled}
      />
    </form>
  );
};

export default BookForm;
