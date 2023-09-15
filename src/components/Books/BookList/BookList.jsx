import Book from '../Book/Book';

/* eslint-disable react/prop-types */

const BookList = ({
  BooksManager,
  handleMaskEvent,
}) => {
  return (
    BooksManager.books
    ?
    <div>
      <h2>All Books</h2>

      <ol>
        {
          BooksManager.books.map((book) => {
            return (
              <Book
                key={book.bookTitle}
                book={book}
                BooksManager={BooksManager}
                handleMaskEvent={handleMaskEvent}
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
