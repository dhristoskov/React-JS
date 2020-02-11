const mongoose = require('mongoose')

const guestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  first_name: {
    type: String,
    required: true,
    min: 4
  },
  lasts_name: {
    type: String,
    required: true,
    min: 4
  },
  phone: {
    type: String,
    required: true,
    min: 6
  },
  email: {
    type: String,
    unique: true,
    required: true,
    min: 8
  },
  diet: {
    type: String,
    default: 'WithoutRestriction'
  },
  isconfirmed: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('guest', guestSchema)