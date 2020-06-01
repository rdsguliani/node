const express = require('express');
const {body} = require('express-validator');
const User = require('../models/users');

const router = express.Router();

const authController = require('../controllers/auth')

router.put('/signup', 
            [
                body('name')
                .trim()
                .not()
                .isEmpty(),
                body('email')
                .isEmail()
                .custom ( (value, {req}) => {
                    return User.findOne( {email: value})
                        .then ( userDoc => {
                            if(userDoc) {
                              return Promise.reject('Email already Exists !!')
                            }
                        })
                })
                .normalizeEmail(),
                body('password')
                .trim()
                .isLength({min: 5})
                
            ],
            authController.signup)


router.post('/login', 
            [
                body('email')
                .isEmail()
                .normalizeEmail(),
                body('password')
                .trim()
                .isLength({min: 5})
            ],
            authController.login)


module.exports = router;
