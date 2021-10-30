const Vendor = require('../models/vendor');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');



// Register new vendor => /api/v1/registervendor

exports.registerVendor = catchAsyncErrors (async (req, res, next) => {
  const { vendorname, shopname, shopaddress, vendorcontactno, shopcontactno, vendoremail, password} = req.body;

  const vendor = await Vendor.create ({ 
    vendorname,
    shopname,
    shopaddress,
    vendorcontactno,
    shopcontactno,
    vendoremail,
    password
      // avatar: {
    //   public_id: '',
    //   url: 'https://res.cloudinary.com/finalyearprojecttt/image/upload/v1634803436/young-man-avatar-character-260nw-661669825_vbgnae.webp '
    // }

  })

  sendToken(vendor, 200, res)

})

//Login Vendor => /api/v1/loginvendor

exports.loginVendor = catchAsyncErrors (async (req, res, next) => {
  const {vendoremail, password } = req.body;

  //Check if email and password is entered by user

  if (!vendoremail || !password)
  {
    return next(new ErrorHandler ('Please enter email and password', 400))
  }

  // If upper condition matches then it will find that user in database

  const vendor = await Vendor.findOne({vendoremail}).select('+password')

  if(!vendor)
  {
    return next(new ErrorHandler ('Invalid email anddd password', 401));

  }

  // Check if password is correct or not
  const isPasswordMatched = await vendor.comparePassword(password);

  if(!isPasswordMatched)
  {
    return next(new ErrorHandler ('Invalid email orrrrr password', 401));
  }

  sendToken(vendor, 200, res)
})

//Forgot Password => /api/v1/vendorpassword/forgot/

exports.forgotPassword = catchAsyncErrors (async (req, res, next) => {

  //Firslty i need to get the given input email from vendor

  const vendor = await Vendor.findOne({vendoremail: req.body.vendoremail});

  if(!vendor)
  {
    return next(new ErrorHandler ('User not found with this email', 404));
  }

  //If user exists then  getting reset token

  const resetToken = vendor.getResetPasswordToken();

  // validateBeforeSave is use because nodejs validate the data before saving it. so we need to save directly.
  await vendor.save({validateBeforeSave: false})

  //Create the reset password URl

  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/vendorpassword/reset/${resetToken}`;

  const message = `your password reset token is as follow: \n\n ${resetUrl}\n\n if you have not requested this email, then ignore it.`

  try{
    await sendEmail({
      email: vendor.vendoremail,
      subject:'Password Recovery',
      message
    })

    res.status(200).json({
      success: true,
      message: `Email send to ${vendor.vendoremail}`
    })

  }

  catch(error)
  {
    vendor.resetPasswordToken = undefined;
    vendor.resetPasswordExpire = undefined;

    await vendor.save({validateBeforeSave: false});
    return next(new ErrorHandler(error.message, 500));
  }

})

//Reset password => /api/v1/vendorpassword/reset/:token

exports.resetPassword = catchAsyncErrors (async (req, res, next) => {
  
  //Getting token from url and hashing it so we can compare it with hashtoken save in database to see it correct or not..
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

  // now we have hash url token we can compare that with our database

  const vendor = await Vendor.findOne({
    resetPasswordToken,
    resetPasswordExpire: {$gt: Date.now()} 

  })

  if(!vendor)
  {
    return next(new ErrorHandler ('password reset token is invalid and has been expired', 400))
  }

  //password and confirm password
  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler ('password does not match'), 400)
  }

  //if the password is same then setup new password
  vendor.password = req.body.password;

  vendor.resetPasswordToken = undefined;
  vendor.resetPasswordExpire = undefined;

  await vendor.save();

  sendToken (vendor, 200, res)
})

//Get Currently Logged In Vendor => /api/v1/vendor

exports.getVendorProfile = catchAsyncErrors (async (req, res, next) => {
  const vendor = await Vendor.findById(req.vendor.id);

  res.status(200).json({
    success: true,
    vendor
  })

})


//Logout vendor => /api/v1/logoutvendor

exports.logoutVendor = catchAsyncErrors (async (req, res, next) => {
   res.cookie('token', null, {
     expires: new Date(Date.now()),
     httpOnly: true
     
   })
  res.status(200).json({
    success: true,
    message: 'Logged out'
  })
})