const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter event name'],
        maxLength: [25, 'Maxium event name lenght 15 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter event description'],
        maxLength: [200, 'Maxium event description lenght 15 characters']
    },
    date: {
        type: Date,
        required: [true, 'Please enter event date'],
        maxLength: [15, 'Maxium event date lenght 15 characters']
    },
    time: {
        type: String,
        required: [true, 'Please enter event time'],
        maxLength: [15, 'Maxium event time lenght 15 characters']
    },
    location: {
        type: String,
        required: [true, 'Please enter event location'],
        maxLength: [30, 'Maxium event location lenght 15 characters']
    },
    organizer: {    
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [false, 'Please enter event organizer']
    },
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendee',
        required: [true, 'Please enter event attendees']
    }], userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


const Event = mongoose.model('event', eventSchema);

module.exports = Event;
