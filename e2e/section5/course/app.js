const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

const app = express();

app.use( bodyParser.urlencoded({extended: false}) );

app.use('/admin', adminRoute);
app.use(shopRoute);

app.use(express.static( path.join (__dirname,  'public') ) );

app.use( (req, res, next) => {
    console.log(path.dirname(process.mainModule.filename));
    res.status(404).sendFile ( path.join( __dirname, 'views',  'not-found.html'));
//    res.status(404).send('PAge not found');
});




app.listen(3100, () => {
    console.log('Listening at 3000 !!!');
});
