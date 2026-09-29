const express = require('express');
const router = express.Router();

// Route for the interactive Swagger API documentation (/api-docs)
router.use('/', require('./swagger'));

// Routes for the contacts API endpoints
router.use('/contacts', require('./contacts'));

// Redirect the root URL to the API documentation
router.get('/', (req, res) => {
  res.redirect('/api-docs');
});

module.exports = router;
