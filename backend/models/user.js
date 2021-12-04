const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Your name cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address']
  },

  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'your password must be longer than 6 character'],
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
    default: 'customer'
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date

})



//Encrypting password before saving
userSchema.pre('save', async function (next) {
   if(!this.isModified ('password')){   //if the password is not Modified we dont have to assign a token
     next()
   }

   this.password = await bcrypt.hash(this.password, 10) //10 is the length of this hash which will encrypt pass
})

//Compare user password

userSchema.methods.comparePassword = async function (enteredPassword)
{
  return await bcrypt.compare(enteredPassword, this.password)
} 

//Return JWT token 
userSchema.methods.getJwtToken = function () 
{
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET, { // passing id as payload to token
      expiresIn: process.env.JWT_EXPIRES_TIME
  });
}

//Genrate password return token

userSchema.methods.getResetPasswordToken = function () {
  
  //Generate Token
  //Randombytes use to generate randombyte

  const resetToken = crypto.randomBytes(20).toString('hex');

  //crypto.createhash use to create hashobject which use encryption algorithm and digest is use for encoding.
  //Hash and set to reset password token
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  //set token expire time

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000


  //Sending token as it is in url only the hash version is store in database and then we encrypt resetToken and match it with hash version if its same we will allow user to change password.
  return resetToken
}

module.exports = mongoose.model('User', userSchema);