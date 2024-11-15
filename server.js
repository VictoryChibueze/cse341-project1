const express = require("express");
const app = express();
const indexRoute = require("./routes/index");

app.use("/", indexRoute);
const Port = process.env.PORT || 8080;
app.listen(Port, () => {
  console.log(`App is listening on ${Port}`);
});
