import * as _ from "lodash";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { loginURI } from '../constants';

import ChapterView from '../components/ChapterView/ChapterView';

/* eslint-disable react/prop-types */

let renderTimes = 0;

const ChapterViewContent = ({
  isLoading,
  isLoggedIn,
  BooksManager,
}) => {
  localStorage.setItem('ChapterViewContent', _.now()); // SCAFF
  console.log(isLoading, isLoggedIn, BooksManager); // SCAFF

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn && renderTimes > 0) {
      navigate(loginURI);
    }
    renderTimes += 1;
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

  // console.log(chapter); // SCAFF

  return (
    isLoading
    ?
    <p>Loading...</p>
    :
    <div>
      <ChapterView
        chapter={chapter}
      />
    </div>
  );
};

export default ChapterViewContent;
