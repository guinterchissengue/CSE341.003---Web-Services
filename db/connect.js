require('dotenv').config();
const { MongoClient } = require('mongodb');

let _db;

// Initialize the database connection (only once)
const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      // Força a base de dados exata do projeto atual: explore-mozambique
      const dbName = process.env.DB_NAME || 'explore-mozambique';
      _db = client.db(dbName);
      console.log(`Connected successfully to database: ${_db.databaseName}`);
      callback(null, _db);
    })
    .catch((err) => {
      console.error('Database connection error:', err);
      callback(err);
    });
};

// Retrieve the initialized database instance
const getDb 