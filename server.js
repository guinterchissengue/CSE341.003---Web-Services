const express = require('express');
const dotenv = require('dotenv');
const mongodb = require('./db/connect');

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

// Body parser middleware
app.use(express.json());

// CORS configuration headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Primary application routes
app.use('/', require('./routes'));

// Initialize MongoDB connection before starting the server
mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});