const express = require("express");
const app = express();
const mongodb = require("./DB/database");
const indexRoute = require("./routes/index");

app.use("/", indexRoute);
const Port = process.env.PORT || 8080;

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(Port, () => {
      console.log(`App is listening on ${Port}`);
    });
  }
});
