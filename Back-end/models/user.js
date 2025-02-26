const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    max: 255,
    default: null
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please enter Password'],
  },
  token: {
    type: String
  }
})

module.exports = mongoose.model('Users', userSchema);