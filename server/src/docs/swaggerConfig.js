const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Social Media API",
    version: "1.0.0",
    description: "nekoSocial Full API Documentation",
  },
  servers: [
    { url: "http://localhost:5000/api/v1", description: "Development" },
    { url: "https://nekosocial.com/api/v1", description: "Production" },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "access-token",
      },
    },
  },
  security: [{ cookieAuth: [] }],
};

module.exports = swaggerDefinition;
