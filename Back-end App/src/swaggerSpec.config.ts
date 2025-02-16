import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "DeliverIt backend API",
    version: "1.0.0",
    description: "REST API for DeliverIt backend methods",
  },
};

const options = {
  swaggerDefinition, // Definición base

  apis: ["./**/*.routes.ts", "./**/*.schema.ts"], // Rutas de los archivos que contienen la documentación
};

// Exportar la especificación de Swagger generada
export const swaggerSpec = swaggerJSDoc(options);
