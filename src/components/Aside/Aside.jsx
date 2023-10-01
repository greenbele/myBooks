// import React from 'react';
// import AsideBook from './AsideBook';
import MenuChapters from './MenuChapters';
import Accordion from '../Accordion/Accordion';
// import './Aside.css';

/* eslint-disable react/prop-types */

// TODO:
// - remove AsideBook component

/* renders the aside element */
const Aside = ({
  books,
  onAsideClick,
  asideVisibility,
}) => {
  // console.log('Aside:', books); // SCAFF

  // prepare accordion data
  const accordionData = [];
  // prepare and add item data
  books.forEach((book) => {
    const accordionItemData = {};
    accordionItemData.title = book.bookTitle;
    accordionItemData.contentProps = { chapters: book.chapters };
    accordionData.push(accordionItemData);
  });

  const accordionClassNames = "aside-books flyout-content";

  return (
    books
    &&
    <aside id="flyoutMenu" className={asideVisibility}>
      {/*<div className="flyout-background"></div>*/}
      <button onClick={onAsideClick} className="button-close flyout-content">×</button>
      <p className="aside-section-title flyout-content">BOOKS</p>

      <Accordion
        data={accordionData}
        Comp={MenuChapters}
        accordionClassNames={accordionClassNames}
      />
    </aside>
  );
};

export default Aside;
