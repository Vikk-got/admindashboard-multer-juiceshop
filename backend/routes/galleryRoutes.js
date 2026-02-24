const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');
const Gallery = require('../models/Gallery');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', protect, upload.single('image'), async (req, res) => {
  const { caption } = req.body;
  const image = req.file.path;

  try {
    const gallery = await Gallery.create({
      caption,
      image,
    });
    res.status(201).json(gallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    const { caption } = req.body;
    if (caption) {
      gallery.caption = caption;
    }

    const updatedGallery = await gallery.save();
    res.json(updatedGallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    await gallery.remove();
    res.json({ message: 'Gallery item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
