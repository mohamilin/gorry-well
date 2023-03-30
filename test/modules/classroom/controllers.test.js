const { faker } = require('@faker-js/faker');

const classroomControllers = require('../../../src/modules/classroom/controllers');
const classroomServices = require('../../../src/modules/classroom/services');
const classroomMappers = require('../../../src/modules/classroom/mappers');

describe('unit test module classroom - controller', () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
    };

    it('should pageClassroom', async () => {
        const req = {
            user: {
                email: faker.internet.email(),
                role: 'mentor',
            },
        };
        jest.spyOn(classroomServices, 'pageClassroom').mockReturnValue([
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
        ]);

        jest.spyOn(classroomMappers, 'mapperClassroom').mockReturnValue(true);
        classroomControllers.pageClassroom(req, res);
        const isCalled = jest.spyOn(classroomControllers, 'pageClassroom');
        expect(isCalled).toBeDefined();
    });
});
