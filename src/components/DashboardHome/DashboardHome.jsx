import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';

import { booksURI, resolve } from '../../constants';

/* eslint-disable react/prop-types */

const DashboardHome = ({
  BooksManager,
}) => {
  // console.log(Object.entries(BooksManager)); // SCAFF

  let wrapperExtraClasses = '';
  const wrapperChildren = [];

  if (BooksManager.lastEditedBook?.uri) {
    // at least one book exists
    const dashboardBookCard = (
      <div key={wrapperChildren.length}>
        <h2>Last edited book</h2>
        <p>Your last edited book is {BooksManager.lastEditedBook.id}</p>

        {/* call to action */}
        <div>
          <Link to={BooksManager.lastEditedBook.uri}>Open</Link>
          <HiChevronRight />
        </div>
      </div>
    );

    wrapperChildren.push(dashboardBookCard);
    wrapperExtraClasses = 'multi-card';

    // get chapter display
    if (BooksManager.lastEditedChapter?.uri) {
      // at least one chapter exists
      const dashboardChapterCard = (
        <div key={wrapperChildren.length}>
          <h2>Last edited book</h2>
          <p>{BooksManager.lastEditedChapter.id} is your last edited chapter</p>

          {/* call to action */}
          <div>
            <Link to={resolve(BooksManager.lastEditedChapter.uri, 'edit')}>Continue editing</Link>
            <HiChevronRight />
          </div>
        </div>
      );

      wrapperChildren.push(dashboardChapterCard);
    } else {
      // no chapters yet; push nothing for now
    }

    // all books display
    const numBooks = BooksManager.books.length;
    const dashboardAllBooksCard = (
      <div key={wrapperChildren.length}>
        <h2>See all books</h2>
        <p>You have a total of {numBooks} books in your library</p>

        {/* call to action */}
        <div>
          <Link to={booksURI}>See all books</Link>
          <HiChevronRight />
        </div>
      </div>
    );

    wrapperChildren.push(dashboardAllBooksCard);
  } else {
    // no books yet; call to action to start writing
    const noBookP = "Don't let that idea slip you by. Unleash your creative genius and create your first book.";
    const dashboardNoBookCard = (
      <div key={wrapperChildren.length}>
        <h2>Write your first book</h2>
        <p>{noBookP}</p>

        {/* call to action */}
        <div>
          <Link to={booksURI}>Start writing</Link>
          <HiChevronRight />
        </div>
      </div>
    );

    wrapperChildren.push(dashboardNoBookCard);
  }

  return (
    <div className={`landing-page-wrapper ${wrapperExtraClasses}`}>
      <h1>Welcome Home!</h1>

      {wrapperChildren}
    </div>
  );
};

export default DashboardHome;
