
var express = require('express')
var app = express();
var config = require('./config');
// var mongoose = require('mongoose');
// var setupController = require('./controllers/setupController');
// var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3000;

app.use('/', express.static( __dirname + '/public/dist'));

// app.set('view engine', 'ejs');

// mongoose.connect(config.getDbConnections(), { useNewUrlParser: true }  );
// setupController(app);
// apiController(app);

app.listen(port, function() {
    console.log('test');
    console.log(port);
});
