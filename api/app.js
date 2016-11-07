require('dotenv').config();

var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var port        = process.env.PORT || 8080;
var router      = express.Router();
var apiV1       = require('./routes/v1');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use('/api/v1', apiV1);

app.listen(port);
console.log('API server is running at http://localhost:' + port);