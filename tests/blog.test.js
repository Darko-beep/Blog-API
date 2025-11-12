const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('../routes/blogRoutes');

const app = express();
app.use(express.json());
app.use('/api/posts', blogRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/blogtest', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Blog API', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'Test Post', body: 'This is a test.', author: 'Darko' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Post');
  });

  it('should fetch all posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});