const mongoose = require('mongoose');
const logger = require('../../config/logger');

const connectionToMongo = () => {
    mongoose
        .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,

            useUnifiedTopology: true,
        })
        .then(() => {
            logger.info('Connected to MongoDB');
        })
        .catch((e) => {
            logger.error('unconnected to MongoDB', e);
        });
};

module.exports = connectionToMongo;
