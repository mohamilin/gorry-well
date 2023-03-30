const leaderboardMappers = require('../../../src/modules/leaderbord/mappers');

describe('Unit test module leaderboard - mapper', () => {
    it('should mapper leaderboard', () => {
        const leaderboard = [
            {
                quiz: { title: 'title' },
                mentee: { fullname: 'fullname' },
                score: 100,
            },
        ];
        const mapper = leaderboardMappers.mapperLeaderboard({ leaderboard });
        expect(mapper).toBeDefined();
    });
});
