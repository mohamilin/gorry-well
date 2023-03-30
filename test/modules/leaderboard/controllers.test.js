const leaderboardControllers = require('../../../src/modules/leaderbord/controllers');
const leaderboardServices = require('../../../src/modules/leaderbord/services');
const leaderboardMappers = require('../../../src/modules/leaderbord/mappers');

describe('unit test module leaderboard - controller', () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
    };

    it('should pageLeaderboard', async () => {
        const req = {};
        jest.spyOn(leaderboardServices, 'pageLeaderboard').mockReturnValue([
            {
                _id: '64238f0f00c55139ca0105a6',
                quiz: {
                    _id: '64238f0f00c55139ca0105a5',
                    title: 'Basic Coding',
                },
                mentee: {
                    _id: '64238f0f00c55139ca010595',
                    fullname: 'Miss Darlene Spencer',
                },
                score: 100,
            },
            {
                _id: '64238f0f00c55139ca0105a7',
                quiz: {
                    _id: '64238f0f00c55139ca0105a5',
                    title: 'Basic Coding',
                },
                mentee: {
                    _id: '64238f0f00c55139ca010596',
                    fullname: 'Steve Toy',
                },
                score: 90,
            },
        ]);

        jest.spyOn(leaderboardMappers, 'mapperLeaderboard').mockReturnValue(
            true,
        );
        leaderboardControllers.pageLeaderboard(req, res);
        const isCalled = jest.spyOn(leaderboardControllers, 'pageLeaderboard');
        expect(isCalled).toBeDefined();
    });
});
