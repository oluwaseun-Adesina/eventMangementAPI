const jwt = require('jsonwebtoken');
const User = require('../models/User')
require('dotenv').config();

const secret = process.env.authcontrollerSecret;

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.json({message: "Not Authorized, Please Login"});
                res.redirect('/login');
            } 
            else {
                console.log({message: "Authorized",decodedToken});
                next();
            }
        })

    }
    else {
        res.json({message: "Not Authorized, Please Login"});
    }
}

// check current user
const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token, secret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } 
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
 
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}
module.exports = { requireAuth, checkUser}