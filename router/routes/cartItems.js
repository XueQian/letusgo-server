var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

var _ = require('lodash');

router.get('/', function (req, res) {

  client.get('cartItems', function (err, reply) {
    res.send(reply||[]);
  });

});

router.post('/', function (req, res) {

  var cartItems = req.body.cartItems || [];

  client.set('cartItems', JSON.stringify(cartItems), function (err, reply) {
    res.send(reply);
  });

});

router.put('/:id', function (req, res) {
  var newCartItem = req.param('cartItem');
  var id = parseInt(req.params.id);
  client.get('cartItems', function (err, reply) {
    var cartItems = JSON.parse(reply);

    _.forEach(cartItems, function (cartItem, index) {

      if (cartItem.item.id === id) {

        cartItems[index] = newCartItem;
      }
    });

    client.set('cartItems', JSON.stringify(cartItems), function (err, reply) {
      res.send(cartItems);
    });
  });

});

module.exports = router;
