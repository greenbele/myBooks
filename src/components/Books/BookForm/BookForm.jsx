/* eslint-disable react/prop-types */

/**
 * Renders the form for creating a new book.
 */
const BookForm = ({
  onBookFormSubmit,
}) => {
  return (
    <div>
      <h2>Create new book</h2>

      <form onSubmit={onBookFormSubmit}>
        <fieldset>
          <legend>
            <label htmlFor="bookTitle">Book title</label>
          </legend>
          <input type="text" id="bookTitle" name="bookTitle" required />
        </fieldset>

        <fieldset>
          <legend>
            <label htmlFor="searchTags">Search tags</label>
          </legend>
          <input type="text" id="searchTags" name="searchTags" />
        </fieldset>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BookForm;
