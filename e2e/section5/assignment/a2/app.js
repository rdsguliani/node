const userRoute = require('./routes/user');

const express = require('express');
const app = express();
const path = require('path');

// path.dirname(process.mainModule.filename);


app.use ( express.static(path.join(__dirname, 'public')));

app.use(userRoute);

app.listen(3000);


