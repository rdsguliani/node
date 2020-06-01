const express = require('express');
const path = require('path');

const route = express.Router();

route.get('/', (req, res, next) => {
    res.sendFile(path.join ( __dirname, '..' ,'views', 'index.html'));
})

route.get('/admin/user', (req, res, next) => {
    res.sendFile(path.join ( __dirname, '..' ,'views', 'user.html'));
})


module.exports = route;