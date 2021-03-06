const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    description:{
        type: String,
        required: true
    },
    notice:{
        type: String
    },
    priority: {
        type: String,
        default: 'Normal'
    },
    isItDone:{
        type: Boolean,
        default: false
    } 
});

module.exports = mongoose.model('task', taskSchema);