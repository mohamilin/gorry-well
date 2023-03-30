const express = require('express');

const classroomControllers = require('../../modules/classroom/controllers');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/', auth('getClassroom'), classroomControllers.pageClassroom);

module.exports = router;
