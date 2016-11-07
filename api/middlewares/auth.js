var authHelper = require('../helpers/auth-helper.js');

/**
 * Verify token before process request
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
function auth(req, res, next) {
  var token = extractTokenFromRequest(req);

  if (token === null) {
    return res.status(400).send('missing.token');
  }

  return authHelper
    .verifyToken(token)
    .then((tokenInfo) => {
      res.locals.tokenInfo = tokenInfo;
      return next();
    }, err => {
      return res.status(400).send('invalid.token');
    });
}

/**
 * Extract token from request headers
 *
 * @param {any} req
 * @returns
 */
function extractTokenFromRequest(req) {
  var authorization = req.headers.authorization;
  if (!authorization) {
    return null;
  }

  var bearer = 'Bearer ';
  var bearerIndex = authorization.indexOf(bearer);

  if (bearerIndex === -1) {
    return null;
  }

  var token = authorization.substr(bearer.length);
  return token;
}

module.exports = auth;