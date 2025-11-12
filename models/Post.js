const mongoose = require('mongoose');

// Define schema for blog posts
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);