const Answer = require('../Model/Answer');

// Submit Answer
exports.submitAnswer = async (req, res) => {
    try {
        const { userId, examId, answerText } = req.body;

        const answer = new Answer({
            user: userId,
            exam: examId,
            answerText
        });

        await answer.save();
        res.status(201).json({ message: 'Answer submitted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get answers of a user
exports.getUserAnswers = async (req, res) => {
    try {
        const { userId } = req.params;
        const answers = await Answer.find({ user: userId }).populate('exam');
        res.json(answers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
