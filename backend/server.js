const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

//Handle uncaught expection

process.on('uncaughtException' , err => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down the server due to uncaught Exception');
  process.exit(1)
})


// setting up config file

dotenv.config({path: 'backend/config/config.env'})

//Connecting to database
connectDatabase();

const server= app.listen(process.env.PORT, () => {
  console.log(`server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handle unhandeld promise rejection

// err is a callback function
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandeld promise rejection');
  server.close(() => {
    process.exit(1)
  })
})