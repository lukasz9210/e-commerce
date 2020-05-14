const User = require('../models/user.js');
const {errorHandler} = require('../helpers/dbErrorHandler.js');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv');

exports.signUp = (req, res) => {
    //console.log(req.body);

    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        res.json({user});
    })

}

exports.signIn = (req, res) => {
    // find the user based on email
    const {email, password, role} = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                err: "Cos poszlo nie tak"
            });
        }
        // if user is found make sure password match

        //create autheticate method in user model
        if(!user.authenticate(password)) {
            return res.status(401).json({err: "Password is not correct"})
        }

        // generate token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT);
        // pass token to the cookie
        res.cookie('token', token);

        //return response with iser data and token to the frontend client
        const {_id, name, email, role } = user;
        return res.status(200).json({token, user: {_id, name, email, role}});

    });
}

exports.signOut = (req, res) => {
    res.clearCookie('token')
    return res.json({message: "You are logged out"})
}

exports.requireSignIn = expressJwt({
    secret: 'gergh45hrgvgvsreg5rg', //trzeba odczytać z .env zmienną JWT
    userProperty: 'auth'

})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user) {
        res.status(403).json({
            err: "Access denied"
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role == 0) {
        return res.status(403).json({
            err: "Admin resource"
        })
    }
    next()
}