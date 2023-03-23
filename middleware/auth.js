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
                // let user =  User.findById(decodedToken.id);
                // res.locals.user = user;
                // console.log(res.locals.user.id)
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
                
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;

                req.user = user;

                // res.user = user;

                // console.log(user)

                console.log(decodedToken);

                // console.log(res.locals.user)
                next();

                

                // if (res.locals.user.role === role){
                //         next();
                // }else {
                //     res.json({message: "Not Authorized, Please You are not an Admin"});
                // }
 
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}

const checkRole = (req, res, next) => {
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

                if (res.locals.user.role === 'admin' ){
                    next();
                }else {
                    res.json({message: "Not Authorized, Please You are not an Admin"});
                }
                // next();
 
            }
        })
    }

    
}

// const checkRole= (role,req, res, next) => {
//     const token = req.cookies.jwt;

//     if (token){
//         jwt.verify(token, secret, async (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 res.locals.user = null;
//                 next();
//             }
            
//             else {
//                 console.log(decodedToken);

//                 let user = await User.findById(decodedToken.id);
//                 res.locals.user = user;

//                 // return (req, res, next) => {
//                 //     if (req.user.role === role) {
//                 //         next()
//                 //     } else {
//                 //         res.status(401).json({message: "Not Authorized, Please You are not an Admin or the do not have the required permission"})
//                 //     }
//                 // }

//                 if(res.locals.user.role === role){
//                     next();
//                 }else {
//                     res.json({message: "Not Authorized, Please You are not an Admin or the do not have the required permission"});
//                 }
//             }
//         })
//     }
//     else {
//         res.locals.user = null;
//         next();
//     }
    
// }

// const checkRole = (role) => {
//     return (req, res, next) => {
//         console.log(req.user);
//         console.log(req)
//         if (req.user.role === role) {
//             next()
//         } else {
//             res.status(401).json({message: "Not Authorized, Please You are not an Admin or the do not have the required permission"})
//         }
//     }
// }

module.exports = { requireAuth, checkUser, checkRole}