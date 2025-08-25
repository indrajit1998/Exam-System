const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Question Schema
const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [String],       // Optional: for multiple choice
    correctAnswer: String,   // Optional: for MCQs
});

const Question = mongoose.model('Question', questionSchema);

// Routes

// GET all questions
app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new question
app.post('/api/questions', async (req, res) => {
    const { questionText, options, correctAnswer } = req.body;
    const question = new Question({ questionText, options, correctAnswer });
    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
