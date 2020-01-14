"use strict";

const mongoose = require("../config/db_connection").mongoose;
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", usersSchema);
