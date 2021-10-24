const express = require('express');
const app = express()

const errorMiddleware = require('./middlewares/errors')

 app.use(express.json());
 
//Importing all the routers
const products = require('./routes/product');
const auth = require('./routes/auth');
const authVendor = require('./routes/authVendor');

app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', authVendor)

//Middleware to handle errors
app.use(errorMiddleware);

module.exports= app