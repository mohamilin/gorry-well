const Model = require('../../database/mongo/models');
const pageMentor = async ({ user }) => {
    return Model.Class.findOne({ mentor: user._id })
        .populate({ path: 'mentee', select: 'fullname' })
        .populate({ path: 'mentor', select: 'fullname' });
};

module.exports = {
    pageMentor,
};
