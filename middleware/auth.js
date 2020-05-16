'use strict'
/**
 * @author: Krystian John Dumapit
 * @createdAt: 02-03-2020 02:20:45
 * @updatedAt: 05-12-2020 00:50:10
 * @description: Users Authentication
 */

const express = require('express')
const router = express.Router()

// Users Model
const Users = require('../models/users')

// Users Middleware
const { checkUsername, checkEmail } = require('../middleware/users')

// router.use((req, res, next) => {
//   next();
// });

router.post('/login', [checkEmail], async (req, res) => {
  let data = {
    password: req.body.password,
  }

  if (username) data.username = username
  if (email) data.email = email

  await Users.findOne(data, (error, users) => {
    if (error)
      return res.status(404).json({ error: true, msg: 'An error occured.' })

    if (users.length === 0) {
      res.status(200).json({ error: false, msg: 'User not found.' })
    } else {
      res.status(200).json({ error: false, msg: 'Successfully Login.' })
    }
  })
})

router.post('/register', [checkEmail, checkUsername], async (req, res) => {
  const users = await new Users(req.body)

  if (users.length === 1) {
    await users.save()
    res.status(200).json({ error: false, msg: 'Successfully Register.' })
  } else res.status(400).json({ error: true, msg: 'An error occured.' })
})

module.exports = router
