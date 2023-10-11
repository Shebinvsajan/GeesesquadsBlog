const mongoose = require('mongoose');

// Define the schema for your model
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imgurl: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;


