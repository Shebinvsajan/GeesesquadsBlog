const mongoose = require('mongoose');

// Define a schema for the user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
