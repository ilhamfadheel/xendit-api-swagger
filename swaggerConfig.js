const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Xendit API Documentation",
      version: "1.0.0",
      description:
        "API documentation for Xendit integration with Express and Node.js",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`, // Change the port based on your .env configuration
      },
    ],
  },
  apis: ["./routes/invoiceRoutes.js"], // files containing annotations for Swagger documentation
};

const specs = swaggerJsdoc(options);

module.exports = specs;
