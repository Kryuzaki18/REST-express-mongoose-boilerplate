"use strict";

const express = require("express");
const router = express.Router();

// Users Model
const Users = require("../models/users");

// Users Middleware
const { checkUsername, checkEmail } = require("../middleware/users");

/**
 * Users init
 */
// router.use((req, res, next) => {
//   next();
// });

/**
 * Login
 */
router.post("/login", [checkEmail], async (req, res) => {
  let data = {
    password: req.body.password
  };

  if (username) data.username = username;
  if (email) data.email = email;

  await Users.findOne(data, (error, users) => {
    if (error)
      return res.status(404).json({ error: true, msg: "An error occured." });

    if (users.length === 0) {
      res.status(200).json({ error: false, msg: "User not found." });
    } else {
      res.status(200).json({ error: false, msg: "Successfully Login." });
    }
  });
});

/**
 * Register
 */
router.post("/register", [checkEmail, checkUsername], async (req, res) => {
  const users = await new Users(req.body);

  if (users.length === 1) {
    await users.save();
    res.status(200).json({ error: false, msg: "Successfully Register." });
  } else res.status(400).json({ error: true, msg: "An error occured." });
});

module.exports = router;
