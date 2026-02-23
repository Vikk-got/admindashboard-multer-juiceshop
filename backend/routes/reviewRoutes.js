const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'reviews.json');
const MAX_REVIEWS = 5;

function ensureDataFile() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf8');
}

function readReviews() {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    try {
        const arr = JSON.parse(raw);
        // ensure createdAt are Date strings
        return Array.isArray(arr) ? arr : [];
    } catch (e) {
        return [];
    }
}

function writeReviews(arr) {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');
}

// @desc    Get all reviews
// @route   GET /api/reviews
router.get('/', (req, res) => {
    try {
        const reviews = readReviews()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create new review
// @route   POST /api/reviews
router.post('/', (req, res) => {
    try {
        const { name, rating, comment } = req.body;

        if (!name || !rating || !comment) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const reviews = readReviews();
        const newReview = {
            _id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name,
            rating: Number(rating),
            comment,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // add to start and trim to MAX_REVIEWS
        const updated = [newReview, ...reviews].slice(0, MAX_REVIEWS);
        writeReviews(updated);

        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
