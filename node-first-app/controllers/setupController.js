var Todos = require('../models/todoModel');


module.exports = function (app) {


    app.get('/api/setupTodos', function(req, res) {

        var starterTodos = [
            {
                username: 'test',
                todo: 'bring milk',
                isDone: false,
                hasAttachment: false 
            },
            {
                username: 'test',
                todo: 'feed cows',
                isDone: false,
                hasAttachment: false 
            },
            {
                username: 'test',
                todo: 'learn node',
                isDone: false,
                hasAttachment: false 
            }
        ];

        Todos.create(starterTodos, function(err, result) {
            res.send(result);
        })
        
    })




}