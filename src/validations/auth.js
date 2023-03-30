const Joi = require('joi');

const register = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        fullname: Joi.string().required(),
        role: Joi.string().valid('mentor', 'mentee', 'user').default('user'),
    }),
};

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

module.exports = {
    register,
    login,
};
