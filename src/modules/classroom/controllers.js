const httpStatus = require('http-status');
const catchAsync = require('../../utils/catch-error');

const classroomServices = require('./services');
const classroomMapper = require('./mappers');

const pageClassroom = catchAsync(async (req, res) => {
    const user = req.user;
    const classroom = await classroomServices.pageClassroom({ user });
    const mapper = classroomMapper.mapperClassroom({
        user,
        classroom,
    });

    return res.status(httpStatus.OK).json({
        success: true,
        data: mapper,
    });
});

module.exports = {
    pageClassroom,
};
