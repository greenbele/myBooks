import Chapter from '../Chapter/Chapter';

/* eslint-disable react/prop-types */

/**
 * Renders summaries of all chapters in a book.
 */
const ChapterList = ({
  book,
  handleChapterEditFormSubmit,
  handleChapterDeleteButtonClick,
}) => {
  return (
    book.chapters
    ?
    <div>
      <h2>All Chapters</h2>

      {
        book.chapters.length
        ?
        <ol>
          {
            book.chapters.map((chapter, idx) => {
              return (
                <Chapter
                  key={idx}
                  chapter={chapter}
                  bookTitle={book.bookTitle}
                  handleChapterEditFormSubmit={handleChapterEditFormSubmit}
                  handleChapterDeleteButtonClick={handleChapterDeleteButtonClick}
                />
              );
            })
          }
        </ol>
        :
        <p>No chapter in book. Create chapters with the form above</p>
      }
    </div>
    :
    <p>No chapters yet. Start writing them with the form above</p>
  );
};

export default ChapterList;
