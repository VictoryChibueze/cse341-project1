const mongodb = require("../DB/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getData().db().collection("contacts").find();
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getData()
      .db()
      .collection("contacts")
      .find({ _id: userId });
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getAll,
  getSingle,
};
