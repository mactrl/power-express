var mongojs = require('mongojs');

var db = mongojs('localhost/mydb',['tasks']);

function saveTask(req,res,task) {
    db.tasks.save({name: task}, function(err, saved) {
        if( err || !saved ) console.log("task not saved");
        else {
            console.log("task saved");
            findTask(req,res);
        }
      });
}

function findTask(req,res) {
    console.log("inside findTask------------------------");
    db.tasks.find({},function(err,user){
        if(err && !user){
            console.log('not authorized user');
        }
        else{
            console.log('lets render');
            res.render('jira',{users:user});
        }
    });
}

exports.deleteTask = function(req,res,deleteActivity){
    db.tasks.remove({name:deleteActivity},{},function(err,deleted){
        console.log("inside delete");
        if(err) {
            res.send("try deleting it again")
        }
        else {
            console.log("inside else==================================");
            findTask(req,res);
        }
    })
}

exports.deleteAll = function(req,res) {
    db.tasks.remove({},function(err,deleted){
        if(err) {
            console.log("task not deleted");
        }else {
            res.render('jira',{users:[]})
        }
    })
}

exports.saveTask = saveTask;
exports.findTask = findTask;