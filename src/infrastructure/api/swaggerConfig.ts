export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Star Wars API",
      version: "1.0.0",
      description: "API doc for star wars and participants",
    },
  },
  apis: ["./src/infrastructure/api/routes/*.ts"],
};
