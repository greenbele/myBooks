import axios from 'axios';

class BooksService {
  /**
   * Get books data for a user.
   * @param {String} uri - the resource uri
   * @returns {Object} - response recieved
   */
  static getBooks(uri) {
    const reqOpts = {
      withCredentials: true,
    };

    return axios.get(uri, reqOpts);
  }

  /**
   * Post new, or updated, books data for a user.
   * @param {String} uri - the resource uri
   * @param {Object} data - optional data to send
   * @returns {undefined} - nothing
   */
  static postBooks(uri, data) {
    // to be implemented
    return uri, data; // to be replaced
  }
}

export default BooksService;
