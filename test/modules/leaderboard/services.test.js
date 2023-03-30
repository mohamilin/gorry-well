const Model = require('../../../src/database/mongo/models');
const leaderboardServices = require('../../../src/modules/leaderbord/services');

describe('Unit test module leaderboard - services', () => {
    it('should page leaderboard', async () => {
        Model.QuizResult.find = jest.fn().mockImplementation(() => ({
            lean: () => ({
                populate: jest.fn().mockReturnValue([
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
                ]),
            }),
        }));

        const leaderboard = await leaderboardServices.pageLeaderboard();
        expect(leaderboard).toBeDefined();
    });
});
