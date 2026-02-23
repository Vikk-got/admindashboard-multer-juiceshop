const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// @desc    Create a new booking request
// @route   POST /api/bookings
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, eventType, date, time, guests } = req.body;

        if (!name || !email || !phone || !date || !time || !guests) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        const booking = await Booking.create({
            name,
            email,
            phone,
            eventType,
            date,
            time,
            guests
        });

        res.status(201).json({ message: 'Booking received successfully', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error processing booking' });
    }
});

module.exports = router;
