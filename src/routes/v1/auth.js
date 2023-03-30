const express = require('express');
const authControllers = require('../../modules/auth/controllers');

const validate = require('../../validations/validate');
const authValidation = require('../../validations/auth');

const router = express.Router();

router.post(
    '/register',
    validate(authValidation.register),
    authControllers.register,
);
router.post('/login', validate(authValidation.login), authControllers.login);
router.post('/logout', authControllers.logout);

module.exports = router;
