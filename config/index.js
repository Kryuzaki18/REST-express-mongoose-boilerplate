"use strict";

const api_v = process.env.API_V;

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const cors = require("./cors");
const connection = require("./db_connection");

const routes = app => {
  // Authentication
  app.use(`/api/${api_v}/auth`, require("../middleware/auth"));

  // Token Checker
  app.use(`/api/${api_v}/*`, require("../middleware/token"));

  // Manual Routes
  // app.use(`/api/${api_v}/users`, require("./users"));

  // Dynamic Routes
  readDirSync({
    app: app,
    name: "routes"
  });
};

const readDirSync = params => {
  const folder = `./${params.name}`;

  fs.readdirSync(folder)
    .filter(file => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach(file => {
      let newFile =
        file
          .split(".")
          .slice(0, -1)
          .join(".") || file;
      let fileImport = require(`../${folder}/${newFile}`);
      if (params.name === "routes") {
        params.app.use(`/api/${api_v}/${newFile}`, fileImport);
      } else if (params.name === "seeders") {
        if (params.isCreate) fileImport.create();
        else fileImport.drop();
      }
    });
};

const seeders = isCreate => {
  const params = {
    name: "seeders",
    isCreate: isCreate
  };
  readDirSync(params);
};

module.exports.init = app => {
  cors(app);
  connection(app);
  routes(app);
};

module.exports.seed = () => seeders(true);
module.exports.unseed = () => seeders(false);
