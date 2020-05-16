'use strict'
/**
 * @author: Krystian John Dumapit
 * @createdAt: 02-03-2020 02:20:45
 * @updatedAt: 05-15-2020 23:57:30
 * @description: Database Connection Configuration
 *               Docs: https://mongoosejs.com/docs/connections.html
 */

const mongoose = require('mongoose')

const connect = () => {
  const options = {
    // if you specify useNewUrlParser: true, you must specify a port in your connection string,
    // like mongodb://localhost:27017/dbname.
    // The new url parser does not support connection strings that do not have a port,
    // like mongodb://localhost/dbname.
    useNewUrlParser: true,

    // False by default.
    // Set to true to opt in to using the MongoDB driver's new connection management engine.
    // You should set this option to true,
    // except for the unlikely case that it prevents you from maintaining a stable connection.
    useUnifiedTopology: true,

    // With useUnifiedTopology, the MongoDB driver will try to find a server to send any given operation to,
    // and keep retrying for serverSelectionTimeoutMS milliseconds.
    // If not set, the MongoDB driver defaults to using 30000 (30 seconds).
    serverSelectionTimeoutMS: 15000,

    // How long the MongoDB driver will wait before killing a socket due to inactivity after initial connection.
    // This is set to 30000 by default,
    // you should set this to 2-3x your longest running operation
    // if you expect some of your database operations to run longer than 20 seconds.
    // Close sockets after 45 seconds of inactivity
    socketTimeoutMS: 45000,

    // By default, mongoose will automatically build indexes defined in your schema when it connects.
    // This is great for development, but not ideal for large production deployments,
    // because index builds can cause performance degradation.
    // If you set autoIndex to false, mongoose will not automatically build indexes
    // for any model associated with this connection.
    autoIndex: false,

    // False by default. Set to true to make Mongoose's default index build use createIndex()
    //instead of ensureIndex() to avoid deprecation warnings from the MongoDB driver.
    // useCreateIndex: true
  }

  const URI = `${process.env.DB_URL}${process.env.DB_NAME}?retryWrites=true&w=majority`
  const mongodb = mongoose.connect(URI, options)

  mongoose.connection
    .on('error', (error) => {
      console.log('\x1b[31m', '\n** Oh no! Connection Error. **\n')
    })
    .on('disconnected', () => {
      console.log('\x1b[33m', '\n** Sorry. Database Disconnected. **\n')
    })
    .once('open', () => {
      console.log('\x1b[32m', '\n** Database Connected. **\n')
    })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('\x1b[31m', '\nApplication Terminated!\n')
      process.exit(0)
    })
  })

  return mongodb
}

module.exports.connect = connect
