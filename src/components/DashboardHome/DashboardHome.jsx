import { Link } from 'react-router-dom';

import { booksURI } from '../../constants';

/* eslint-disable react/prop-types */

const DashboardHome = ({
  BooksManager,
}) => {
  console.log(Object.entries(BooksManager)); // SCAFF

  const lastEditedBookDisplay = (
    BooksManager.lastEditedBook.uri
    ?
    <Link to={BooksManager.lastEditedBook.uri}>{BooksManager.lastEditedBook.id}</Link>
    :
    'No books yet'
  );

  const lastEditedChapterDisplay = (
    BooksManager.lastEditedChapter.uri
    ?
    <Link to={BooksManager.lastEditedChapter.uri}>{`${BooksManager.lastEditedChapter.id} - continue editing...`}</Link>
    :
    'No chapters yet'
  );

  const booksHome = <Link to={booksURI}>here</Link>

  return (
    <>
      <h1>Welcome Home!</h1>
      <p>Last edited book: {lastEditedBookDisplay}</p>
      <p>Last edited chapter: {lastEditedChapterDisplay}</p>
      <p>or</p>
      <p>See your current books and create more {booksHome}</p>
    </>
  );
};

export default DashboardHome;
