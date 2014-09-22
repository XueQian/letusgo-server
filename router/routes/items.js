var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

var items = [
  {barcode: 1, category:{id: 0, name: '服装鞋包'}, name: '服装1', price: 11, unit: '件'},
  {barcode: 2, category:{id: 0, name: '服装鞋包'}, name: '服装2', price: 11, unit: '件'},
  {barcode: 3, category:{id: 1, name: '手机数码'}, name: '手机１', price: 1111, unit: '件'},
  {barcode: 4, category:{id: 2, name: '全球美食'}, name: '美食１', price: 1100, unit: '件'},
  {barcode: 5, category:{id: 3, name: '护肤彩妆'}, name: '护肤１', price: 101, unit: '件'},
  {barcode: 6, category:{id: 4, name: '母婴用品'}, name: '用品１', price: 11, unit: '件'}
];

client.set('itemList',JSON.stringify(items));

router.get('/', function(req, res) {

  client.get('itemList',function (err, reply) {
    res.send(reply);
  });
});

router.post('/', function (req, res) {
  var itemList = req.body.itemList||items;
console.log(itemList);
  client.set('itemList',JSON.stringify(itemList) , function (err, reply) {
    res.send(reply);
  });
});

//router.delete('/:barcode',function(req,res){
//
//  itemList = req.params.itemList;
////  client.get('itemList',function (err, reply) {
////    var itemList = JSON.parse(reply);
////    var result = _.find(itemList,function(item){
////      return item.barcode == req.params.barcode;
////    });
////    res.send(result);
////  });
//    if(itemList.length <= req.params.barcode) {
//      res.send('Error 404: No itemList found');
//    }
//
//  itemList.splice(req.params.barcode, 1);
//  client.set('itemList',itemList,function(err,reply){
//    console.log(reply);
//
//    res.send(reply);
//  });
//
//});
//
//router.delete('/:id', function (req, res) {
//  itemList = req.params.itemList;
//  client.get('itemList',function (err, reply) {
//    var itemList = JSON.parse(reply);
//    var result = _.find(itemList,function(item){
//      return itemList.id == req.params.id;
//    });
//
//    res.send(result);
//  });
//});

module.exports = router;
