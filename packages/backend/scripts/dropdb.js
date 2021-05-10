var mongoose = require("mongoose");
const { mongoConnectionString } = require("../constants");
require("dotenv").config();
/* Connect to the DB */
mongoose.connect(
  "mongodb://localhost/twitterbean",
  function () {
    /* Drop the DB */
    mongoose.connection.db
      .dropDatabase()
      .then(() => process.exit(0))
      .catch((e) => {
        console.error(e);
        process.exit(-1);
      });
  }
);
