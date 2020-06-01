const path = require('path');
const express = require('express');
const route = express.Router();
route.get('/', (req, res, next) => {
    console.log('i am called again');
    //res.send('<h1> i am called !! </h1>');
    res.sendFile ( path.join(__dirname, '../', 'views',  'shop.html'));
    // res.sendFile ('../views/shop')
});

module.exports = route;