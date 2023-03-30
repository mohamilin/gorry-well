const express = require('express');
const authControllers = require('../../modules/auth/controllers');

const router = express.Router();

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);
router.post('/logout', authControllers.logout);

module.exports = router;
