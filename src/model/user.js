const express = require("express");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, lowercase: true, trim: true },
  password: String,
  token: String,
  contacts: Array,
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = { User };
