var Promise = require('es6-promise').Promise;
var OrderTypes = [
  'completed',
  'current'
];

/**
 * Simulate get order by order type and shop id from DB
 *
 * @param {any} shopId
 * @param {any} type
 * @returns
 */
function getOrderByTypeAndShopId(shopId, type, page) {
  return new Promise((resolve, reject) => {
    if (!type || type === '' || OrderTypes.indexOf(type.toLowerCase()) === -1) {
      return reject(new Error('invalid.order.type'));
    }
    var orders = generateOrders(type);
    return resolve(orders);
  });
}

/**
 * Generate order
 *
 * @param {any} type
 * @returns
 */
function generateOrders(type, page) {
  var results = [];
  var date = new Date();
  for (var i = 0; i < 10; i++) {
    var payment_method = i % 2 === 0 ? 'cash' : 'creditcard';
    results.push({
      id: i,
      type: type,
      date: new Date(date.getTime() - 100000),
      number: '#BC16100000001',
      price: randomNumber(100, 999),
      product_count: randomNumber(1, 20),
      customer_name: 'David',
      payment_method: payment_method
    });
  }
  return results;
}

/**
 * Generate a random number
 *
 * @param {any} min
 * @param {any} max
 * @returns
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * max + min);
}

module.exports.getOrderByTypeAndShopId = getOrderByTypeAndShopId