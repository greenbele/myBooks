import { Link } from 'react-router-dom';

import { booksURI, resolve } from '../../constants';

/* eslint-disable react/prop-types */

const DashboardHome = ({
  BooksManager,
}) => {
  console.log(Object.entries(BooksManager)); // SCAFF

  const lastEditedBookDisplay = (
    BooksManager.lastEditedBook?.uri
    ?
    <Link to={BooksManager.lastEditedBook.uri}>{BooksManager.lastEditedBook.id}</Link>
    :
    'No books yet'
  );

  const lastEditedChapterDisplay = (
    BooksManager.lastEditedChapter?.uri
    ?
    <Link to={resolve(BooksManager.lastEditedChapter.uri, 'edit')}>{BooksManager.lastEditedChapter.id}</Link>
    :
    'No chapters yet'
  );

  const booksHome = <Link to={booksURI}>here</Link>

  return (
    <>
      <h1>Welcome Home!</h1>
      <p>Open last edited book: {lastEditedBookDisplay}</p>
      <p>or...</p>
      <p>Continue editing last chapter: {lastEditedChapterDisplay}</p>
      <p>Alternatively, you can...</p>
      <p>See your current books and create more {booksHome}</p>
    </>
  );
};

export default DashboardHome;
