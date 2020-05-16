'use strict'
/**
 * @author: Krystian John Dumapit
 * @createdAt: 02-03-2020 02:20:45
 * @updatedAt: 05-12-2020 00:50:10
 * @description: Users Controller
 */
const express = require('express')
const router = express.Router()

// Users Model
const Users = require('../models/users')

// Users Middleware
const { checkID } = require('../middleware/users')

router.use((req, res, next) => {
  next()
})

router.get('/', async (req, res) => {
  const users = await Users.find()
  res.status(200).json({ error: false, results: users })
})

router.get('/:id', checkID, (req, res) => {})

router.post('/', (req, res) => {})

router.put('/:id', checkID, (req, res) => {})

router.delete('/:id', checkID, async (req, res) => {
  const id = req.params.id
  await Users.findByIdAndDelete(id)
})

module.exports = router
