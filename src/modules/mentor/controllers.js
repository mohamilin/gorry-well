const httpStatus = require('http-status');
const catchAsync = require('../../utils/catch-error');

const mentorServices = require('./services');
const pageMentor = catchAsync(async (req, res) => {
    const user = req.user;

    const mentor = await mentorServices.pageMentor({ user });
    return res.status(httpStatus.OK).json({
        success: true,
        data: mentor,
    });
});

module.exports = {
    pageMentor,
};
