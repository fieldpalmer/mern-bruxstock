const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  uploadedBy: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  gfsId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  view: {
    type: String,
    default: true
    // required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
