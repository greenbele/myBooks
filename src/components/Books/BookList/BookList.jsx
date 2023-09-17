import Book from '../Book/Book';

/* eslint-disable react/prop-types */

const BookList = ({
  BooksManager,
  handleBookEditFormSubmit,
  handleBookDeleteButtonClick,
}) => {
  return (
    BooksManager.books
    ?
    <div>
      <h2>All Books</h2>

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
                />
              );
            })
          }
        </ol>
        :
        'No chapter in book. Create chapters with the form above.'
      }
    </div>
    :
    <p>No books yet</p>
  );
};

export default BookList;
