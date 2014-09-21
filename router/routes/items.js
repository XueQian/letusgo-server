var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

var itemList = [
  {barcode: 'ITEM00000', category:{id: 0, name: '服装鞋包'}, name: '服装1', price: 11, unit: '件'},
  {barcode: 'ITEM00001', category:{id: 0, name: '服装鞋包'}, name: '服装2', price: 11, unit: '件'},
  {barcode: 'ITEM00002', category:{id: 1, name: '手机数码'}, name: '手机１', price: 1111, unit: '件'},
  {barcode: 'ITEM00003', category:{id: 2, name: '全球美食'}, name: '美食１', price: 1100, unit: '件'},
  {barcode: 'ITEM00004', category:{id: 3, name: '护肤彩妆'}, name: '护肤１', price: 101, unit: '件'},
  {barcode: 'ITEM00005', category:{id: 4, name: '母婴用品'}, name: '用品１', price: 11, unit: '件'}
];

router.get('/', function(req, res) {
  client.set('itemList',JSON.stringify(itemList));
  client.get('itemList',function (err, reply) {
    res.send(JSON.parse(reply));
  });
});

router.post('/', function (req, res) {

  var itemList = req.param('itemList');

  client.set('itemList', itemList, function (err, reply) {
    res.send(reply);
  });
});

module.exports = router;
