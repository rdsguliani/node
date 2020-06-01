const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const productsController = require('./controllers/products')

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(productsController.notFound);

app.listen(3000);
