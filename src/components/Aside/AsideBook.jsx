// import React from 'react';
import { Link } from 'react-router-dom';
// import { chaptersURI } from '../../constants';

/* eslint-disable react/prop-types */

/**
 * Renders a single book with its chapter in aside element
 */
const AsideBook = ({
  bookTitle,
  chapters,
}) => {
  // console.log(bookTitle, chapters); // SCAFF
  return (
    <>
      <details>
        <summary>{bookTitle}</summary>
        <p className="aside-section-title">CHAPTERS</p>
        <ul className="aside-chapters">
          {
            chapters.map((chapter, idx) => {
              return (
                <li key={idx}>
                  <Link
                    to={chapter.chapterURI}
                  >
                    {chapter.chapterTitle}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </details>
    </>
  );
};

export default AsideBook;
