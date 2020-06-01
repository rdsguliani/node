const express = require('express');
const path = require('path');
const route = express.Router();

route.get('/add-product', (req, res, next) => {
    // console.log('i am called again');
    res.sendFile ( path.join( __dirname, '../', 'views',  'add-product.html'));
//    res.send('<body>respo se<form method="POST" action="/admin/add-product"><input type="text" name="message"/><button type="submit">submit</button></form></body>');
});

route.post('/add-product', (req, res, next) => {
    console.log(req.body);
    console.log(req.method);
    res.redirect('/');
 });

module.exports = route;