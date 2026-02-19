const mongoose = require('mongoose');

const movies = [
  { title: 'Inception', genre: 'Sci-Fi', year: 2010, rating: 8.8, description: 'A thief who steals corporate secrets through dream-sharing technology.' },
  { title: 'The Dark Knight', genre: 'Action', year: 2008, rating: 9.0, description: 'Batman faces the Joker, a criminal mastermind.' },
  { title: 'Interstellar', genre: 'Sci-Fi', year: 2014, rating: 8.6, description: 'Astronauts travel through a wormhole near Saturn.' },
  { title: 'Pulp Fiction', genre: 'Crime', year: 1994, rating: 8.9, description: 'Several stories of criminal Los Angeles intertwine.' },
  { title: 'The Matrix', genre: 'Sci-Fi', year: 1999, rating: 8.7, description: 'A hacker discovers reality is a simulation.' },
  { title: 'Goodfellas', genre: 'Crime', year: 1990, rating: 8.7, description: 'The story of Henry Hill and his life in the mob.' },
  { title: 'The Shawshank Redemption', genre: 'Drama', year: 1994, rating: 9.3, description: 'Two imprisoned men bond over years.' },
  { title: 'Fight Club', genre: 'Drama', year: 1999, rating: 8.8, description: 'An insomniac and a soap salesman form an underground fight club.' },
];

const run = async () => {
  await mongoose.connect('mongodb://mongodb:27017/moviedb');
  await mongoose.connection.collection('movies').deleteMany({});
  await mongoose.connection.collection('movies').insertMany(movies);
  console.log('Database seeded with', movies.length, 'movies');
  process.exit(0);
};

run();