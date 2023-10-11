const express = require('express');
const router = express.Router();
const User = require('../Model/userModel');
const bcrypt = require('bcrypt'); // For password hashing

// Endpoint for user registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    // Hash the user's password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Create a new user document with the hashed password
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

