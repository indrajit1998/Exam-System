const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error(err));

// Routes
const authRoutes = require('./Routes/AuthRoutes');
const examRoutes = require('./Routes/ExamRoutes');
const answerRoutes = require('./Routes/AnswerRoute');

app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/answers', answerRoutes);

// Health
app.get('/', (req, res) => res.send("🚀 Exam API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡ Server running on port ${PORT}`));
