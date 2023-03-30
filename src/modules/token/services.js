const moment = require('moment');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const Model = require('../../database/mongo/models');
const handleError = require('../../utils/handleError');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */

const generateToken = (
    userId,
    expires,
    type,
    secret = process.env.JWT_SECRET,
) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };

    return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */

const saveToken = async (
    token,
    userId,
    expires,
    type,
    blacklisted = 'false',
) => {
    const tokenDoc = await Model.Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    });
    return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const tokenDoc = await Model.Token.findOne({
        where: {
            token,
            type,
            user: payload.sub,
        },
    });
    if (!tokenDoc) {
        throw new handleError(httpStatus.NOT_FOUND, 'Token not found');
    }

    return tokenDoc;
};

const deleteToken = async (token, type) => {
    return Model.Token.deleteOne({
        where: {
            token,
            type,
        },
    });
};
/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */

const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(
        process.env.JWT_ACCESS_EXPIRATION_MINUTES,
        'minutes',
    );
    const accessToken = generateToken(
        user?.id,
        accessTokenExpires,
        process.env.TOKEN_TYPE_ACCESS,
    );

    const refreshTokenExpires = moment().add(
        process.env.JWT_REFRESH_EXPIRATION_DAYS,
        'days',
    );
    const refreshToken = generateToken(
        user.id,
        refreshTokenExpires,
        process.env.TOKEN_TYPE_REFRESH,
    );
    await saveToken(
        refreshToken,
        user.id,
        refreshTokenExpires,
        process.env.TOKEN_TYPE_REFRESH,
    );

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};

module.exports = {
    generateToken,
    saveToken,
    generateAuthTokens,
    verifyToken,
    deleteToken,
};
