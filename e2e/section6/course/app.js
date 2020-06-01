
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
// var exphbs  = require('express-handlebars');

app.use( bodyParser.urlencoded());

// app.engine('handlebars', exphbs());
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', adminRouter.routes);
app.use(shopRouter);
app.use(express.static( path.join(__dirname, 'public') ));

app.use( (req, res, next) => {
    console.log('not found')
    res.status(404).render('404', {title: 'Page Not Foud'});
});

app.listen(3000, () => {
    console.log('working on port 3000');
});

