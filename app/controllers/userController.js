const debug = require('debug')('app:userController');
const bcrypt = require('bcrypt');
const dataMapper = require('../dataMappers/dataMapper');

const userController = {
  async register(request, response) {
    debug('register', request.body);
    const password = await bcrypt.hash(request.body.password, 10);

    await dataMapper.registerUser({
      email: request.body.email,
      password,
    });

    response.json({ status: 'success' });
  },
};

module.exports = userController;
