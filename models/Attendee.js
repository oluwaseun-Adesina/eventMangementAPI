const mongoose = require('mongoose');
const Event = require('./Event');

const attendeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter event name'],
        maxLength: [25, 'Maxium event name lenght 15 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter event description'],
        maxLength: [200, 'Maxium event description lenght 15 characters']
    },
    phone: {
        type: String,
        required: [false, 'Please enter event date'],
        maxLength: [15, 'Maxium event date lenght 15 characters']
    },
    event: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Please enter event time']
    }]
});

const Attendee = mongoose.model('Attendee', attendeeSchema);

module.exports = Attendee;