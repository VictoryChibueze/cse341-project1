const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const mongodb = require("./DB/database");
const indexRoute = require("./routes/index");

/* **********MIDDLEWARES************* */
app.use(bodyParser.json());
app.use("/", indexRoute);

console.log(process.env.PORT);
console.log(process.env.MONGODB_URL);

/* ************INITIALIZING AND LISTENING TO THE DATABASE AND RUNNING SERVER****************** */
const Port = process.env.PORT || 8080;
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(Port, () => {
      console.log(`Database is listening and node is running on ${Port}`);
    });
  }
});
