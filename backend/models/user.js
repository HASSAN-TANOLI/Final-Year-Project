const mongoose = require('mongoose')
const validator = require('validator')

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
    select: flase
  },
  avatar:{
    public_id: {
     type: String,
     required: true
    },

    url: {
      type: String,
      required: true
    }
  },

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

module.exports = mongoose.model('User', userSchema);