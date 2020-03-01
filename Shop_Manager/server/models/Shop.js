const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  nameOfObject: {
    type: String,
    required: true,
    minlength: 4
  },
  location: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('shop', shopSchema);