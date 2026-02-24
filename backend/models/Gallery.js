const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: [true, 'Please add a caption'],
    },
    image: {
      type: String,
      required: [true, 'Please add an image'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Gallery', gallerySchema);
