const express = require('express');
const router = express.Router();

// Route for Swagger API documentation
router.use('/', require('./swagger'));

// Route for contacts API endpoints
router.use('/contacts', require('./contacts'));

module.exports = router;