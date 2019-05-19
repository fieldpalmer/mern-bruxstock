const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  stock: {
    type: Array,
    required: false
  }
});

module.exports = User = mongoose.model("User", UserSchema);
