const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API documentation for the Contacts Project'
  },
  // Ensure this matches your Render URL when deploying, e.g., 'your-app-name.onrender.com'
  // For local testing, keep it as 'localhost:8080'
  host: 'localhost:8080', 
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);