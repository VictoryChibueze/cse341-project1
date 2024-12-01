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
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid contact id to find a contact.");
    }
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

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const result = await mongodb
    .getData()
    .db()
    .collection("contacts")
    .insertOne(contact);

  if (result.acknowledged > 0) {
    res.status(201).send();
  } else {
    res
      .status(500)
      .json(result.error || "an error occurred while creating user");
  }
};

const updateContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid contact id to update a contact.");
  }

  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  const result = await mongodb
    .getData()
    .db()
    .collection("contacts")
    .updateOne({ _id: userId }, { $set: contact });

  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "an error occurred while updating user");
  }
};
const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid contact id to delete a contact.");
  }
  const userId = new ObjectId(req.params.id);

  const result = await mongodb
    .getData()
    .db()
    .collection("contacts")
    .deleteOne({ _id: userId });

  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "an error occurred while deleting user");
  }
};
module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
