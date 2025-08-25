const Exam = require('../Model/Exam');

// Get all exam questions
exports.getExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.json(exams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add exam question (Admin)
exports.addExam = async (req, res) => {
    try {
        const { title, description } = req.body;
        const exam = new Exam({ title, description });
        await exam.save();
        res.status(201).json({ message: 'Exam question added', exam });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
