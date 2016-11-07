var express = require('express');
var router = express.Router();

var auth = require('../../middlewares/auth');
var authHelper = require('../../helpers/auth-helper');

module.exports = router;

router.post('/access_token', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var grant_type = req.body.grant_type;
  var client_id = req.body.client_id;
  var client_secret = req.body.client_secret;
  var scope = req.body.scope;

  if (
    typeof(email) === 'undefined' ||
    typeof(password) === 'undefined' ||
    typeof(grant_type) === 'undefined' ||
    typeof(client_id) === 'undefined' ||
    typeof(client_secret) === 'undefined' ||
    typeof(scope) === 'undefined'
  ) {
    return res.status(400).send('missing.parameters');
  }

  return authHelper
    .checkLogin(email, password)
    .then(() => {
      return authHelper.signToken({
        email,
        password,
        grant_type,
        client_id,
        client_secret,
        scope
      })
    })
    .then(token => {
      return res.status(200).json({
        access_token: token
      });
    })
    .catch(err => {
      return res.status(500).send(err.message);
    });

});

