import * as _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { loginURI } from '../constants';

import EditableElement from '../components/ChapterEdit/EditableElement';

/* eslint-disable react/prop-types */

let renderTimes = 0;

// TODO:
// - from App:
//   - onElementEditFormSubmit
//   - onOrderSelectChange
// - here:
//   - toggle toolbar disability on Cancel or Save

/**
 * Brings all chapter editing components into a page.
 */
const ChapterEditContent = ({
  isLoading,
  isLoggedIn,
  onElementEditFormSubmit,
  onOrderSelectChange,
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

  /**
   * disables toolbars on activation of editing mode.
   */
  const handleEditActive = () => {
    setIsToolbarDisabled(true);
  };

  /* EditableElement props:
  orders,
  selectedOrder,
  isToolbarDisabled,
  contentObj,
  idx,
  onSubmit,
  onOrderSelectChange,
  */

  return (
    isLoading
    ?
    null
    :
    <>
      {
        chapter.page.map((contentObj, idx) => {
          return (
            <EditableElement
              key={idx}
              orders={orders}
              selectedOrder={contentObj.order}
              isToolbarDisabled={isToolbarDisabled}
              onEditActive={handleEditActive}
              contentObj={contentObj}
              idx={idx}
              onElementEditFormSubmit={onElementEditFormSubmit}
              onOrderSelectChange={onOrderSelectChange}
            />
          );
        })
      }
    </>
  );
};

export default ChapterEditContent;
