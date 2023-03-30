const mapperLeaderboard = ({ leaderboard }) => {
    let result = [];

    for (const item of leaderboard) {
        let container = {};

        container.quiz = item.quiz.title;
        container.mentee = item.mentee.fullname;
        container.score = item.score;

        result.push(container);
    }

    return result;
};

module.exports = {
    mapperLeaderboard,
};
