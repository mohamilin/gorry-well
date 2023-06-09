require('dotenv').config();

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const Model = require('../database/mongo/models');

const jwtOptions = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
    try {
        if (payload.type !== process.env.TOKEN_TYPE_ACCESS) {
            throw new Error('Invalid token type');
        }
        const user = await Model.User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy,
};
