import * as _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { loginURI } from '../constants';

import EditableElement from '../components/ChapterEdit/EditableElement';
import ElementCreateToolbar from '../components/ChapterEdit/ElementCreateToolbar';

/* eslint-disable react/prop-types */

let renderTimes = 0;

// TODO:
// - from App:
//   - onElementOrderChange

/**
 * Brings all chapter editing components into a page.
 */
const ChapterEditContent = ({
  isLoading,
  isLoggedIn,
  onElementEditFormSubmit,
  onElementOrderChange,
  onToolbarDeleteButtonClick,
  BooksManager,
}) => {
  // localStorage.setItem('ChapterEditContent', _.now()); // SCAFF
  // console.log('Rendering ChapterEditContent...'); // SCAFF

  const [isToolbarDisabled, setIsToolbarDisabled] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn && !isLoading && renderTimes > 0) {
      renderTimes += 1;
      navigate(loginURI);
    }
  });

  /**
   * perform local actions on element edit form submission.
   */
  const handleElementEditFormSubmitLocal = (e, {
    orderNum,
    setIsEditing,
    setIsSubmitButtonDisabled,
  }) => {
    const options = {
      bookTitle,
      chapterTitle,
      orderNum,
      setIsToolbarDisabled,
      setIsEditing,
      setIsSubmitButtonDisabled,
    };

    return onElementEditFormSubmit(e, options);
  };

  /**
   * perform local actions on element order change.
   */
  const handleElementOrderChangeLocal = (orderOne, orderTwo) => {
    const options = {
      bookTitle,
      chapterTitle,
    };

    onElementOrderChange(orderOne, orderTwo, options);
  };

  /**
   * perform local actions on toolbar delete button click.
   */
  const handleToolbarDeleteButtonClickLocal = (orderNum) => {
    const options = {
      bookTitle,
      chapterTitle,
    };

    onToolbarDeleteButtonClick(orderNum, options);
  };

  let chapter = null;

  // get dynamic book and chapter title parameters
  const { bookTitle, chapterTitle } = useParams();

  // get book object by [unique] title
  const book = _.find(BooksManager.books, ['bookTitle', bookTitle]);
  // get chapter object to render
  if (book) {
    // book found; get chapter
    chapter = _.find(book.chapters, ['chapterTitle', chapterTitle]);
  }

  // get array of page content order numbers
  const orders = chapter.page.map((contentObj) => {
    return contentObj.order;
  });

  return (
    isLoading
    ?
    null
    :
    <>
      <ElementCreateToolbar
        isToolbarDisabled={isToolbarDisabled}
      />

      {
        chapter.page.map((contentObj, idx) => {
          return (
            <EditableElement
              key={idx}
              orders={orders}
              selectedOrder={contentObj.order}
              isToolbarDisabled={isToolbarDisabled}
              setIsToolbarDisabled={setIsToolbarDisabled}
              contentObj={contentObj}
              idx={idx}
              onElementEditFormSubmit={handleElementEditFormSubmitLocal}
              onElementOrderChange={handleElementOrderChangeLocal}
              onToolbarDeleteButtonClick={handleToolbarDeleteButtonClickLocal}
            />
          );
        })
      }
    </>
  );
};

export default ChapterEditContent;
