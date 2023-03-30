const httpStatus = require('http-status');
const Model = require('../../database/mongo/models');
const HandlerError = require('../../utils/handleError');

const addUser = async ({ fullname, email, password, role = 'user' }) => {
    if (await Model.User.isEmailTaken(email)) {
        throw new HandlerError(httpStatus.BAD_REQUEST, 'Email already taken');
    }

    return Model.User.create({ fullname, email, password, role });
};

const getUserById = async (id) => {
    return Model.User.findById(id);
};

const getUserByEmail = async (email) => {
    return Model.User.findOne({ email });
};

module.exports = {
    addUser,
    getUserById,
    getUserByEmail,
};
