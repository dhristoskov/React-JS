const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  }
})

module.exports = mongoose.model('user', userSchema)