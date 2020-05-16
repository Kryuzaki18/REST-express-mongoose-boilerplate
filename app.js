'use strict'
/**
 * @author: Krystian John Dumapit
 * @createdAt: 02-03-2020 02:20:45
 * @updatedAt: 05-15-2020 23:57:30
 * @description: App Bootstrap
 */

// .env
require('dotenv').config()
const port = process.env.PORT
const site = process.env.SITE_URL
const api_v = process.env.API_V

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./config/db')
db.connect().then(
  () => {
    // Cors(Cross-Origin-Resource-Sharing)
    const cors = require('./config/cors')
    cors.init(app)

    // Routes
    const routes = require('./config/routes')
    routes.init(app)

    // Controllers
    const controllers = require('./controllers')
    controllers.init(app)

    // Default response
    app.use('/', (req, res, next) => {
      res.status(200).json({ msg: 'Welcome to api' + api_v })
    })

    // Listen Express App
    app.listen(port, () => {
      console.log(
        '\x1b[33m%s\x1b[0m',
        `Express is listening on ${site}:${port}`
      )
    })
  },
  (err) => {
    console.log('\x1b[31m', '\n500 Internal Server Error.\n')
    process.exit(0)
  }
)
