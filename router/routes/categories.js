var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

var _ = require('lodash');


router.get('/', function(req, res) {
  var categoryList = req.params.categoryList;
  client.get('categoryList',function (err, reply) {
    res.send(JSON.parse(reply));
  });
});

router.get('/:id', function (req, res) {
  var categoryList = req.params.categoryList;
  client.get('categoryList',function (err, reply) {
    var categoryList = JSON.parse(reply);
    var result = _.find(categoryList,function(category){
      return category.id == req.params.id;
    });
    res.send(result);
  });
});

router.post('/', function (req, res) {

  var categoryList = [
    {id: 0, name: '服装鞋包'},
    {id: 1, name: '手机数码'},
    {id: 2, name: '全球美食'},
    {id: 3, name: '护肤彩妆'},
    {id: 4, name: '母婴用品'}
  ];

  client.set('categoryList', JSON.stringify(categoryList), function (err, reply) {
    res.send(reply);
  });
});

module.exports = router;
