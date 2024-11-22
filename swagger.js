const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contact API",
    description: "Contacts API",
  },
  host: "https://cse341-project1-4pf5.onrender.com",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFile, doc);
