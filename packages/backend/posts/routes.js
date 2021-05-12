const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

// create
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return next(createError(401, "You must provide text."));
    }

    const Post = mongoose.model("Post");
    const post = await Post.create({
      text,
      // @ts-ignore
      user: req.session.userId,
    });

    return res.json(post);
  } catch (error) {
    console.error("CAUGHT YOU>>>>>", error);
  }
});

// list
router.get("/", async (req, res, next) => {
  const Post = mongoose.model("Post");
  // @ts-ignore
  const posts = await Post.find().populate({
    path: "user",
    model: "User",
  });
  return res.json(posts);
});

module.exports = router;
