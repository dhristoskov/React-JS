const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 255
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 8,
        maxlength: 255
    },

    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6,
        maxlength: 255
    }
});

module.exports = mongoose.model('User', userSchema);
