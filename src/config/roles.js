const constant = require('../utils/shared/constants');

const allRoles = {
    user: [],
    mentee: constant.LIST_ROLE_MENTEE,
    mentor: constant.LIST_ROLE_MENTOR,
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights,
};
