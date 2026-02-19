const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 'mongodb' here is the container name — Docker resolves it to the right IP
    await mongoose.connect('mongodb://mongodb:27017/moviedb');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;