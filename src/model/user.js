const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});
const User = mongoose.model("User", UserSchema);

const BookingSchema = new mongoose.Schema({
  roomName: String,
  start: { type: String, required: true },
  end: { type: String, required: true },
  title: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  capacity: Number,
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = { User, Booking };
