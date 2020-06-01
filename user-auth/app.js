const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./src/middlewares/logger');
const authRoute = require("./src/routes/authRoutes");
const mongo = require('mongodb');
console.log(logger)
const app = express();

app.use(bodyParser.json());
app.use(logger.log);
app.use('/', authRoute)

app.use('/welcome', (req, res, next) => {
    res.status(200)
    .send({body: "message"})
})

app.use((err, req, res, next) => {
    console.log(err);
    res.send(err);
})

const port = process.env.PORT || 3100;


app.listen(port, () => {
    console.log(`application started at ${port}`);
})
