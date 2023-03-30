const mongoose = require('mongoose');

const quizResultSchema = mongoose.Schema(
    {
        quiz: {
            type: mongoose.Types.ObjectId,
            ref: 'quizzes',
        },
        mentee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        score: {
            type: mongoose.Types.Decimal128,
        },
    },
    { timestamps: true },
);

const QuizResult = mongoose.model('quiz_results', quizResultSchema);

module.exports = QuizResult;
