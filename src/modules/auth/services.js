require('dotenv').config();
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const Model = require('../../database/mongo/models');

const HandlerError = require('../../utils/handleError');
const userServices = require('../user/services');

const login = async ({ email, password }) => {
    const user = await userServices.getUserByEmail(email);
    if (!user) {
        throw new HandlerError(
            httpStatus.UNAUTHORIZED,
            'Periksa kembali email atau password anda !',
        );
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        throw new HandlerError(
            httpStatus.UNAUTHORIZED,
            'Periksa kembali email atau password anda !',
        );
    }
    return user;
};

const logout = async ({ token }) => {
    const refreshTokenDoc = await Model.Token.findOne({
        token,
        type: process.env.TOKEN_TYPE_REFRESH,
        blacklisted: false,
    });
    if (!refreshTokenDoc) {
        throw new HandlerError(httpStatus.NOT_FOUND, 'Not found');
    }

    await Model.Token.deleteOne({ token: refreshTokenDoc.token });
};

module.exports = {
    login,
    logout,
};
