const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  const isLoggedIn = true;//(req.get('Cookie').split('=')[1]);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  // req.isLoggedIn = true;
  // res.setHeader('Set-Cookie', 'loggedIn=true')
      // req.session.destroy( () => {
        res.redirect('/');
      // })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy( () => {
    res.redirect('/');
  })
};

