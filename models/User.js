const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: [true, 'Please enter your first name'],
        maxLength: [15, 'Maxium First name lenght 15 characters']
    },

    lastname: {
        type: String,
        required: [true, 'Please enter your last name'],
        maxLength: [15,'Maxium Last name lenght 15 characters']
    },

    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [ isEmail, 'PLease enter a valid email']
        //validate: [(val) => {}, 'PLease enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6,'Minimum passowrd length is 6 characters']

    },
    phone: {
        type: String,
        required: [false,'Please enter phone number'],
        unique: false,
        maxlength: [14, 'Maximum phone number length is 14 character']
    },
    address: {
        type: String,
        required: [true, 'Please enter address'],
        lowercase: true
    } , role: {
        type: String,
        enum: ['admin', 'basic'],
        default: 'basic'
    },
    permission: {
        type: String,
        enum: ['admin', 'basic'],
        default: 'basic'
    },
});

// fire a function after doc saved to db

// userSchema.post('save', function (doc, next) {
//     console.log('new user was created & saved', doc);
//     next();
// })

const ROLES = ['admin', 'basic'];


//fire a function before doc saved to db 
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// static method to login user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('user', userSchema);

module.exports = User;
module.exports.ROLES = ROLES;
