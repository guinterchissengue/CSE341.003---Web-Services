const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');

// Import the generated swagger document
const swaggerDocument = require('../swagger.json');

// Setup swagger UI route
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;