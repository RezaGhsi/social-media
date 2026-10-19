const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = require("./swaggerConfig");

const options = {
  swaggerDefinition,
  apis: ["./src/features/v1/**/*.docs.js", "./src/features/v1/**/*.routes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
