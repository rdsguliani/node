const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const feedRoute = require('./router/feed');
const authRoute = require('./router/auth');

const MONGODB_URI = 'mongodb+srv://raman:rds123@cluster0-ecdsk.mongodb.net/messages?retryWrites=true&w=majority';


const app = express();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        console.log(req);
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})

// app.use(bodyParser.urlencoded({ extended: false }));  x-www-form-urlencoded
app.use(bodyParser.json());

app.use(multer({storage: storage}).single('image'));
app.use('/images', express.static(path.join( __dirname , 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/feed', feedRoute);
app.use('/auth', authRoute);

app.use( (err, req, res, next) => {
    res.status(err.statusCode).json({
        message: err.message
    });
})

mongoose
    .connect(MONGODB_URI)
    .then( () => {
        app.listen(8082, (err) => {
            console.log('listening on port 8081');
        })
    })
    .catch( () => {
        console.log('error while connecting')
    })