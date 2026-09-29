// Load environment variables before anything else
require('dotenv').config();

const express = require('express');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

app
  // Parse incoming JSON request bodies
  .use(express.json())
  .use((req, res, next) => {
    // CORS headers so the API can be called from any external source
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Answer CORS preflight requests immediately
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  })
  // Connect all endpoints to their routes
  .use('/', require('./routes'));

// Initialize the database connection, then start the server
mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});
