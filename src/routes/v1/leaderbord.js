const express = require('express');

const leaderboardControllers = require('../../modules/leaderbord/controllers');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/', auth(), leaderboardControllers.pageLeaderboard);

module.exports = router;
