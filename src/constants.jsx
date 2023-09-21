// import path from 'path';
import _ from 'lodash';

// utility classes and functions

/**
 * Emulates node's path.resolve for the client.
 *
 * @param {String[]} otherPaths - an array of paths to join
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

/**
 * Handles creation, amd modification of page elements.
 */
class PageManager {
  constructor() {
    this.rawPageContents = null;
  }

  /**
   * Takes a tag name and content, and returns an HTML element generated from them.
   *
   * @param {String} tagName - name of the HTML tag.
   * @param {String} content - content for the generated element
   * @param {Number} idx - unique index of the element in its collection.
   * @returns {HTMLElement} - an HTML element.
   */
  getElement(tagName, content, idx) {
    try {
      switch (tagName.toLowerCase()) {
        case 'p':
          return <p key={idx}>{content}</p>
        case 'h1':
          return <h1 key={idx}>{content}</h1>
        case 'h2':
          return <h2 key={idx}>{content}</h2>
        case 'h3':
          return <h3 key={idx}>{content}</h3>
        case 'h4':
          return <h4 key={idx}>{content}</h4>
        case 'h5':
          return <h5 key={idx}>{content}</h5>
        case 'h6':
          return <h6 key={idx}>{content}</h6>
        default:
          throw new Error('tagName not supported');
      }
    } catch (err) {
      console.log('ERROR - PageManager:', err.toString()); // SCAFF
    }
  }

  /**
   * Takes a tag name and content, and returns an editable HTML element as input generated from them.
   *
   * @param {String} tagName - name of the HTML tag.
   * @param {String} content - content for the generated element
   * @param {Function} onElementEditFormCancel - event handler for Cancel button click.
   * @param {Function} onElementEditFormSubmit - event handler for edit form submission.
   * @param {Boolean} isDisabled - input disabling flag.
   * @returns {HTMLElement} - an HTML input control element.
   */
  getEditableElement(tagName, {
    content,
    isSubmitButtonDisabled,
    onElementEditFormSubmit,
    onElementEditFormCancel,
    onElementEditFormChange,
  }) {
    try {
      const defaultEventHandler = (e) => {
        console.log('PageManager#getEditableElement - unhandled event:', e);
      };

      switch (tagName.toLowerCase()) {
        case 'p':
          // TODO: abstract in components?
          // const isDisabled = ...;
          return (
            <form onSubmit={onElementEditFormSubmit || defaultEventHandler}>
              <textarea
                name="content"
                cols="40"
                rows="10"
                defaultValue={content || ""}
                onChange={onElementEditFormChange}
              >
              </textarea>

              <button
                type="button"
                onClick={onElementEditFormCancel || defaultEventHandler}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitButtonDisabled}
              >
                Save
              </button>
            </form>
          );
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          // TODO: abstract in components?
          return (
            <form onSubmit={onElementEditFormSubmit || defaultEventHandler}>
              <input
                type="text"
                name="content"
                defaultValue={content || ""}
                onChange={onElementEditFormChange}
              />

              <button
                type="button"
                onClick={onElementEditFormCancel || defaultEventHandler}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitButtonDisabled}
              >
                Save
              </button>
            </form>
          );
        default:
          throw new Error('tagName not supported');
      }
    } catch (err) {
      console.log('ERROR - PageManager:', err.toString()); // SCAFF
    }
  }

  /**
   * Returns a default content for a newly created element.
   *
   * @param {String} tagName - name of the element.
   * @returns {String} - default element content.
   */
  static getDefaultElementContent(tagName) {
    switch (tagName) {
      case 'p':
        return 'New paragraph';
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return 'New heading';
      default:
        return 'New section';
    }
  }

  /**
   * Takes an array of page content objects and returns an array of HTML elements in order.
   *
   * @param {Array} rawPageContents - array of page content objects to convert to HTML.
   * @returns {Array} - the page contents refined to HTML.
   */
  getHTMLPageContents(rawPageContents = this.rawPageContents) {
    try {
      let HTMLPageContents = [];

      if (rawPageContents instanceof Array) {
        const self = this;

        HTMLPageContents = rawPageContents.map((pageObj, idx) => {
          return self.getElement(pageObj.tag, pageObj.content, idx);
        });
      }

      return HTMLPageContents;
    } catch (err) {
      console.log('ERROR - PageManager.getHTMLPageContents:', err.toString()); // SCAFF
    }
  }
}

/**
 * Handle major input onChange event handler logic.
 *
 * Usage per edit case (use new instance per case, or re-init):
 *  - first set the initial input values
 *  - then to track changes, use one of the setIsInput* methods
 *  - finally, to know if to disable button, call isDisabled
 */
class InputChangeManager {
  constructor() {
    this.inputOneValueInit = '';
    this.inputTwoValueInit = '';

    this.isInputOneChanged = false;
    this.isInputTwoChanged = false;

    // extend for single-input form
    this.onlyInputOne = false;
  }

  /**
   * sets if input one value is different from the initial.
   *
   * @param {String} inputOneValueCurrent - current input value.
   * @returns {undefined} - nothing.
   */
  setIsInputOneChanged(inputOneValueCurrent) {
    this.isInputOneChanged = inputOneValueCurrent !== this.inputOneValueInit;
  }

  /**
   * sets if input two value is different from the initial.
   *
   * @param {String} inputTwoValueCurrent - current input value.
   * @returns {undefined} - nothing.
   */
  setIsInputTwoChanged(inputTwoValueCurrent) {
    this.isInputTwoChanged = inputTwoValueCurrent !== this.inputTwoValueInit;
  }

  /**
   * checks if submit button should be disabled.
   *
   * @returns {Boolean} - true if disabled, false otherwise.
   */
  isDisabled() {
    switch (this.onlyInputOne) {
      case true:
        return !this.isInputOneChanged;
      case false:
        return !(this.isInputOneChanged || this.isInputTwoChanged);
    }
  }
}

// end utility classes and functions


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
   * @param {Object[]} books - list of book objects.
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
        bookSummary.uri = resolve(booksURI, lastEditedBook.bookTitle);
        this.lastEditedBook = bookSummary;
      }
    }

    this.lastEditedBook = bookSummary;
  }

  /**
   * Set the last edited chapter object from a list of those.
   * @param {Object[]} chapters - list of chapter objects.
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
        chapterSummary.uri = resolve(
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
   * @param {Object[]} books - list of books to save.
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
   * @param {Object} book - a book object
   * @returns {String} - the URI of the supplied book.
   */
  static getBookViewURI(book) {
    if (book.bookTitle) {
      return resolve(booksURI, book.bookTitle);
    } else {
      console.log('getBookViewURI: invalid arg(s)'); // SCAFF
    }

    return '';
  }

  /**
   * Returns a new book object with the URI of self and children chapters set/updated.
   *
   * @param {Object} book - a book object.
   * @returns {Object} - new URI-updated book object.
   */
  static setBookViewURI(book) {
    if (book?.bookTitle) {
      const bookClone = _.cloneDeep(book);

      // update book URI
      bookClone.bookURI = this.getBookViewURI(book);

      // update children chapter URIs
      const self = this;
      const updatedChapters = bookClone.chapters.map(function (chapter) {
        const chapterClone = _.cloneDeep(chapter);
        chapterClone.chapterURI = self.getChapterViewURI(bookClone.bookURI, chapter);

        return chapterClone;
      });
      bookClone.chapters = updatedChapters;

      return bookClone;
    } else {
      console.log('setBookViewURI: invalid arg(s)'); // SCAFF
    }

    return book;
  }

  /**
   * Returns a new chapter object with its chapterURI set/updated.
   *
   * @param {Object} book - a book object.
   * @returns {Object} - new URI-updated book object.
   */
  static setChapterViewURI(bookURI, chapter) {
    if (bookURI && chapter?.chapterTitle) {
      const chapterClone = _.cloneDeep(chapter);

      chapterClone.chapterURI = this.getChapterViewURI(bookURI, chapter);

      return chapterClone;
    } else {
      console.log('setChapterViewURI: invalid arg(s)'); // SCAFF
    }

    return chapter;
  }

  /**
   * Returns the URI for viewing a specific chapter.
   *
   * @param {String} bookURI - parent book URI address.
   * @param {Object} chapter - chapter object in question.
   * @returns {String} - the URI of the chapter.
   */
  static getChapterViewURI(bookURI, chapter) {
    if (bookURI && chapter?.chapterTitle) {
      return resolve(bookURI, 'chapters', chapter.chapterTitle);
    }

    return '';
  }

  /**
   * Returns the URI for editing a specific chapter.
   *
   * @param {Object} chapter - chapter object in question.
   * @returns {String} - the edit URI of the chapter.
   */
  static getChapterEditURI(chapter) {
    if (chapter?.chapterTitle) {
      return resolve(chapter.chapterURI, 'edit');
    }

    return '';
  }

  /**
   * Adds a new book to the books list.
   *
   * @param {Object} newBook - book to add to the list.
   * @returns {Array} - possible error messages.
   */
  static addBook(newBook) {
    const err = [];
    let newBookClone = _.cloneDeep(newBook);

    // uniqueness validation
    if (_.find(this.books, ['bookTitle', newBook.bookTitle])) {
      // a book with that title already exists
      err.push(`${newBook.bookTitle}: book title already in use`);
    } else {
      // validation done; update URI and push to manager's books
      // TODO: use BookModel
      newBookClone = this.setBookViewURI(newBook);
      this.books.push(newBookClone);
    }

    return err;
  }

  /**
   * Adds a new chapter to a specific book.
   *
   * @param {Object} newChpater - chapter to add.
   * @param {String} bookTitle - title/id of book to add chapter to.
   * @returns {Array} - possible error messages.
   */
  static addChapter(newChapter, {
    bookTitle,
  }) {
    try {
      // get parent book
      const book = _.find(this.books, ['bookTitle', bookTitle]);
      if (!book) {
        return [bookTitle, '- No such parent book'];
      }

      // parent book found
      const err = [];
      let newChapterClone = _.cloneDeep(newChapter);

      // uniqueness validation
      if (_.find(book.chapters, ['chapterTitle', newChapter.chapterTitle])) {
        // a book with that title already exists
        err.push(`${newChapter.chapterTitle}: chapter title already in use`);
      } else {
        // validation done; update URI and push to manager's books
        // TODO: use ChapterModel
        newChapterClone = this.setChapterViewURI(book.bookURI, newChapter);
        console.log('BooksManager.addChapter:', newChapterClone); // SCAFF
        book.chapters.push(newChapterClone);
      }

      return err;
    } catch (err) {
      console.log('ERROR - addChapter:', err.toString()); // SCAFF
    }
  }

  /**
   * Adds new content to a chapter page.
   *
   * @param {String} tagName - tag bame of the new element.
   * @param {String} bookTitle - book ID.
   * @param {String} chapterTitle - chapter ID.
   * @returns {undefined} - nothing.
   */
  static addPageContent(tagName, {
    bookTitle = '',
    chapterTitle = '',
  }) {
    // TODO: notify users of errors (Notification component)
    try {
      // get book first
      const book = _.find(this.books, ['bookTitle', bookTitle]);
      if (book) {
        // book found; get chapter
        const chapter = _.find(book.chapters, ['chapterTitle', chapterTitle]);
        if (chapter) {
          // chapter found; add new element content object
          const pageContent = new PageModel();
          Object.seal(pageContent);
          const contentData = {
            order: chapter.page.length + 1,
            tag: tagName,
            content: PageManager.getDefaultElementContent(tagName),
          };
          Object.assign(pageContent, contentData);
          // update chapter
          chapter.page.push(pageContent);
        } else {
          throw new Error(`${chapterTitle} chapter not found`);
        }
      } else {
        throw new Error(`${bookTitle} book not found`);
      }
    } catch (err) {
      console.log('ERROR - addPageContent:', err.toString()); // SCAFF
    }
  }

  /**
   * Updates an existing book obj.
   *
   * @param {Object} updateData - the update data object.
   * @param {String} oldBookTitle - title of the book to update.
   * @returns {Array} - array containing possible error messages
   */
  static updateBook(updateData, oldBookTitle) {
    // client-side validation
    const err = [];

    // console.log(updateData, oldBookTitle); // SCAFF

    if (
      _.find(this.books, ['bookTitle', updateData.bookTitle])
      &&
      oldBookTitle !== updateData.bookTitle
    ) {
      // a book with that title already exists
      // console.log('book title already exists!'); // SCAFF
      err.push(`${updateData.bookTitle}: book title already in use`);
    } else {
      // valid update data; update BooksManager
      const bookObj = _.find(this.books, ['bookTitle', oldBookTitle]);
      Object.assign(bookObj, updateData);
      // also update book and associated chapters URI
      const linkUpdatedBookObj = this.setBookViewURI(bookObj);
      Object.assign(bookObj, linkUpdatedBookObj);
    }

    return err;
    // return err.length || ['fake error message'];
  }

  /**
   * Updates an existing chapter obj.
   *
   * @param {Object} updateData - the update data object.
   * @param {String} bookTitle - title of parent book.
   * @param {String} oldChapterTitle - title of the chapter to update.
   * @returns {Array} - array containing possible error messages
   */
  static updateChapter(updateData, {
    bookTitle,
    oldChapterTitle,
  }) {
    try {
      // get parent book
      const book = _.find(this.books, ['bookTitle', bookTitle]);
      if (!book) {
        return ['No such parent book'];
      }

      // parent book found
      const err = [];

      // console.log(updateData, oldBookTitle); // SCAFF

      if (
        _.find(book.chapters, ['chapterTitle', updateData.chapterTitle])
        &&
        oldChapterTitle !== updateData.chapterTitle
      ) {
        // a chapter with that title already exists
        // console.log('book title already exists!'); // SCAFF
        err.push(`${updateData.chapterTitle}: chapter title already in use`);
      } else {
        // valid update data; update BooksManager
        const chapterObj = _.find(book.chapters, ['chapterTitle', oldChapterTitle]);
        Object.assign(chapterObj, updateData);
        // also update chapter URI
        const linkUpdatedChapterObj = this.setChapterViewURI(book.bookURI, chapterObj);
        Object.assign(chapterObj, linkUpdatedChapterObj);
      }

      // return err.length || ['fake error message'];
      return err;
    } catch (err) {
      console.log('ERROR - updateChapter:', err.toString()); // SCAFF
    }
  }

  /**
   * Updates the content of a chapter element.
   *
   * @param {String} content - the update content.
   * @param {String} bookTitle - book ID
   * @param {String} chapterTitle - chapter ID
   * @param {Number} orderNum - order number of the page content
   * @returns {undefined} - nothing.
   */
  static updatePageContent(content, {
    bookTitle = '',
    chapterTitle = '',
    orderNum = -1,
  }) {
    // TODO: notify users of errors (Notification component)
    try {
      // get book first
      const book = _.find(this.books, ['bookTitle', bookTitle]);
      if (book) {
        // book found; get chapter
        const chapter = _.find(book.chapters, ['chapterTitle', chapterTitle]);
        if (chapter) {
          // chapter found; get page content object
          const contentObj = _.find(chapter.page, ['order', orderNum]);
          if (contentObj) {
            // page content/element object found; update
            contentObj.content = content;
          } else {
            // console.log(chapter); // SCAFF
            throw new Error(`${orderNum} content not found`);
          }
        } else {
          throw new Error(`${chapterTitle} chapter not found`);
        }
      } else {
        throw new Error(`${bookTitle} book not found`);
      }
    } catch (err) {
      console.log('ERROR - updatePageContent:', err.toString()); // SCAFF
    }
  }

  /**
   * Removes a book object from book manager.
   *
   * @param {String} bookTitle - the title of the book to remove
   * @returns {undefined} - nothing.
   */
  static deleteBook(bookTitle) {
    try {
      const updatedBooks = this.books.filter((book) => {
        return book.bookTitle !== bookTitle;
      });
      this.books = updatedBooks;
    } catch (err) {
      console.log('ERROR - BooksManager.deleteBook:', err.toString()); // SCAFF
    }
  }

  /**
   * Removes a chapter object from a book.
   *
   * @param {String} chapterTitle - the title of the chapter to remove
   * @param {String} bookTitle - the title of parent book.
   * @returns {undefined} - nothing.
   */
  static deleteChapter(chapterTitle, {
    bookTitle,
  }) {
    try {
      // get parent book
      const book = _.find(this.books, ['bookTitle', bookTitle]);
      if (!book) {
        return ['No such parent book'];
      }

      // parent book found
      const updatedChapters = book.chapters.filter((chapter) => {
        return chapter.chapterTitle !== chapterTitle;
      });
      book.chapters = updatedChapters;
    } catch (err) {
      console.log('ERROR - BooksManager.deleteChapter:', err.toString()); // SCAFF
    }
  }

  /**
   * Deletes a chapter element.
   *
   * @param {String} bookTitle - book ID
   * @param {String} chapterTitle - chapter ID
   * @param {Number} orderNum - order number of the page content
   * @returns {undefined} - nothing.
   */
  static deletePageElement(orderNum, {
    bookTitle = '',
    chapterTitle = '',
  }) {
    // TODO: notify users of errors (Notification component)
    try {
      // get book first
      const book = _.find(this.books, ['bookTitle', bookTitle]);
      if (book) {
        // book found; get chapter
        const chapter = _.find(book.chapters, ['chapterTitle', chapterTitle]);
        if (chapter) {
          // chapter found; remove the specified content object
          const newPage = chapter.page.filter((contentObj) => {
            return contentObj.order !== orderNum;
          });
          // update chapter with new page
          chapter.page = newPage;
          // re-sequence the chapter page list to close gaps
          let n = 1;
          chapter.page.forEach(contentObj => {
            contentObj.order = n++;
          });
          // re-order the chapter page list
          const sortedPage = _.sortBy(chapter.page, 'order');
          chapter.page = sortedPage;
        } else {
          throw new Error(`${chapterTitle} chapter not found`);
        }
      } else {
        throw new Error(`${bookTitle} book not found`);
      }
    } catch (err) {
      console.log('ERROR - BooksManager.deletePageElement:', err.toString()); // SCAFF
    }
  }

  /**
   * Swaps two page element's order.
   *
   * @param {Number} orderOne - the one order to swap.
   * @param {Number} orderTwo - the other order to swap.
   * @returns {undefined} - nothing.
   */
  static changeElementOrder(orderOne, orderTwo, {
    bookTitle = '',
    chapterTitle = '',
  }) {
    try {
      // get book first
      const book = _.find(this.books, ['bookTitle', bookTitle]);
      if (book) {
        // book found; get chapter
        const chapter = _.find(book.chapters, ['chapterTitle', chapterTitle]);
        if (chapter) {
          // chapter found; get the two page content object
          let contentObjOne;
          let contentObjTwo;

          // get the first
          contentObjOne = _.find(chapter.page, ['order', orderOne]);
          if (!contentObjOne) {
            // console.log(chapter); // SCAFF
            throw new Error(`${orderOne} content not found WHY?!?`);
          }
          // get the second content object
          contentObjTwo = _.find(chapter.page, ['order', orderTwo]);

          // console.log('o1:', orderOne, 'o2:', orderTwo, typeof orderOne, typeof orderTwo); // SCAFF
          // console.log('book:', book, 'chap:', chapter, 'co:', contentObjTwo); // SCAFF

          if (!contentObjTwo) {
            // console.log(chapter); // SCAFF
            throw new Error(`${orderTwo} content not found WHY?!?`);
          }

          // both content objects found; swap their order num
          [contentObjOne.order, contentObjTwo.order] = [contentObjTwo.order, contentObjOne.order];

          // TODO: re-order the chapter page list
          const sortedPage = _.sortBy(chapter.page, 'order');
          chapter.page = sortedPage;
        } else {
          throw new Error(`${chapterTitle} chapter not found`);
        }
      } else {
        throw new Error(`${bookTitle} book not found`);
      }
    } catch (err) {
      console.log('ERROR - BooksManager.changeElementOrder:', err.toString()); // SCAFF
    }
  }
}

// end Books manager

// book and chapter object classes

class BookModel {
  constructor() {
    this.bookTitle = '';
    this.bookURI = '';
    this.searchTags = '';
    this.lastEdited = _.now();

    this.chapters = [];
  }
}

class ChapterModel {
  constructor() {
    this.chapterTitle = '';
    this.chapterURI = '';
    this.searchTags = '';
    this.lastEdited = _.now();

    this.page = [];
  }
}

class PageModel {
  constructor() {
    this.order = 0;
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

/* eslint-disable react-refresh/only-export-components */
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
  InputChangeManager,
  PageManager,
};
