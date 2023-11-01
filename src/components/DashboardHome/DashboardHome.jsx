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
      <div
        key={wrapperChildren.length}
        className="card"
      >
        <div className="card-headline-tagline">
          <h2 className='card-headline'>Last edited book</h2>
          <p className='card-tagline'>Your last edited book is <span className="bold">{BooksManager.lastEditedBook.id}</span></p>
        </div>

        {/* call to action */}
        <div>
          <Link to={BooksManager.lastEditedBook.uri} className='card-action'>Open <HiChevronRight /></Link>
        </div>
      </div>
    );

    wrapperChildren.push(dashboardBookCard);
    wrapperExtraClasses = 'multi-card';

    // get chapter display
    if (BooksManager.lastEditedChapter?.uri) {
      // at least one chapter exists
      const dashboardChapterCard = (
        <div
          key={wrapperChildren.length}
          className="card"
        >
          <div className="card-headline-tagline">
            <h2 className='card-headline'>Last edited chapter</h2>
            <p className='card-tagline'><span className="bold">{BooksManager.lastEditedChapter.id}</span> is your last edited chapter</p>
          </div>

          {/* call to action */}
          <div>
            <Link to={resolve(BooksManager.lastEditedChapter.uri, 'edit')} className='card-action'>Continue editing <HiChevronRight /></Link>
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
      <div
        key={wrapperChildren.length}
        className="card"
      >
        <div className="card-headline-tagline">
          <h2 className='card-headline'>Library size</h2>
          <p className='card-tagline'>You have a total of <span className="bold">{numBooks}</span> books in your library</p>
        </div>

        {/* call to action */}
        <div>
          <Link to={booksURI} className='card-action'>See all books <HiChevronRight /></Link>
        </div>
      </div>
    );

    wrapperChildren.push(dashboardAllBooksCard);
  } else {
    // no books yet; call to action to start writing
    const noBookP = "Don't let that idea slip you by. Unleash your creative genius and create your first book.";
    const dashboardNoBookCard = (
      <div
        key={wrapperChildren.length}
      >
        <div className="card-headline-tagline">
          <h2>Write your first book</h2>
          <p>{noBookP}</p>
        </div>

        {/* call to action */}
        <div>
          <Link to={booksURI} className='card-action'>Start writing <HiChevronRight /></Link>
        </div>
      </div>
    );

    wrapperChildren.push(dashboardNoBookCard);
  }

  return (
    <div className={`landing-page-wrapper ${wrapperExtraClasses}`}>
      <div className="h1-tagline">
        <h1>Welcome Home!</h1>
      </div>

      {wrapperChildren}
    </div>
  );
};

export default DashboardHome;
