/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const mongose = require('mongoose');

const logger = require('../config/logger');
const HandlerError = require('../utils/handleError');

const errorConverter = (err, req, res, next) => {
    let error = err;
    // console.log(err);
    if (!(error instanceof HandlerError)) {
        const success = false;
        const statusCode =
            error.statusCode || error instanceof mongose.Error
                ? httpStatus.BAD_REQUEST
                : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = {
            success,
            statusCode,
            message,
        };
    } else {
        const success = false;
        const statusCode = err.statusCode;
        const message = err.message || httpStatus[statusCode];

        error = {
            statusCode,
            message,
            success,
        };
    }

    if (process.env.NODE_ENV === 'development') {
        logger.error(error);
    }

    return res.status(error.statusCode).json(error);
};

module.exports = {
    errorConverter,
};
