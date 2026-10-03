// Middleware para capturar rotas inexistentes (404)
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
};

// Middleware para tratamento global de erros (500)
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Server Error:', err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
};

module.exports = { notFound, errorHandler };