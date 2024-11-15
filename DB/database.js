const dotenv = require("dotenv");
dotenv.config();

const MongoClient = require("mongodb").mongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    console.log(`Database is already initialized`);
    return callback(null, callback);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getData = () => {};
