'use strict'
/**
 * @author: Krystian John Dumapit
 * @createdAt: 02-03-2020 02:20:45
 * @updatedAt: 05-12-2020 00:50:10
 * @description: Cors(Cross-Origin-Resource-Sharing): allow access
 */

const express = require('express')
const router = express.Router()
const cors = require('cors')

const allowedOrigins = require('./allowedOrigins')

/**
 * @param {Object} app - Express library
 */
module.exports.init = (app) => {
  let isAllowedOrigins = true
  const msg =
    'The CORS policy for this site does not ' +
    'allow access from the specified Origin.'

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) === -1) {
          isAllowedOrigins = false
          return callback(new Error(msg), false)
        }
        return callback(null, true)
      },
      credentials: true,
    })
  )

  if (!isAllowedOrigins) {
    router.use((req, res, next) => {
      res.status(200).json({
        error: true,
        msg: `Sorry! ${msg}`,
      })
    })
  }
}
