const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  
  
  if(process.env.NODE_ENV === 'DEVELOPMENT')
  {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack
    })
  }

  if(process.env.NODE_ENV === 'PRODUCTION') {
    let error = {...err}

    error.message = err.message;

    // Wrong moongose Object ID error  // wrong id error
    if (err.name === 'CastError') {
      const message = `Resource not found. invalid: ${err.path}`
      error = new ErrorHandler(message, 400)
    }

    // Handling moongose validation error //Error Occur while missing input data

    if (err.name === 'ValidationError')
    {
      const message = Object.values(err.errors).map(value => value.message);
      error = new ErrorHandler(message, 400)
    }

    //Handling Mongoose Duplicate Key Error

    if(err.code === 11000 )
    {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`
      error = new ErrorHandler(message, 400)

    }

    //Handling wrong Jwt Error
    if (err.name === 'JsonWebTokenError')
    {
      const message = 'Json Web Token Is Invalid. try again'
      error = new ErrorHandler(message, 400)
    }

     //Handling Expire Jwt Error
     if (err.name === 'TokenExpiredError')
     { 
       const message = 'Json Web Token Is Expired. try again'
       error = new ErrorHandler(message, 400)
     }


    res.status(err.statusCode).json({
      success: false,
      message: err.message || 'Internal server error'
    })
   
  
  }

  
}