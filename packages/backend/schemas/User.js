const { Schema, Types } = require("mongoose")
// import * as mongoose from "mongoose";
const mongoose = require ("mongoose")

const User = new Schema({
  handle: String,
  passwordHash: { type: String, select: false },
  posts: [{ type: Types.ObjectId, ref: "Post" }],
});

mongoose.model("User", User);
