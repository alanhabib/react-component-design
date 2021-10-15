const express = require("express");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, lowercase: true, trim: true },
  password: String,
  token: String,
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const User = mongoose.model("User", UserSchema);

const BookingSchema = new mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  eventTitle: { type: String, required: true },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  roomId: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

const RoomSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  availableStart: Date,
  availableEnd: Date,
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = { User, Booking, Room };
