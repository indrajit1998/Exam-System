const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true }, // The actual question
  type: { type: String, default: "long-answer" }, // MCQ, short, long, etc.
});

module.exports = mongoose.model("Question", QuestionSchema);
