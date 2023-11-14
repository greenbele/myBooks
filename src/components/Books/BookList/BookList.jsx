import Book from '../Book/Book';

/* eslint-disable react/prop-types */

const BookList = ({
  BooksManager,
  handleBookEditFormSubmit,
  handleBookDeleteButtonClick,
  maskMethods,
}) => {
  return (
    BooksManager.books
    ?
    <div className="BookList section">
      <div className="BookList__h2">
        <h2>All Books</h2>
      </div>

      <div>
        {
          BooksManager.books.length
          ?
          <ol>
            {
              BooksManager.books.map((book, idx) => {
                return (
                  <Book
                    key={idx}
                    book={book}
                    BooksManager={BooksManager}
                    handleBookEditFormSubmit={handleBookEditFormSubmit}
                    handleBookDeleteButtonClick={handleBookDeleteButtonClick}
                    maskMethods={maskMethods}
                  />
                );
              })
            }
          </ol>
          :
          'No books. Create some with the form above.'
        }
      </div>
    </div>
    :
    <p>No books yet</p>
  );
};

export default BookList;
