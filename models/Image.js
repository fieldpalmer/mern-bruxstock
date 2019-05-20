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
  file_type: {
    type: String,
    required: true
  },
  img_title: {
    type: String,
    required: false
  },
  img_notes: {
    type: String,
    required: false
  },
  public: {
    type: Boolean,
    default: true,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
