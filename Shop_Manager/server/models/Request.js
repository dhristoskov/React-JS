const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
  },
  shopName: {
    type: String,
    required: true
  },
  isItConfirmed: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('request', requestSchema)