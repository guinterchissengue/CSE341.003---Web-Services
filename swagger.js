// Generates swagger.json from the annotated route files.
// Run with: npm run swagger
const fs = require('fs');
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

const doc = {
  info: {
    title: 'Contacts API',
    description: 'REST API to create, read, update and delete contacts stored in MongoDB.',
    version: '1.0.0'
  },
  basePath: '/',
  tags: [{ name: 'Contacts', description: 'Operations for managing contacts' }],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    ContactInput: {
      $firstName: 'Ana',
      $lastName: 'Silva',
      $email: 'ana.silva@test.com',
      $favoriteColor: 'Blue',
      $birthday: '1995-04-12'
    },
    Contact: {
      _id: '66f9a1b2c3d4e5f607182930',
      firstName: 'Ana',
      lastName: 'Silva',
      email: 'ana.silva@test.com',
      favoriteColor: 'Blue',
      birthday: '1995-04-12'
    },
    CreatedContact: { id: '66f9a1b2c3d4e5f607182930' },
    Error: { message: 'Contact not found.' }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // Remove host and schemes so Swagger UI always uses the current URL and protocol
  // (works on localhost over http and on Render over https without any change)
  const swagger = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  delete swagger.host;
  delete swagger.schemes;

  // Normalize paths: "/contacts/" becomes "/contacts"
  const cleanPaths = {};
  Object.keys(swagger.paths).forEach((route) => {
    const clean = route.length > 1 ? route.replace(/\/+$/, '') : route;
    cleanPaths[clean] = swagger.paths[route];
  });
  swagger.paths = cleanPaths;

  fs.writeFileSync(outputFile, JSON.stringify(swagger, null, 2));

  console.log('Swagger documentation generated successfully!');
});