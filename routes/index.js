var express = require('express');
var router = express.Router();
var getDB = require('../dbModule/dbModule');
// var getUser = require('../dbModule/dbModule');
// var users = getUser.getUser();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/displayUser',function(req,res,next){

  getDB.findTask(req,res);
  //console.log('user is'+ users);
  //res.render('jira',{users:users});
});

router.get('/deleteTask',function(req,res,next){
  console.log("inside delete task---------------------------"+JSON.stringify(req.query.delete))
  getDB.deleteTask(req,res,req.query.delete);
  //console.log('user is'+ users);
  //res.render('jira',{users:users});
});

router.post('/addTask',function(req,res,next){
  getDB.saveTask(req,res,req.body.activity)
})

module.exports = router;
