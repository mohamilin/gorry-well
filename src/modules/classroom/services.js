const Model = require('../../database/mongo/models');

const pageClassroom = async () => {
    return Model.Class.find().populate([
        {
            path: 'mentee',
            select: 'fullname',
        },
        {
            path: 'mentor',
            select: 'fullname',
        },
        {
            path: 'quiz',
            select: 'title question',
        },
    ]);
};
module.exports = {
    pageClassroom,
};
