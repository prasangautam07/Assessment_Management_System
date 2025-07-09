// swagger.js or inside index.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Assessment Management System API',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    servers: [
      {
        url: 'http://localhost:3000'||'https://assessment-management-system-3gj3.onrender.com', // or your hosted URL
      },
    ],
  },
  apis: ['./routes/*.js','./routes/userRoutes.js', './index.js'], // path to your route files
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiMiddleware = swaggerUi.serve;
export const swaggerDocs = swaggerUi.setup(swaggerSpec);
