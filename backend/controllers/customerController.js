const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');

const catchAsyncErrors= require('../middlewares/catchAsyncErrors');

const sendToken = require('../utils/jwtToken');

//Register a new User => /api/v1/Register

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

//Login User => api/v1/Login

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