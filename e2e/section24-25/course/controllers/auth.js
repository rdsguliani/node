
const User = require('../models/users')

const { validationResult } = require('express-validator')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
   
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        console.log(error)
    }
    console.log('in sign up ')
    bcrypt.hash(password, 12)
    .then ( hashedPw => {
        const user = new User({
            email: email,
            name: name,
            password: hashedPw
        });
        return user.save()

    }).then ( result => {
        // console.log(result)
        res.status(201).json({
            message: 'user added successfully',
            userId: result._id
        })
    })
    .catch ( err => {
        console.log(err);
    })

    


}


exports.login = (req, res, next) => {

    const username = req.body.email;
    const password = req.body.password;
    let loggedInUser;
    console.log('inlogin', username, password)
    User.findOne({email: username})
        .then ( (userDoc) => {
            loggedInUser = userDoc
            if(!userDoc) {
                console.log('user not present') 
            }

            return bcrypt.compare(password, userDoc.password)

        } )
        .then ( isMatch => {
            if(!isMatch) {
                console.log('password is incorrect');
            }

            const token = jwt.sign({
                email: username,
                userId: loggedInUser._id
            }, 
            'mysecretsecret',
            { expiresIn: '1h' }
            )



            res.status(200).json({
                token: token, userId: loggedInUser._id
            })

        })
        .catch ( (err) => {
            console.log('ERRO '  + err)
        })

}