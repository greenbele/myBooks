import { Link } from "react-router-dom";

import ChapterForm from '../ChapterForm/ChapterForm';
import { BookFormData } from '../../../constants';

/* eslint-disable react/prop-types */

// TODO: add button click callbacks

const Chapter = ({
  chapter,
  bookTitle,
  handleChapterEditFormSubmit,
  handleChapterDeleteButtonClick,
}) => {
  const chapterFormData = new BookFormData();
  Object.seal(chapterFormData);

  // console.log('book in Book component:', book); // SCAFF

  const formData = {
    inputOneID: 'chapterTitle',
    inputOneLabel: 'Chapter title',
    inputOneName: 'chapterTitle',
    inputOneValue: chapter.chapterTitle,
    inputTwoID: 'searchTags',
    inputTwoLabel: 'Search Tags',
    inputTwoName: 'searchTags',
    inputTwoValue: chapter.searchTags,
    buttonValue: 'Update',
    submitDisabled: true, // deprecated
  };

  Object.assign(chapterFormData, formData);

  // console.log('bookFormData in Book component:', bookFormData); // SCAFF

  /**
   * perform local actions on form submission before dispatching to App.
   */
  const handleChapterEditFormSubmitLocal = (e, setDisable) => {
    const options = {
      e,
      setDisable,
      bookTitle,
      oldChapterTitle: chapter.chapterTitle,
    };

    return handleChapterEditFormSubmit(options);
  };

  /**
   * perform local actions on book delete button click.
   */
  const handleChapterDeleteButtonClickLocal = () => {
    const options = {
      bookTitle,
      chapterTitle: chapter.chapterTitle,
    };

    handleChapterDeleteButtonClick(options);
  };

  return (
    <li>
      <h3>{chapter.chapterTitle}</h3>

      {/* book toolbar */}
      <div>
        <Link to={chapter.chapterURI}>Open</Link>
        <button>Edit</button>
        <button onClick={handleChapterDeleteButtonClickLocal}>Delete</button>
      </div>

      {/* book edit form */}
      <ChapterForm
        bookFormData={chapterFormData}
        onBookFormSubmit={handleChapterEditFormSubmitLocal}
        isEditing={true}
      />
    </li>
  );
};

export default Chapter;
