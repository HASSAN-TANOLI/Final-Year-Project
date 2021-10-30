const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const vendorSchema = new mongoose.Schema({

  vendorname: {
    type: String,
    required: [true, 'please enter your name'],
    maxLength: [30, 'your name cannot exceed 30 characters']

  },

  shopname: {
    type: String,
    required: [true, 'Please enter your shopname'],
    maxLength: [50, 'your shopname cannot exceed 50 characters']
  },

  shopaddress: {
    type: String,
    required: [true, 'please enter your shop address'],
    maxLength: [80, 'your shop address cannot exceed 80 characters']
  },

  vendorcontactno: {
    type: Number,
    required: [true, 'Please enter your contact number'],
    maxLength: [11, 'your contact number cannot exceed 11 characters']
  },

  shopcontactno: {
    type: Number,
    required: [true, 'Please enter your shop contact number'],
    maxLength: [11, 'your shop contact number cannot exceed 11 characters']
  },

  vendoremail: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address']
  },

  password: {
    type: String,
    required: [true, 'please enter your password'],
    minLength: [6, 'your password should be greater than 6 characters'],
    select: false
  },

  // avatar:{
  //   public_id: {
  //    type: String,
  //    required: true
  //   },

  //   url: {
  //     type: String,
  //     required: true
  //   }
  // },

  role: {
    type: String,
    default: 'vendor'
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date


})

//Encrypting password before saving

vendorSchema.pre('save', async function (next) {
  if(!this.isModified('password')) 
  {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
  
})

//Compare vendor password

vendorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Return jwt token

vendorSchema.methods.getJwtToken = function () 
{
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME
  });
}

//Genrate password reset token for vendor 

vendorSchema.methods.getResetPasswordToken = function () {

  //Generating the token

  const resetToken = crypto.randomBytes(20).toString('hex');

  //Hash the token and set in to resetPasswordToken

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  //Set token expire time

  this.resetPasswordExpire = Date.now() + 30 *60 * 1000

  return resetToken

}

module.exports = mongoose.model('Vendor', vendorSchema);