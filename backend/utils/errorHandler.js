 // error handler class
 
 class ErrorHandler extends Error {
    constructor(message, statusCode){   //constructor has error message and status code 
      super(message);
      this.statusCode = statusCode

      Error.captureStackTrace(this, this.constructor)
    }
 }

 module.exports = ErrorHandler;