"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Server Config
const config = require("./config");
config.init(app);

// Seeders
// config.seed();
// config.unseed();
