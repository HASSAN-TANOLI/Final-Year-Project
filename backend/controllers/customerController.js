const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');

const catchAsyncErrors= require('../middlewares/catchAsyncErrors');

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

  const token = user.getjwtToken();

  // sending response back 201 created
  res.status(201).json({
    success: true,
    token
  })

})

//Login User => api/v1/Login

exports.loginUser = catchAsyncErrors (async (req, res, next) => {
  const {email, password } = req.body;

  //Check if email and password is entered by user

  if (!email || !password)
  {
    return next(new Errorhandler ('Please enter email and password', 400))
  }

  // finding user in database 

  const user = await User.findOne({ email }).select('+password') // using select method because in user schema i use select false not showing password
  
  if (!user)
  {
    return next(new Errorhandler ('Invalid Email or password', 401))
  }

  //Check if password is correct or not 

  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched)
  {
    return next(new Errorhandler ('Invalid Email or password', 401))
  }

  const token = user.getjwtToken();

  res.status(200).json({

    success: true,
    token
  })

})