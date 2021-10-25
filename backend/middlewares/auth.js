// Protecting route from unauthroize users.
const User = require('../models/user')
const Vendor = require("../models/vendor");
const jwt = require("jsonwebtoken");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// Checks if user is authenticated or not foun

exports.isAuthenticatedVendor = catchAsyncErrors (async (req, res, next) => {

  const {token } = req.cookies

  if(!token)
  {
    return next(new ErrorHandler ('Login first to access this resource.', 401))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  {
    req.vendor = await Vendor.findById(decoded.id);
    next()
  }

})

// Handling User authorizeRoles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
  if(!roles.includes(req.vendor.role))
  {
    return next(
    new ErrorHandler(`Role (${req.vendor.role}) is not allowed to access that resource`, 403))

  }
  next()
}
}