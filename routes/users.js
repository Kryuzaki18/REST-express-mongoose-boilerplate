"use strict";

const express = require("express");
const router = express.Router();

// Users Model
const Users = require("../models/users");

// Users Middleware
const { checkID } = require("../middleware/users");

/**
 * Users init
 */
router.use((req, res, next) => {
  next();
});

/**
 * Get All Records
 */
router.get("/", async (req, res) => {
  const users = await Users.find();
  res.status(200).json({ error: false, results: users });
});

/**
 * Get one record
 */
router.get("/:id", checkID, (req, res) => {});
/**
 * Store Record
 */
router.post("/", (req, res) => {});

/**
 * Update Record
 */
router.put("/:id", checkID, (req, res) => {});

/**
 * Delete Record
 */
router.delete("/:id", checkID, async (req, res) => {
  const id = req.params.id;
  await Users.findByIdAndDelete(id);
});

module.exports = router;
