var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

router.post('/', function (req, res) {

  client.del('cartItems', function (err, reply) {
    res.send(reply);
  });
});

module.exports = router;
