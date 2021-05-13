const { Schema, Types } = require("mongoose");
const mongoose = require("mongoose");

const User = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  img: {
    type: String,
    default: "https://www.pngkit.com/png/detail/860-8603579_free-bird-clipart-cute-bird-svg.png",
  },
  bio: {
    type: String,
  default:""},
  handle: String,
  passwordHash: { type: String, select: false },
  posts: [{ type: Types.ObjectId, ref: "Post" }],
});

mongoose.model("User", User);
