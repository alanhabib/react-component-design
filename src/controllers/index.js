const express = require("express");
const instanceOfRouter = express.Router();
const ObjectId = require("mongodb").ObjectId;
const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const nodemailer = require("../config/nodemailer.config");
const { User, Booking } = require("../model/user");

const room = [
  {
    name: "Banana",
    capacity: 4,
  },
  {
    name: "Apple",
    capacity: 2,
  },
  {
    name: "Orange",
    capacity: 6,
  },
];

instanceOfRouter.route("/register").post(async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.TOKEN_KEY);

    const user = new User({
      first_name,
      last_name,
      email: email,
      password: encryptedPassword,
      token: token,
      verified: false,
    });

    await user.save();

    nodemailer.sendConfirmationEmail(user.first_name, user.email, token);

    return res.status(201).send({
      message: `Sent a verification email to ${email}`,
    });
  } catch (error) {
    console.log(error);
  }
});

instanceOfRouter.route("/confirm/:token").get(async (req, res) => {
  try {
    // uppdatera användare som epost-verifierad
    console.log("ID: ", req.params);
    const user = await User.findOne({ token: req.params.token });
    if (!user) return res.status(400).send("invalid link");

    await User.updateOne({ _id: user._id, verified: true });

    // redirect till welcome (som verifierar token)
    res.redirect("http://localhost:3000");
  } catch (error) {
    res
      .status(500)
      .send(`There was a problem verifying the user with error: ${error}`);
  }
});

instanceOfRouter.route("/welcome").get(auth, async (req, res) => {
  try {
    const user = User.findOne({ _id: req.userId });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .send(`There was a problem finding the user with error: ${error}`);
  }
});

instanceOfRouter.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (user && passwordIsValid) {
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
  } catch (error) {
    console.log(error);
  }
});

const rooms = [
  {
    room: "Banana",
    capacity: 6,
    start: ["20:30"],
    end: ["22:00"],
  },
  {
    room: "Orange",
    capacity: 6,
    start: [],
    end: [],
  },
  {
    room: "Pear",
    capacity: 6,
    start: [],
    end: [],
  },
];

instanceOfRouter.route("/rooms").post(async (req, res) => {
  try {
    const { start, end } = req.body;
    if (!(start && end)) {
      res.status(400).send("All input is required");
    }

    const availableRooms = rooms.filter(
      (room) => !room.start.includes(start) && !room.end.includes(end)
    );

    res.status(200).json(availableRooms);
  } catch (error) {
    console.log("WRONG BOOKING; ", error);
  }
});

instanceOfRouter.route("/book").post(async (req, res) => {
  try {
    const { roomName, capacity, start, end, title } = req.body;

    if (!(room && start)) {
      res.status(400).send("All input is required");
    }

    const booking = new Booking({
      roomName,
      start,
      end,
      title,
      capacity,
      user,
    });
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).send(`There was a problem booking room: ${error}`);
  }
});

module.exports = instanceOfRouter;
