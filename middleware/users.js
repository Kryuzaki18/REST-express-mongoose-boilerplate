'use strict'
/**
 * @author: Krystian John Dumapit
 * @createdAt: 02-03-2020 02:20:45
 * @updatedAt: 05-12-2020 00:50:10
 * @description: Users Validation
 */
const Users = require('../models/users')

// Check if valid ID
const checkID = async (req, res, next) => {
  const id = req.params.id

  if (isNaN(id))
    return res.status(400).json({ error: true, msg: 'Invalid id.' })

  await Users.findById(id, (error, users) => {
    if (error)
      return res.status(404).json({ error: true, msg: 'An error occured.' })

    if (users.length === 0)
      return res.status(200).json({ error: false, msg: 'Record not found.' })

    next()
  })
}

// Check if valid or exist email
const checkEmail = async (req, res, next) => {
  const email = req.body.email

  await Users.findOne({ email: email }, (error, users) => {
    if (error)
      return res.status(404).json({ error: true, msg: 'An error occured.' })

    if (users.length === 0)
      return res.status(200).json({ error: false, msg: 'Email not found.' })

    next()
  })
}

// Check if valid username
const checkUsername = async (req, res, next) => {
  const username = req.body.username

  await Users.findOne({ username: username }, (error, users) => {
    if (error)
      return res.status(404).json({ error: true, msg: 'An error occured.' })

    if (users.length === 0)
      return res.status(200).json({ error: false, msg: 'Username not found.' })

    next()
  })
}

module.exports = {
  checkID: checkID,
  checkEmail: checkEmail,
  checkUsername: checkUsername,
}
