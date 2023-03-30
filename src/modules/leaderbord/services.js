const Model = require('../../database/mongo/models');
const pageLeaderboard = async () => {
    return Model.QuizResult.find()
        .lean()
        .populate([
            {
                path: 'mentee',
                select: 'fullname',
            },
            {
                path: 'quiz',
                select: 'title',
            },
        ]);
};

module.exports = {
    pageLeaderboard,
};
