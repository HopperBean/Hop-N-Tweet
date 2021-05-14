const { Schema, Types } = require("mongoose");
const mongoose = require("mongoose");

const Post = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  text: String,
  users: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
});

mongoose.model("Post", Post);
