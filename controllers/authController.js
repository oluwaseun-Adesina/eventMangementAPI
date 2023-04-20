











const User = require('../models/User')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const sendEmail = require("../email/email");

// handle errors
const handleErrors = (err) =>{
    // console.log(err.message, err.code); 
    let errors = { firstname: '', lastname: '', email: '', password: '', phone: '', address: ''};

    //incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'Email not registered';
    }

    //incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'incorrect password';
    }

    //duplicate error code
    if (err.code === 11000){
        
        errors.email = 'That email is already registered';
        return errors;
    }

    // dupicate phone number
    if (err.code === 11001){
        errors.phone = 'That phone number is already registered';
        return errors;
    }

    //validation errors 
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

//create tokent
const secret = process.env.authcontrollerSecret;
const maxAge =  30 * 60;
const createToken = (id) =>{
    return jwt.sign({id}, secret, {
        expiresIn: maxAge
    });
}

// module.exports.signup_get = (req, res) => {
//     res.json('Welcome to the signup page')
// }


// module.exports.login_get = (req, res) => {
//     res.json('Please enter your credentials')
// }

module.exports.signup_post =  async (req, res) => {
    const { firstname, lastname, email, password, phone, address, role} = req.body;

    try{
        const user =  await User.create({ firstname, lastname, email, password, phone, address, role: role || 'basic'});
        const token = createToken(user._id);

        const message = ` Dear ${user.firstname},

        We would like to extend a warm welcome to you as you join the Tmax Events community! We are thrilled to have you on board and excited to help you create successful and memorable events.
        
        At Tmax Events, we believe that events are more than just gatherings of people; they are opportunities to connect, learn, and have fun. That's why we are dedicated to providing you with the tools and support you need to plan and execute your events with ease.
        
        As a registered event organizer on our website, you now have access to our user-friendly platform, which includes a variety of features to help you streamline your event planning process. You can create and customize event pages, manage ticket sales, track attendance, and even promote your event on our website and social media channels.
        
        We understand that organizing an event can be a challenging task, which is why we are here to support you every step of the way. Our team of experts is always ready to provide you with advice, guidance, and technical assistance whenever you need it.
        
        We hope that you find our platform to be a valuable resource for your event planning needs. We look forward to working with you and helping you create successful and unforgettable events.
        
        Thank you for choosing Tmax Events as your event planning partner. We wish you all the best with your upcoming events!
        
        Best regards,
        
        The Tmax Events Team`

        await sendEmail({
            email: user.email,
            subject: 'Welcome to Tmax Events',
            message
        })




        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json( {user : user._id, userRole: user.role, message: "Registered successfully"} );
    }
    catch(err){
        const errors =handleErrors(err)
        //console.log(err) 
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({user: user._id, message: "Logged in successfully"});

    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1})
    res.json('Logged out successfully')
}

// update user
module.exports.updateUser = async (req, res) => {
    const { firstname, lastname, email, password, phone, address, role} = req.body;
    try { 
        const user = await User.findByIdAndUpdate(req.params.id, { firstname, lastname, email, password, phone, address, role}, {new: true});
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
