//Create and send Token and save it in the cookie

const sendToken = (vendor, statusCode, res) => {

  //Create Jwt Token token
  const token = vendor.getJwtTokenVendor();

  //options for cookie

  const options = {
    expires: new Date (
      Date.now() + process.env.COOKIE_EXPIRES_TIMES * 24 * 60 * 1000
    ),
    httpOnly: true
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    vendor
  })
}

module.exports = sendToken;