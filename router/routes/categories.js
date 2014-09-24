var express = require('express');
var router = express.Router();

var redis = require('redis');
var client = redis.createClient();

var _ = require('lodash');

var categories= [
  {id: 0, name: '服装鞋包'},
  {id: 1, name: '手机数码'},
  {id: 2, name: '全球美食'},
  {id: 3, name: '护肤彩妆'},
  {id: 4, name: '母婴用品'}
];

client.set('categoryList',JSON.stringify(categories));
router.get('/', function(req, res) {


  client.get('categoryList',function (err, reply) {
    res.send(reply);
  });
});

router.post('/', function (req, res) {
  var categoryList = req.body.categoryList||categories;

  client.set('categoryList', JSON.stringify(categoryList), function (err, reply) {
    res.send(categoryList);
  });
});

router.delete('/:id',function(req,res){
  client.get('categoryList',function(err,reply){

    var id =parseInt(req.params.id) ;
    var categoryList = JSON.parse(reply);
    var result = _.find(categoryList,function(category){

      return category.id === id;
    });

    categoryList.splice(req.params.id, 1);
    categoryList = _.without(categoryList,result);

    client.set('categoryList',JSON.stringify(categoryList),function(err, reply){
          res.send(reply);
        });

    });
  });


router.put('/:id', function(req, res) {

  var newCategory = req.param('categoryList');
  var id =parseInt(req.params.id) ;

  client.get('categoryList',function(err,data){
    var categoryList = JSON.parse(data);
    _.find(categoryList,function(category,index){
      if(category.id === id){
        categories[index] = newCategory;
      }
    });
    client.set('categoryList',JSON.stringify(categoryList),function(err,obj){
      res.send(obj);
    });
  });
});

//router.get('/:id', function (req, res) {
//var categoryList = req.params.categoryList;
//  client.get('categoryList',function (err, reply) {
//    var categoryList = JSON.parse(reply);
//    var result = _.find(categoryList,function(category){
//      return category.id == req.params.id;
//    });
//    res.send(result);
//  });
//});

module.exports = router;
