'use strict'
/**
 * @author: Krystian John Dumapit
 * @createdAt: 02-03-2020 02:20:45
 * @updatedAt: 05-15-2020 23:57:30
 * @description: Routes
 */

const api_v = process.env.API_V

const routes = (app) => {
  // Authentication
  app.use(`/api/${api_v}/auth`, require('../middleware/auth'))

  // Token Checker
  app.use(`/api/${api_v}/*`, require('../middleware/token'))
}

module.exports.init = routes
