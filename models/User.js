const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  specialties: {
    type: Array,
    required: false
  },
  stock: {
    type: Array,
    required: false
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("User", UserSchema);
