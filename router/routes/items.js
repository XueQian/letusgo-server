var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

router.get('/', function(req, res) {
  //TODO: Need to implement.
  var itemList = [
    {barcode: 'ITEM00000', category: '0', name: '服装1', price: 11, unit: '件'},
    {barcode: 'ITEM00001', category: '0', name: '服装2', price: 11, unit: '件'},
    {barcode: 'ITEM00002', category: '1', name: '手机１', price: 1111, unit: '件'},
    {barcode: 'ITEM00003', category: '2', name: '美食１', price: 1100, unit: '件'},
    {barcode: 'ITEM00004', category: '3', name: '护肤１', price: 101, unit: '件'},
    {barcode: 'ITEM00005', category: '4', name: '用品１', price: 11, unit: '件'}
  ];
  client.set('data',JSON.stringify(itemList));
  client.get('data',function (err, reply) {
    res.send(JSON.parse(reply));
  });
});

//router.post('/',function(req,res) {
//  var itemList = {barcode:'1',name:'测试'};
//
//  client.set('itemList',JSON.stringify('itemList'));
////  client.get('itemList',function (err, reply) {
////    console.log(reply);
////    res.send(JSON.parse(reply));
////  });
//});

module.exports = router;
