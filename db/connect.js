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
      // Use the database defined in the connection string
      // (or DB_NAME from the .env file, if provided)
      _db = client.db(process.env.DB_NAME || undefined);
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

// Retrieve the initialized database instance
const getDb = () => {
  if (!_db) {
    throw Error('Database not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
