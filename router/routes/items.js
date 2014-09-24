var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

var _ = require('lodash');

var items = [
  {id: 1, category:{id: 0, name: '服装鞋包'}, name: '服装1', price: 11, unit: '件'},
  {id: 2, category:{id: 0, name: '服装鞋包'}, name: '服装2', price: 11, unit: '件'},
  {id: 3, category:{id: 1, name: '手机数码'}, name: '手机１', price: 1111, unit: '件'},
  {id: 4, category:{id: 2, name: '全球美食'}, name: '美食１', price: 1100, unit: '件'},
  {id: 5, category:{id: 3, name: '护肤彩妆'}, name: '护肤１', price: 101, unit: '件'},
  {id: 6, category:{id: 4, name: '母婴用品'}, name: '用品１', price: 11, unit: '件'}
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
    res.send(itemList);
  });
});

router.delete('/:id',function(req,res){

  client.get('itemList',function (err, reply) {

    var itemList = JSON.parse(reply);
    var result = _.find(itemList,function(item){

      return item.id === req.params.id;
    });
    itemList.splice(req.params.id, 1);
    itemList = _.without(itemList,result);

    client.set('itemList',JSON.stringify(itemList),function(err,reply){

      res.send(reply);
  });
  });
});

router.put('/:id',function(req,res){
  var newItem = req.body.item;
  client.get('itemList',function(err,reply){
    var itemList = JSON.parse(reply);
     var result = _.find(itemList,function(item){
      return item.id === req.params.id;
    });
    result = newItem;
    itemList.push(result);

    client.set('itemList',JSON.stringify(itemList),function(err,reply){
      res.send(itemList);
    });
  });

});

module.exports = router;
