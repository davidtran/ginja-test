var Promise = require('es6-promise').Promise;

/**
 * Simulate get shop id by email from DB
 *
 * @param {any} email
 * @returns
 */
function getShopIdByEmail(email) {
  return new Promise((resolve, reject) => {
    if (email === 'corey@ginja.co.th') {
      return resolve(1);
    } else {
      return resolve(2);
    }
  });
}

module.exports.getShopIdByEmail = getShopIdByEmail;