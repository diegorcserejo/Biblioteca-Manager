require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const livrosRoutes = require('./routes/livros');

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging simples
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Biblioteca',
      version: '1.0.0',
      description: 'WebService para gerenciamento de livros - Arquitetura Multicamada',
      contact: {
        name: 'Equipe Biblioteca',
        email: 'contato@biblioteca.com'
      },
    },
    servers: [
      {
        url: `http://192.168.1.102:${PORT}`,
        description: 'Servidor de Produção (Backend VM)',
      },
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da API
app.use('/api', livrosRoutes);

// Rota de teste/health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date(),
    uptime: process.uptime(),
    database: 'PostgreSQL'
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    nome: 'API Biblioteca',
    versao: '1.0.0',
    endpoints: {
      documentacao: '/api-docs',
      health: '/health',
      livros: '/api/livros'
    }
  });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(` Servidor rodando em http://192.168.1.102:${PORT}`);
  console.log(` Documentação Swagger em http://192.168.1.102:${PORT}/api-docs`);
  console.log(` Health check: http://192.168.1.102:${PORT}/health`);
});