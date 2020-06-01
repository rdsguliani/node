const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const ejs = require('ejs');


const userRouter = require('./routes/user')
const mainRouter = require('./routes/main')


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static( path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/users', userRouter);
app.use(mainRouter);

// app.use( (req, res, next) => {
//     console.log(req.url);
// })


app.listen(3100);