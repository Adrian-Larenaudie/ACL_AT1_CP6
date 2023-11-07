const debug = require('debug')('app:datamapper');
const client = require('./database');

const dataMapper = {
  async registerUser(user) {
    debug('registerUser', user);
    const preparedQuery = {
      text: 'INSERT INTO "user" ("email","password") VALUES ($1,$2) RETURNING *',
      values: [user.email, user.password],
    };
    const registredUser = await client.query(preparedQuery);
    return registredUser.rows[0];
  },

  async findUserByEmail(email) {
    debug('findUserByEmail', email);
    const preparedQuery = {
      text: `SELECT * FROM "user_with_roles"
             WHERE "email" = $1`,
      values: [email],
    };

    const results = await client.query(preparedQuery);
    return results.rows[0];
  },

  async findPermissionsForRoles(roles) {
    debug('findPermissionsForRoles', roles);
    const preparedQuery = {
      text: `SELECT * FROM get_permissions($1)`,
      values: [JSON.stringify(roles)],
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  },

  async setRefreshToken(id, token) {
    debug('setRefreshToken', id);
    const preparedQuery = {
      text: 'UPDATE "user" set "refresh_token" = $2 WHERE "id" = $1 RETURNING *',
      values: [id, token],
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  },

  async getRefreshToken(id) {
    debug('getRefreshToken', id);
    const preparedQuery = {
      text: 'SELECT "refresh_token" FROM "user" WHERE "id" = $1',
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0].refresh_token;
  },

  async findAllBooks() {
    debug('findAllBooks');
    const preparedQuery = {
      text: 'SELECT * FROM "book"',
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  },
  async insertBook(book) {
    debug('insertBook', book);
    const preparedQuery = {
      text: 'INSERT INTO "book" ("title","author") VALUES ($1, $2) RETURNING *',
      values: [book.title, book.author],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  },
};

module.exports = dataMapper;
