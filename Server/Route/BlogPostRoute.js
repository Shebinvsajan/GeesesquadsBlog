const express = require('express');
const router = express.Router();
const Post = require('../Model/BlogModel'); // Adjust the path to match your project structure

router.post('/create-post', async (req, res) => {
  try {
    // Extract data from the request body
    const { title, imgurl, postedBy, description } = req.body;

    // Create a new Post instance with the current date
    const currentDate = new Date(); // Get the current date and time
    const newPost = new Post({ title, imgurl, postedBy, description });

    // Save the post to the database
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
