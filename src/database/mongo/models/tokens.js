const mongoose = require('mongoose');
const constants = require('../../../utils/shared/constants');

const tokens = [
    constants.TOKEN_TYPE_ACCESS,
    constants.TOKEN_TYPE_REFRESH,
    constants.TOKEN_TYPE_RESET_PASSWORD,
    constants.TOKEN_TYPE_VERIFY_EMAIL,
];

const tokenSchema = mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            index: true,
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'users',
            required: true,
        },
        type: {
            type: String,
            enum: tokens,
            required: true,
        },
        expires: {
            type: Date,
            required: true,
        },
        blacklisted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const Token = mongoose.model('tokens', tokenSchema);

module.exports = Token;
