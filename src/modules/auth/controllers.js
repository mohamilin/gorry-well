const httpStatus = require('http-status');
const catchAsync = require('../../utils/catch-error');

const userServices = require('../user/services');
const tokenServices = require('../token/services');
const authServices = require('./services');

const register = catchAsync(async (req, res) => {
    const { fullname, email, password, role } = req.body;
    const user = await userServices.addUser({
        fullname,
        email,
        password,
        role,
    });
    const token = await tokenServices.generateAuthTokens(user);
    return res.status(httpStatus.CREATED).json({
        success: true,
        data: {
            user,
            token,
        },
    });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.login({ email, password });
    const token = await tokenServices.generateAuthTokens(user);

    return res.status(httpStatus.OK).json({
        success: true,
        data: {
            user,
            token,
        },
    });
});

const logout = catchAsync(async (req, res) => {
    await authServices.logout({ token: req.body.refreshToken });
    res.status(httpStatus.NO_CONTENT).json({
        succcess: true,
        message: 'Success logout',
    });
});

module.exports = {
    register,
    login,
    logout,
};
