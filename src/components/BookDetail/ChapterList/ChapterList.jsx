import Chapter from '../Chapter/Chapter';

/* eslint-disable react/prop-types */

/**
 * Renders summaries of all chapters in a book.
 */
const ChapterList = ({
  book,
  handleChapterEditFormSubmit,
  handleChapterDeleteButtonClick,
  maskMethods,
}) => {
  return (
    book.chapters
    ?
    <div className="BookList section">
      <div className="BookList__h2">
        <h2>All Chapters</h2>
      </div>

      <div>
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
                    maskMethods={maskMethods}
                  />
                );
              })
            }
          </ol>
          :
          <p>No chapter in book. Create chapters with the form above</p>
        }
      </div>
    </div>
    :
    <p>No chapters yet. Start writing them with the form above</p>
  );
};

export default ChapterList;
