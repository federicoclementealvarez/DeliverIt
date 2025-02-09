import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DeliverIt backend API',
    version: '1.0.0',
    description: 'REST API for DeliverIt backend methods',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./**/*.routes.ts', './**/*.schema.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
