const express = require('express');
const router = express.Router();

const data =  [];

router.get('/list', (req, res, next) => {
    console.log('in getting data')
    res.render('usersss', {users: data});
  //  res.send('loaded');
})

router.post('/list', (req, res, next) => {
    data.push({name: req.body.name});
    console.log(data);
    // res.redirect('/', { users: data});
    // res.redirect('/users/list/');
    res.redirect('/users/list');
})


module.exports = router;
