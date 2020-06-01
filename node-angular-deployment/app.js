var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 4200;

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var jsonParser = bodyParser.json()

var path = __dirname + '/public'

app.use('/assets', express.static( path ))
app.use(express.static(path));
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    response.render('index');
});

app.get('*', function(req, res) {
   
    res.sendFile(path + '/index.html');
});

app.get('/person/:id', (request, response) => {
    response.render('person', {ID: request.params.id, query: request.query.name});
});


app.post('/person', jsonParser, (request, response) => {
    console.log(request.body);
    response.send('thanks');
});



app.get('/api', (request, response) => {
    response.json({
        firstName: 'rsaman',
        lastName: 'singh'
    });
});


app.listen(port);