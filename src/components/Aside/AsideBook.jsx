// import React from 'react';
import { Link } from 'react-router-dom';
import { chaptersURI } from '../../constants';

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
            chapters.map((title, idx) => {
              return (
                <li key={idx}>
                  <Link to={`${chaptersURI}${title}`}>{title}</Link>
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
