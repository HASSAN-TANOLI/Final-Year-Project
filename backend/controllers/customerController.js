const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');

const catchAsyncErrors= require('../middlewares/catchAsyncErrors');

const sendToken = require('../utils/jwtToken');

const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');

//Register a new User => /api/v1/Registeruser

exports.registerUser = catchAsyncErrors (async (req, res, next) => {
 
  //Pulling name email and password from body

  const {name, email, password} = req.body;

  const user = await User.create ({
    name,
    email,
    password
    // avatar: {
    //   public_id: '',
    //   url: 'https://res.cloudinary.com/finalyearprojecttt/image/upload/v1634803436/young-man-avatar-character-260nw-661669825_vbgnae.webp '
    // }
  })

  sendToken(user, 200, res)
})

//Login User => api/v1/Loginuser

exports.loginUser = catchAsyncErrors (async (req, res, next) => {
  const {email, password } = req.body;

  //Check if email and password is entered by user

  if (!email || !password)
  {
    return next(new ErrorHandler ('Please enter email and password', 400))
  }

  // finding user in database 

  const user = await User.findOne({ email }).select('+password') // using select method because in user schema i use select false not showing password
  
  if (!user)
  {
    return next(new ErrorHandler ('Invalid Email or password', 401))
  }

  //Check if password is correct or not 

  const isPasswordMatched = await user.comparePassword(password)

  if(!isPasswordMatched)
  {
    return next(new ErrorHandler ('Invalid Email or password', 401))
  }
  sendToken(user, 200, res)

})



//forgot password => /api/v1/userpassword/forgot

exports.forgotPassword = catchAsyncErrors (async (req, res, next) => {
  
  const user = await User.findOne({email: req.body.email}); //finding the email in database the user provided

  if(!user)
  {
    return next(new ErrorHandler ('User NOT found with this email', 404))
  }

  //Get resetToken
   const resetToken = user.getResetPasswordToken();

   await user.save({validateBeforeSave: false})

   //Create resetpassword url

   const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/userpassword/reset/${resetToken}`;

   const message = `your password reset token is as follow: \n\n ${resetUrl}\n\n if you have not requested this email, then ignore it.`

   try {
     await sendEmail({
       email: user.email,
       subject: 'User Password recovery',
       message
     })

     res.status(200).json({
       success: true,
       message: `Email sent to: ${user.email}`
     })
   }

   catch (error)
   {
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;
   
     await user.save({validateBeforeSave: false})

     return next(new ErrorHandler(error.message, 500))
   
    }

})

//Reset password => /api/v1/userpassword/reset/:token

exports.resetPassword = catchAsyncErrors (async (req, res, next) => {
  
  //Getting token from url and hashing it so we can compare it with hashtoken save in database to see it correct or not..
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

  // now we have hash url token we can compare that with our database

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {$gt: Date.now()}

  })

  if(!user)
  {
    return next(new ErrorHandler ('password reset token is invalid and has been expired', 400))
  }

  //password and confirm password
  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler ('password does not match'), 400)
  }

  //if the password is same then setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken (user, 200, res)
})

exports.getUserProfile = catchAsyncErrors (async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  })

})


//Logout users => /api/v1/logoutuser

exports.logoutUser = catchAsyncErrors (async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
    
  })
 res.status(200).json({
   success: true,
   message: 'Logged out'
 })
})
