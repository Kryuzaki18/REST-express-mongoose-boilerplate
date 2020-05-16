/**
 * @author: Krystian John Dumapit
 * @lastAuthor: Krystian John Dumapit
 * @createdAt: 05-16-2020 02:15:40
 * @updatedAt: 05-16-2020 02:15:40
 * @description: Seeders Bootstrap
 */

const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv').config()

// Connect mongodb
const db = require('../config/db')

/**
 * @param {String} param - `seed` or `unseed`
 * @description: seed or unseed data
 */
module.exports = (param) => {
  let moduleName = null

  db.connect().then(() => {
    // Read current directory, check if not `index.js` file
    fs.readdirSync(__dirname).forEach((file) => {
      if (file !== 'index.js') {
        // File name without extension
        moduleName = file.split('.')[0]

        if (param == 'seed') {
          // Seed all data
          require('./' + moduleName).create()
          console.log('\x1b[36m', `\n${moduleName} are successfully created.\n`)
        } else if (param == 'unseed') {
          // Unseed all data
          require('./' + moduleName).drop()
          console.log('\x1b[36m', `\n${moduleName} are successfully dropped.\n`)
        }
      }
    })
  })
}
