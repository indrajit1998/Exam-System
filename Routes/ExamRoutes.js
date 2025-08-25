const express = require('express');
const { getExams, addExam } = require('../Controller/ExamController');
const router = express.Router();

router.get('/', getExams);
router.post('/', addExam); // only admin should use this

module.exports = router;
