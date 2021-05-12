var mongoose = require("mongoose");
const mongoConnectionString = require("../constants");
require("dotenv").config();
const db = process.env.mongoConnectionString || mongoConnectionString;
/* Connect to the DB */
mongoose.connect(db, function () {
  /* Drop the DB */
  mongoose.connection.db
    .dropDatabase()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(-1);
    });
});
