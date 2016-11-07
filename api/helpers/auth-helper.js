var jwt = require('jsonwebtoken');
var Promise = require('es6-promise').Promise;

/**
 * Check login by email and password
 *
 * @param {any} email
 * @param {any} password
 * @returns {Promise}
 */
function checkLogin(email, password) {
  return new Promise((resolve, reject) => {
    if (email !== '' && password !== '') {
      return resolve();
    }
    return reject(new Error('invalid.email.or.password'));
  });
}

/**
 * Create an access token
 *
 * @param {any} payload
 * @returns
 */
function signToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h'}, (err, token) => {
      if (err) {
        return reject('can.not.sign.token');
      }
      return resolve(token);
    });
  });
}

/**
 * Decode and check access token
 *
 * @param {any} token
 * @returns
 */
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
      if (err) {
        return reject('unable.to.verify.token');
      }
      return resolve(info);
    });
  });
}

module.exports = {
  checkLogin: checkLogin,
  signToken: signToken,
  verifyToken: verifyToken
};