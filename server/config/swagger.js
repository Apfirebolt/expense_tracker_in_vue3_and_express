import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Expense Tracker API Documentation',
      version: '1.0.0',
      description: 'API documentation for the MEVN Expense Tracker application',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: Bearer <token>',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Path to the API docs (scans route files for JSDoc comments)
  apis: ['./server/routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec