// swaggerConfig.ts
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Mutirões Comunitários",
      version: "1.0.0",
      description: "Documentação da API de Mutirões Comunitários",
    },
    servers: [
      {
        url: "http://localhost:5100/api/v1",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
