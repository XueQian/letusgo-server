var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

router.get('/', function(req, res) {
  //TODO: Need to implement.
  var categoryList = [
    {id: 0, name: '服装鞋包'},
    {id: 1, name: '手机数码'},
    {id: 2, name: '全球美食'},
    {id: 3, name: '护肤彩妆'},
    {id: 4, name: '母婴用品'}
  ];
  client.set('data',JSON.stringify(categoryList));
  client.get('data',function (err, reply) {
    res.send(JSON.parse(reply));
  });
});

module.exports = router;
