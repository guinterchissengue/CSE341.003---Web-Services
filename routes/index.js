const express = require('express');
const router = express.Router();

// Mount contacts router
router.use('/contacts', require('./contacts'));

module.exports = router;