require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./db/connect');
const placesRoutes = require('./routes/places');
const reviewsRoutes = require('./routes/reviews');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Carregar documentação Swagger (arquivo Swagger.json na raiz)
let swaggerDocument = {};
try {
  swaggerDocument = require('./Swagger.json');
} catch (error) {
  console.warn('Swagger.json not yet populated or invalid JSON.');
}

const app = express();

// Middlewares essenciais
app.use(cors());
app.use(express.json());

// Rota raiz de teste / status
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Explore Mozambique API',
    docs: '/api-docs'
  });
});

// Documentação Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas da API
app.use('/places', placesRoutes);
app.use('/reviews', reviewsRoutes);

// Middlewares de Erro (devem ficar sempre após as rotas)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Conectar ao MongoDB antes de iniciar o servidor HTTP
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running in mode: http://localhost:${PORT}`);
      console.log(`Swagger Docs available at: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();