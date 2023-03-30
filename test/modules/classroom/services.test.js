const Model = require('../../../src/database/mongo/models');
const classroomServices = require('../../../src/modules/classroom/services');

describe('Unit test module classroom - services', () => {
    it('should page classroom', async () => {
        Model.Class.find = jest.fn().mockImplementation(() => ({
            populate: () => ({
                lean: jest.fn().mockReturnValue([
                    {
                        _id: '64238f0f00c55139ca0105a4',
                        name: 'Basic Coding',
                        mentor: {
                            _id: '64238f0f00c55139ca010594',
                            fullname: 'Ms. Marcus Torp',
                        },
                        mentee: [],
                        quiz: [],
                    },
                ]),
            }),
        }));

        const classs = await classroomServices.pageClassroom();
        expect(classs).toBeDefined();
    });
});
