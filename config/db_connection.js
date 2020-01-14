"use strict";

const port = process.env.PORT;
const site = process.env.SITE_URL;

const mongoose = require("mongoose");

module.exports = app => {
  const options = {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };

  mongoose.connect(process.env.DB_URL, options);
  const connection = mongoose.connection;

  connection
    .on("error", error => {
      console.log("Sorry! Connection error.");
    })
    .on("disconnected", () => {
      connection;
    })
    .once("open", () => {
      console.log("** Connected to database. **");

      app.listen(port, () => {
        console.log(
          "\x1b[33m%s\x1b[0m",
          `Express is listening on ${site}:${port}`
        );
      });
    });
};

module.exports.mongoose = mongoose;
