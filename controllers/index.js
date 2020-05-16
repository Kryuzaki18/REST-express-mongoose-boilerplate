'use strict'
/**
 * @author: Krystian John Dumapit
 * @createdAt: 02-15-2020 00:10:15
 * @updatedAt: 05-15-2020 23:57:30
 * @description: Controllers Bootstrap
 */
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const api_v = process.env.API_V

/**
 * @param {Object} app - Express library
 */
const controllers = (app) => {
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
      )
    })
    .forEach((file) => {
      let newFile = file.split('.').slice(0, -1).join('.') || file
      let fileImport = require(`./${newFile}`)
      app.use(`/api/${api_v}/${newFile}`, fileImport)
    })
}

module.exports.init = controllers
