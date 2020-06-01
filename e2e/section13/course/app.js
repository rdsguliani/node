const path = require('path');
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5d16802b9d473fa44247751d')
    .then(user => {
      req.user = user;//new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb+srv://raman:rds123@cluster0-ecdsk.mongodb.net/shop?retryWrites=true&w=majority')
.then ( () => {
  User.findById('5d16802b9d473fa44247751d')
  .then( user => {
    if(!user) {
      const user = new User({
        name: 'Raman',
        email: 'rdsguliani@gmail.com',
        cart: { 
          items: []
        }
      });
      return user.save()
    }
  })
}).then ( () => {
  app.listen(3000);
})
.catch ( (err) => {
  console.log(err)
  console.log('error connecting db');
})
