const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
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

module.exports = mongoose.model('Answer', answerSchema);