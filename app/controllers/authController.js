const debug = require('debug')('app:authController');
const bcrypt = require('bcrypt');
const dataMapper = require('../dataMappers/dataMapper');
const auth = require('../auth');

const authController = {
  async login(request, response, next) {
    debug('login', request.body);
    const { password, email } = request.body;
    // retrieve user from db
    const user = await dataMapper.findUserByEmail(email);
    if (user) {
      // check if provided password match with hash
      if (await bcrypt.compare(password, user.password)) {
        return authController.sendTokens(response, request.ip, user);
      }
    }
    const error = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  },

  async tokenRefresh(request, response, next) {
    debug('tokenRefresh');
    // check if refreshToken is valid
    if (await auth.isValidRefreshToken(request.body.refreshToken)) {
      // get expired access token
      const authHeader = request.headers.authorization;
      const token = authHeader.split('Bearer ')[1];
      // get user from expired access token
      const user = await auth.getTokenUser(token);
      // send new tokens
      return authController.sendTokens(response, request.ip, user);
    }
    const error = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  },

  async sendTokens(response, ip, user) {
    // create an access token
    const accessToken = auth.generateAccessToken(ip, user);
    // create a refresh token
    const refreshToken = auth.generateRefreshToken(user.id);
    // save refresh token to db
    await dataMapper.setRefreshToken(user.id, refreshToken);
    // send tokens to client
    return response.status(200).json({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
  },
};

module.exports = authController;
