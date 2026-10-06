const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    category: { type: String, default: 'General Knowledge' }
});

module.exports = mongoose.model('Question', QuestionSchema);