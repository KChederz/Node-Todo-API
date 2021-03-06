const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    completed_at: {
        type: Date,
        default: null
    },
    _creator: {
        type: mongoose.SchemaTypes.ObjectId,        
        required: true
    }
});

module.exports = Todo;