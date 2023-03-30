const httpStatus = require('http-status');
const catchAsync = require('../../utils/catch-error');

const leaderbordServices = require('./services');
const leaderbordMappers = require('./mappers');

const pageLeaderboard = catchAsync(async (req, res) => {
    const leaderboard = await leaderbordServices.pageLeaderboard();
    // console.log(leaderboard);
    const mapperLeaderboard = leaderbordMappers.mapperLeaderboard({
        leaderboard,
    });

    return res.status(httpStatus.OK).json({
        success: true,
        data: mapperLeaderboard,
    });
});

module.exports = {
    pageLeaderboard,
};
