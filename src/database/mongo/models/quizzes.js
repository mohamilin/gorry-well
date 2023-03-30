const mongoose = require('mongoose');

const quizSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: [true, 'question  required'],
        },
        question: {
            type: String,
            require: [true, 'question  required'],
        },
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'classes',
            require: [true, 'class id  required'],
        },
    },
    { timestamps: true },
);

const Quiz = mongoose.model('quizzes', quizSchema);

module.exports = Quiz;
