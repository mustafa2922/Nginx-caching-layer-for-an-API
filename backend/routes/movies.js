const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Movie schema — defines the shape of our data in MongoDB
const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  year: Number,
  rating: Number,
  description: String,
});

const Movie = mongoose.model('Movie', movieSchema);

// GET all movies
// We add a fake 500ms delay so we can clearly see cache misses are slow
router.get('/', async (req, res) => {
  await new Promise(r => setTimeout(r, 500)); // simulated DB latency
  const movies = await Movie.find();
  res.json({ source: 'database', count: movies.length, movies });
});

// GET movies by genre
router.get('/genre/:genre', async (req, res) => {
  await new Promise(r => setTimeout(r, 500));
  const movies = await Movie.find({ genre: req.params.genre });
  res.json({ source: 'database', genre: req.params.genre, movies });
});

// GET single movie by ID
router.get('/:id', async (req, res) => {
  await new Promise(r => setTimeout(r, 500));
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json({ source: 'database', movie });
});

// POST create movie (we won't cache POST — more on this later)
router.post('/', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.status(201).json({ source: 'database', movie });
});

module.exports = router;