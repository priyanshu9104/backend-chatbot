const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastReset: { type: Date }, // Tracks the last password reset request
});

module.exports = mongoose.model("User", userSchema);
