const express = require("express");
const instanceOfRouter = express.Router();
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const nodemailer = require("../config/nodemailer.config");

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  first_name: String,
  last_name: String,
  password: String,
  token: String,
  contacts: Array,
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

UserSchema.methods.generateVerificationToken = function () {
  const user = this;
  const verificationToken = jwt.sign(
    { ID: user._id },
    process.env.USER_VERIFICATION_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return verificationToken;
};
module.exports = mongoose.model("User", UserSchema);

let db;

MongoClient.connect(
  Db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, client) {
    if (err) throw err;
    db = client.db("users");
  }
);

instanceOfRouter.route("/register").post(async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await db.collection("activeUsers").findOne({ email });

    if (oldUser) {
      return res.status(409).send("User already exist. Use login instead");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.TOKEN_KEY);

    const user = {
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      token: token,
      verified: false,
      contacts: [],
    };

    await db.collection("activeUsers").insertOne(user);

    nodemailer.sendConfirmationEmail(user.first_name, user.email, token);

    return res.status(201).send({
      message: `Sent a verification email to ${email}`,
    });
    // res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

instanceOfRouter.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await db.collection("activeUsers").findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    }
    // res.status(400).send("Invalid credentials");
  } catch (error) {
    console.log(error);
  }
});

instanceOfRouter.route("/confirm/:token").get(async (req, res) => {
  try {
    // uppdatera användare som epost-verifierad
    const user = await db
      .collection("activeUsers")
      .updateOne({ token: req.params.token }, { $set: { verified: true } });

    // Skicka med jwt-token i response som användaren behöver för att autha varje request
    const token = jwt.sign({ _id: ObjectId(user._id) }, process.env.TOKEN_KEY);

    res.status(200).json(token);
    // redirect till welcome (som verifierar token)
  } catch (error) {
    res
      .status(500)
      .send(`There was a problem verifying the user with error: ${error}`);
  }
});

instanceOfRouter.route("/welcome").get(auth, async (req, res) => {
  console.log("ID_ ", req.userId);
  try {
    const user = await db
      .collection("activeUsers")
      .findOne({ _id: req.userId });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .send(`There was a problem finding the user with error: ${error}`);
  }
});

instanceOfRouter.route("/add").post(async (request, response) => {
  const myObj = {
    name: request.body.name,
    position: request.body.position,
    level: request.body.level,
  };

  try {
    await db
      .collection("activeUsers")
      .updateOne({ email: request.body.email }, { $push: { contacts: myObj } });
  } catch (error) {
    response
      .status(500)
      .send(`There was a problem adding contacts with error: ${error}`);
  }
});

module.exports = instanceOfRouter;
