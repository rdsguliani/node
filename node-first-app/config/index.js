 var config = require('./config');

 module.exports = {
    getDbConnections: function () {
        return 'mongodb+srv://' + config.uname + ':' +  config.pwd  + 
                '@cluster0-ecdsk.mongodb.net/nodeTodoSample?retryWrites=true';
    }


 }
