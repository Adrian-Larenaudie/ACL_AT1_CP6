const debug = require('debug')('app:apiController');
const dataMapper = require('../dataMappers/dataMapper');

const apiController = {
  async getBooks(_, response) {
    debug('getBooks');
    const books = await dataMapper.findAllBooks();
    response.json({ status: 'success', data: books });
  },
  async addBook(request, response) {
    debug('addBook', request.body);
    const book = await dataMapper.insertBook(request.body);
    response.json({ status: 'success', data: book });
  },
};

module.exports = apiController;
