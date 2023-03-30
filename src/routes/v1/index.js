const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const authRoutes = require('./auth');
const mentorRoutes = require('./mentor');
const classroomRoutes = require('./classrom');
const leaderboardRoutes = require('./leaderbord');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/mentors', mentorRoutes);
router.use('/classrooms', classroomRoutes);
router.use('/leaderboards', leaderboardRoutes);

module.exports = router;
