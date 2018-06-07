const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create schema
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
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  verify: {
    type: Boolean,
    default: false
  },
  hash: {
    type: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);
