const debug = require('debug')('app:auth');
const jwt = require('jsonwebtoken');
const dataMapper = require('../dataMappers/dataMapper');

const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET ?? 'secret';
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '5m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION ?? '1d';

const auth = {
  /**
   * generates an access token
   *
   * @param {string} ip - ip that has authenticated
   * @param {object} user - authenticated user
   * @returns an access token
   */
  generateAccessToken(ip, user) {
    debug('generateAccessToken');
    return jwt.sign(
      {
        data: {
          ip,
          email: user.email,
          roles: user.roles,
        },
      },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );
  },

  /**
   * generates a refresh token
   *
   * @param {number} id - user id
   * @returns a refresh token
   */
  generateRefreshToken(id) {
    debug('generateRefreshToken');
    return jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });
  },

  /**
   * generate middleware to authorize route access according to token roles
   *
   * @param {string} permission - the permission required
   * @param {*} section - the section that needs the permission
   * @returns {function} a mw function to check permission on the section
   */
  authorize(permission, section) {
    // eslint-disable-next-line consistent-return
    return async (request, _, next) => {
      debug('authorize', permission, section);
      try {
        const authHeader = request.headers.authorization;
        if (authHeader) {
          const token = authHeader.split('Bearer ')[1];
          // retrieve token
          const decoded = jwt.verify(token, JWT_SECRET);
          // check ip consistency
          if (decoded.data.ip !== request.ip) {
            throw new Error();
          }

          // find associated roles
          const permissions = await dataMapper.findPermissionsForRoles(
            decoded.data.roles
          );

          // looks for required permission
          const authorized = permissions.find(
            (p) => p.action === permission && p.section === section
          );

          // if permission found, go to next middleware
          if (authorized) {
            debug(`authorization for ${permission} ${section} granted`);
            return next();
          }

          // forbidden
          debug(`authorization for ${permission} ${section} not granted`);
          const error = new Error('Forbidden');
          error.status = 403;
          return next(error);
        }
      } catch (err) {
        debug(`no valid token to grant access to ${permission} ${section}`);
        debug(err);
        // no or invalid token
        const error = new Error('Unauthorized');
        error.status = 401;
        return next(error);
      }
    };
  },

  /**
   * validite refreshToken against the one stored in db
   *
   * @param {string} token - a refresh token
   * @returns {boolean}
   */
  async isValidRefreshToken(token) {
    const decodedToken = jwt.verify(token, REFRESH_TOKEN_SECRET);
    const storedToken = await dataMapper.getRefreshToken(decodedToken.id);
    if (token === storedToken) {
      return true;
    }
    return false;
  },

  /**
   * get user from email stored in access token
   *
   * @param {string} token - an accesToken (may have expired)
   * @returns {object} a user object
   */
  async getTokenUser(token) {
    const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });
    return dataMapper.findUserByEmail(decoded.data.email);
  },
};

module.exports = auth;
