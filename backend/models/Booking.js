const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Please provide a contact number']
    },
    eventType: {
        type: String,
        enum: ['birthday', 'wedding', 'corporate', 'other'],
        required: true
    },
    date: {
        type: Date,
        required: [true, 'Please set a booking date']
    },
    time: {
        type: String,
        required: [true, 'Please set a booking time']
    },
    guests: {
        type: Number,
        required: [true, 'Please specify the number of guests'],
        min: [5, 'Bookings must be for at least 5 guests']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
