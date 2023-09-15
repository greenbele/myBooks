import path from 'path';
import _ from 'lodash';

// utility functions

/**
 * Emulates node's path.resolve for the client.
 *
 * @params {String[]} otherPaths - an array of paths to join
 * @returns {String} - a joining of all supplied paths
 */
function resolve(...paths) {
  let resolvedPath = '';

  if (paths && paths instanceof Array) {
    for (let pth of paths) {
      if (pth.startsWith('http://') || pth.startsWith('https://')) {
        resolvedPath = `${resolvedPath}${pth}`;
        continue;
      }

      if (!pth.startsWith('/')) {
        pth = `/${pth}`;
      }
      if (pth.endsWith('/')) {
        pth = pth.slice(0, -1);
      }
      resolvedPath = `${resolvedPath}${pth}`;
    }
  }

  // console.log('########->', resolvedPath); // SCAFF

  return resolvedPath;
}

// end utility functions


const dashboardURI = '/home';

const booksURI = resolve(dashboardURI, 'books');

const chaptersURI = resolve(booksURI, 'chapters'); // not valid

const signUpURI = `/signup`;

const loginURI = `/login`;

const logoutURI = `/logout`;

// backend URIs
const backendBaseURI = 'http://localhost:5000';

const fakeDataURI = resolve(backendBaseURI, 'data', 'fake');
const realDataEmptyURI = resolve(backendBaseURI, 'data', 'real-empty');
const realDataFullURI = resolve(backendBaseURI, 'data', 'real-full');
// end backend URIs

// Books manager
class BooksManager {
  // set defaults
  static books = null;
  static lastEditedBook = null;
  static lastEditedChapter = null;

  /**
   * Set the last edited book object from a list of those.
   * @params {Object[]} books - list of book objects.
   * @returns {undefined} - nothing
   */
  static setLastEditedBook(books) {
    const bookSummary = {
      id: '',
      uri: '',
      chapters: null,
    };

    if (books && books.length) {
      // sort books array by lastEdited timestamp
      const sortedBooks = _.orderBy(books, 'lastEdited', 'desc');

      // handle [test] case where two timestamps are same
      if (sortedBooks[0].lastEdited !== sortedBooks[1].lastEdited) {
        // a single lastEdited candidate; save in class
        const lastEditedBook = sortedBooks[0];
        bookSummary.id = lastEditedBook.bookTitle;
        bookSummary.chapters = lastEditedBook.chapters;
        bookSummary.uri = path.resolve(booksURI, lastEditedBook.bookTitle);
        this.lastEditedBook = bookSummary;
      }
    }

    this.lastEditedBook = bookSummary;
  }

  /**
   * Set the last edited chapter object from a list of those.
   * @params {Object[]} chapters - list of chapter objects.
   * @returns {undefined} - nothing
   */
  static setLastEditedChapter(chapters) {
    const chapterSummary = {
      id: '',
      uri: '',
    };

    if (chapters && chapters.length) {
      // sort chapters array by lastEdited timestamp
      const sortedChapters = _.orderBy(chapters, 'lastEdited', 'desc');
      // handle [test] case where two timestamps are same
      if (sortedChapters[0].lastEdited !== sortedChapters[1].lastEdited) {
        // a single lastEdited candidate; save in class
        const lastEditedChapter = sortedChapters[0];
        chapterSummary.id = lastEditedChapter.chapterTitle;
        chapterSummary.uri = path.resolve(
          this.lastEditedBook.uri,
          'chapters',
          lastEditedChapter.chapterTitle,
        );
      }
    }

    this.lastEditedChapter = chapterSummary;
  }

  /**
   * Sets the books list to be used for a client tab/session.
   * @params {Object[]} books - list of books to save.
   * @returns {undefined} - nothing
   */
  static setBooks(books) {
    this.books = books || null; // save first truthy value
  }

  /**
   * Initialize the BooksManager class on initial App rendering. Has to be called on App data fetch.
   * @params {Object[]} books - the initial array of book ojects
   * @returns {undefined} - nothing
   */
  static initBooksManager(books) {
    // first let the manager know of the initial book array
    this.setBooks(books)

    // then get info on last edited book...
    this.setLastEditedBook(books);

    // ...enabling us to easily get info on last edited chapter
    if (this.lastEditedBook) {
      this.setLastEditedChapter(this.lastEditedBook.chapters);
    }
  }

  /**
   * Returns the URI for viewing the provided book object.
   *
   * @params {Object} book - a book object
   * @returns {String} - the URI of the supplied book.
   */
  static getBookViewURI(book) {
    if (book.bookTitle) {
      return resolve(booksURI, book.bookTitle);
    }

    return '';
  }
}
// end Books manager

// book and chapter object classes

class BookModel {
  constructor() {
    this.bookTitle = '';
    this.searchTags = '';
    this.lastEdited = _.now();

    this.chapters = [];
  }
}

class ChapterModel {
  constructor() {
    this.chapterTitle = '';
    this.searchTags = '';
    this.lastEdited = _.now();

    this.page = [];
  }
}

class PageModel {
  constructor() {
    this.orderNum = 0;
    this.tag = '';
    this.content = '';
  }
}

// end book and chapter object classes

// book-related form-data class

/**
 * Class for managing book creation, book edit and chapter creation form data.
 */
class BookFormData {
  constructor() {
    // first input field
    this.inputOneLabel = '';
    this.inputOneID = '';
    this.inputOneType ='text';
    this.inputOneValue = '';
    this.inputOneName = '';

    // second input field
    this.inputTwoLabel = '';
    this.inputTwoID = '';
    this.inputTwoType ='text';
    this.inputTwoValue = '';
    this.inputTwoName = '';

    this.buttonValue = '';
    this.submitDisabled = false;
  }
}

// end book-related form-data class

const initBooks = [
  {
    bookTitle: 'react-eco',
    searchTags: "",
    chapters: [
      {
        chapterTitle: 'react-router',
        searchTags: "",
        page: [],
      },
      {
        chapterTitle: 'react',
        searchTags: "",
        page: [],
      },
    ]
  },
  {
    bookTitle: 'redux-eco',
    searchTags: "",
    chapters: [
      {
        chapterTitle: 'redux-actions',
        searchTags: "",
        page: [],
      },
      {
        chapterTitle: 'redux',
        searchTags: "",
        page: [],
      }
    ],
  },
];

export {
  dashboardURI,
  booksURI,
  chaptersURI,
  signUpURI,
  loginURI,
  logoutURI,
  initBooks,
  fakeDataURI,
  realDataEmptyURI,
  realDataFullURI,
  BooksManager,
  BookFormData,
  resolve,
  BookModel,
  ChapterModel,
  PageModel,
};
