const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
      },
    
      email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255
      },
    
      password: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 1024
      }

})

module.exports = mongoose.model('user', userSchema);