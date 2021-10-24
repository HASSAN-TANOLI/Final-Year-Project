const Vendor = require('../models/vendor');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


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

  const token = vendor.getJwtToken();

  res.status(201).json({
    success: true,
    token
  })

})

//Login Vendor => /api/v1/loginvendor

exports.loginVendor = catchAsyncErrors (async (req, res, next) => {
  const {email, password } = req.body;

  //Check if email and password is entered by user

  if (!email || !password)
  {
    return next(new ErrorHandler ('Please enter email and password', 400))
  }

  // If upper condition matches then it will find that user in database

  const vendor = await Vendor.findOne({email}).select('+password')

  if(!vendor)
  {
    return next(new ErrorHandler ('Invalid email or password', 401));

  }

  // Check if password is correct or not
  const isPasswordMatched = await vendor.comparePassword(password);

  if(!isPasswordMatched)
  {
    return next(new ErrorHandler ('Invalid email or password', 401));
  }

  const token = vendor.getJwtToken();

  res.status(200).json({
    success: true,
    token
  })
})

