var express = require('express');
var router = express.Router();

//var redis = require('redis');
//var client = redis.createClient();
//
//var category = {id: 0, name: '服装鞋包'};
//client.lpush("categories",category,function(err,reply){
//  //console.log(reply);
//});
//
//var category1 = {id: 1, name: '手机数码'};
//client.lpush("categories",category1,function(err,reply){
// //console.log(category);
//});
//
//var category2 = {id: 2, name: '全球美食'};
//client.lpush("categories",category2,function(err,reply){
//  //console.log(reply);
//});
//
//var category3 = {id: 3, name: '护肤彩妆'};
//client.lpush("categories",category3,function(err,reply){
// // console.log(reply);
//});
//
//var category4= {id: 4, name: '母婴用品'};
//client.lpush("categories",category4,function(err,reply){
// // console.log(reply);
//});
//
//var redisClient = redis.createClient();
//
//var storeCategories = function(name,data){
//  var category = JSON.stringify({name:name,data:data});
////console.log(category);
//  redisClient.lpush("categories",category,function(err,response){
//
//  });
//
//};
//
//client.on('load',function(name) {
//  storeCategories.forEach(function(category){
//    category = JSON.parse(category);
//    client.emit("categories",category.name+":"+category.data);
//  });
//});


router.get('/', function(req, res) {
  //TODO: Need to implement.
  res.send('Success!');
});

module.exports = router;
