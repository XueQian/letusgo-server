var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

router.get('/', function(req, res) {
  //TODO: Need to implement.
  client.set('message',JSON.stringify('test1'));
  client.get('message',function (err, reply) {
    console.log(reply);
    res.send(reply);
  });
});


module.exports = router;
