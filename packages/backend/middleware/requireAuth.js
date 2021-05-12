const createError = require("http-errors");
// import createError from "http-errors";
// import { RequestHandler } from "express";

const mongoose = require("mongoose");

const requireAuth = async (req, res, next) => {
  try {
    const user =
      // @ts-ignore
      req.session.userId &&
      // @ts-ignore
      (await mongoose
        .model("User")
        .findOne({ _id: req.session.userId })
        .exec());

    if (!user) {
      return next(
        createError(401, "You need to be logged in to perform this action.")
      );
    }
    next();
  } catch (error) {
    console.error("CAUGHT YOU IN REQUIREAUTH>>>", error);
  }
};

module.exports = requireAuth;
