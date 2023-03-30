const express = require('express');

const mentorControllers = require('../../modules/mentor/controllers');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/', auth('manageMentee'), mentorControllers.pageMentor);

module.exports = router;
