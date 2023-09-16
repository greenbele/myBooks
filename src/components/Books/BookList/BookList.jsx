import Book from '../Book/Book';

/* eslint-disable react/prop-types */

const BookList = ({
  BooksManager,
  handleBookEditFormSubmit,
}) => {
  return (
    BooksManager.books
    ?
    <div>
      <h2>All Books</h2>

      <ol>
        {
          BooksManager.books.map((book, idx) => {
            return (
              <Book
                key={idx}
                book={book}
                BooksManager={BooksManager}
                handleBookEditFormSubmit={handleBookEditFormSubmit}
              />
            );
          })
        }
      </ol>
    </div>
    :
    <p>No books yet</p>
  );
};

export default BookList;
