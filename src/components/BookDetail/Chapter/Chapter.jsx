import { Link } from "react-router-dom";
import { HiChevronRight, HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import * as _ from "lodash";

import ChapterForm from '../ChapterForm/ChapterForm';
import EditMenu from '../EditMenu/EditMenu';
import EditMenuExpanded from '../EditMenu/EditMenuExpanded';

import { BookFormData, BooksManager, resolve } from '../../../constants';

/* eslint-disable react/prop-types */

// TODO: add button click callbacks

const Chapter = ({
  chapter,
  bookTitle,
  handleChapterEditFormSubmit,
  handleChapterDeleteButtonClick,
  maskMethods: {
    setIsMaskDisplay,
    setActiveEvent,
    onMaskEvent,
  },
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

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

  /**
   * update timestamps on clicking chapter Edit button.
   */
  const handleChapterEditButtonClick = () => {
    const options = {
      bookTitle,
      chapterTitle: chapter.chapterTitle,
    };

    // console.log('Chapter:handleChapterEditButtonClick: updating manager and App...'); // SCAFF

    // update manager
    BooksManager.updateTimestamps(options);
    // update App state
    BooksManager.setAppBooks(_.cloneDeep(BooksManager.books));
  };

  /**
   * handle chevron down button click
   */
  const handleChevronClick = () => {
    if (isActive) {
      onMaskEvent(); // mask and activeness states changed/off
    } else {
      // activating for element display; manually register active event handler and set active states
      setIsActive(true);
      setIsMaskDisplay(true);
      setActiveEvent([setIsActive, false]); // register for use when element is de-activated
    }
  };

  /**
   * perform local actions on book Edit button click.
   */
  const handleChapterEditFormActive = () => {
    if (isFormActive) {
      onMaskEvent(); // mask and activeness states changed/off
    } else {
      // activating for element display; manually register active event handler and set active states
      setIsFormActive(true);
      setIsMaskDisplay(true);
      setActiveEvent([setIsFormActive, false]); // register for use when element is de-activated
    }
  };

  const formClassNm = isFormActive ? 'chapter-edit-active' : 'chapter-edit-inactive';

  const classNm = isActive ? 'active' : '';

  return (
    <li className="Book__li">
      <h3 className="Book__h3">{chapter.chapterTitle}</h3>

      {/* book toolbar */}
      <div className="Book-actions">
        <Link className="Book__a_open" to={chapter.chapterURI}>
          Open
          <HiChevronRight />
        </Link>

        {/*<button>Edit</button>*/}
        <EditMenu
          chapterEditURI={resolve(chapter.chapterURI, 'edit')}
          onChapterEditButtonClick={handleChapterEditButtonClick}
          onChevronClick={handleChevronClick}
        />

        <EditMenuExpanded
          chapterEditURI={resolve(chapter.chapterURI, 'edit')}
          className={classNm}
          onMaskEvent={onMaskEvent}
          onChapterEditButtonClick={handleChapterEditButtonClick}
          onChapterEditFormActive={handleChapterEditFormActive}
        />

        <button className="Book__button_delete" onClick={handleChapterDeleteButtonClickLocal}>
          <HiTrash />
          Delete
        </button>
      </div>

      {/* book edit page link */}
      {/*<Link onClick={handleChapterEditButtonClick} to={resolve(chapter.chapterURI, 'edit')}>Edit chapter</Link>*/}

      {/* book metadata edit form */}
      <ChapterForm
        bookFormData={chapterFormData}
        onBookFormSubmit={handleChapterEditFormSubmitLocal}
        isEditing={true}
        classNm={formClassNm}
        onMaskEvent={onMaskEvent}
      />
    </li>
  );
};

export default Chapter;
