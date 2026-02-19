const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const movieRoutes = require('./routes/movies');

const app = express();

// Trust nginx as a proxy — so req.ip gives the real client IP, not nginx's IP
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// Health check endpoint — nginx and Docker can use this to know if Express is up
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/movies', movieRoutes);

const PORT = 3000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Express running on port ${PORT}`));
};

start();