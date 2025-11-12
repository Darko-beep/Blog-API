// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import blog routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/posts', blogRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, )
  .then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('MongoDB connection error:', err));