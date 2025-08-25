const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    answerText: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Answer', answerSchema);
