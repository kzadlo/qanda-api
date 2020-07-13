const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model('Question', questionSchema);