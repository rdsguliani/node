
var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');


module.exports = function (app) {


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));


    app.get('/api/todos/:uname', function(req, res) {
        Todos.find({username: req.params.uname}, function (err, todos){
            if(err) throw err;
            console.log('in GETTING BY Name')
            res.send(todos);
        })
    });

    app.get('/api/todo/:id', function(req, res) {
        Todos.findById({_id: req.params.id}, function (err, todos){
            if(err) throw err;
console.log('in GETTING BY ID')
            res.send(todos);
        })
    });

    app.post('/api/todo', function(req, res) {
        console.log(req.body.id + " THI SIS ID :: : ")
        console.log(req.body)
        if(req.body.id) {
            Todos.findOneAndUpdate(req.params.id, { 
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            }, function (err, todos){
                if(err) throw err;
    
                res.send('Success');
            })
        } 
        else {
           var newTodo = Todos({
               username: 'test',
               todo: req.body.todo,
               isDone: req.body.isDone,
               hasAttachment: req.body.hasAttachment
           });
           newTodo.save(function (err, todos){
                if(err) throw err;
    
                res.send('Success');
            });

        }
        
    });

    app.delete('/api/todo', function(req, res) {
        Todos.findOneAndDelete(req.body.id, function (err, todos){
            if(err) throw err;

            res.send('Success');
        })
    });




}







