var express = require('express');
var router = express.Router();

var authMiddleware = require('../../middlewares/auth');

var orderHelper = require('../../helpers/order-helper');
var shopHelper = require('../../helpers/shop-helper');

module.exports = router;

router.get('/orders/:type/:page', [authMiddleware], (req, res) => {
  return processGetOrderRequest(req, res);
});

router.get('/orders/:type', [authMiddleware], (req, res) => {
  return processGetOrderRequest(req, res);
});

function processGetOrderRequest(req, res) {
  var tokenInfo = res.locals.tokenInfo;
  var page = req.params.page;
  if (!page) {
    page = 1;
  }

  shopHelper
    .getShopIdByEmail(tokenInfo.email)
    .then(shopId => {
      return orderHelper.getOrderByTypeAndShopId(shopId, req.params.type, page);
    })
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
}
