const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const httpStatus = require('http-status');
const cors = require('cors');

const morgan = require('./src/config/morgan');
const indexRouter = require('./src/routes');

const { errorConverter } = require('./src/middleware/errors');
const { jwtStrategy } = require('./src/config/passport');
const connectionToMongo = require('./src/database/mongo/connection');

const app = express();
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.options('*', cors());

/**
 * connection to database
 */

connectionToMongo();

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
    res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Path not found',
    });
});

// error handler
app.use(errorConverter);

module.exports = app;
