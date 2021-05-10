const { Schema, Types } = require("mongoose")
// import * as mongoose from "mongoose";
const mongoose = require ("mongoose")

const User = new Schema({
  firstName: String,
  lastName: String,
  img:{
    data: Buffer,
    contentType: String
  },
  bio: String,
  handle: String,
  passwordHash: { type: String, select: false },
  posts: [{ type: Types.ObjectId, ref: "Post" }],
});

mongoose.model("User", User);
