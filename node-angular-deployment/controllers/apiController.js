var bodyParser = require('body-parser');

var jsonParser = bodyParser.json()

module.exports = function (app) {
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
    
}