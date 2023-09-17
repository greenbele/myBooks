// import React from 'react';
import AsideBook from './AsideBook';
import './Aside.css';

/* eslint-disable react/prop-types */

/* renders the aside element */
const Aside = ({
  books,
  onAsideClick,
  asideVisibility,
}) => {
  /**
   * get all book and chapter titles for display in aside.
   *
   * Returns array of book objects, each with a bookTitle, and chapters property.
   */
  const getAsideContent = (books) => {
    return books.map((book) => {
      const chTitles = book.chapters.map((ch) => ch.chapterTitle); // array of chapter titles
      const bookObj = {bookTitle: book.bookTitle, chapters: chTitles};
      return bookObj;
    });
  };

  const asideContent = books && getAsideContent(books);
  // console.log(asideContent); // SCAFF

  return (
    books
    &&
    <aside id="flyoutMenu" className={asideVisibility}>
      {/*<div className="flyout-background"></div>*/}
      <button onClick={onAsideClick} className="button-close flyout-content">×</button>
      <p className="aside-section-title flyout-content">BOOKS</p>
      <div className="aside-books flyout-content">
        {
          asideContent.map((bookObj, idx) => {
            return (
              <AsideBook
                key={idx}
                {...bookObj}
              />
            );
          })
        }
      </div>
    </aside>
  );
};

export default Aside;
