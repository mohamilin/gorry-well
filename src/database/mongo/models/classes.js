const mongoose = require('mongoose');

const classSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'name class required'],
        },
        mentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        mentee: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            },
        ],
        quiz: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'quizzes',
            },
        ],
    },
    { timestamps: true },
);

const Class = mongoose.model('classes', classSchema);

module.exports = Class;
