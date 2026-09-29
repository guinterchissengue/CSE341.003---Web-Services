const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');

// Import the Swagger document (committed to the repository so Render can load it)
const swaggerDocument = require('../swagger.json');

// Serve the Swagger UI static assets and the interactive page at /api-docs
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
