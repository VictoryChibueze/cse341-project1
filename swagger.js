const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contact API",
    description: "Contacts API",
  },
  host: "localhost:8080",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFile, doc);
