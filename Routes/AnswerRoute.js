const express = require('express');
const { submitAnswer, getUserAnswers } = require('../Controller/AnswerController');
const router = express.Router();

router.post('/', submitAnswer);
router.get('/:userId', getUserAnswers);

module.exports = router;
