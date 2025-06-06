// swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API',
      version: '1.0.0',
      description: 'API Docs.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/**/*.ts']

};

export const swaggerSpec = swaggerJsdoc(options);
