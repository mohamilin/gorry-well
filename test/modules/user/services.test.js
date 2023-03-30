const { faker } = require('@faker-js/faker');
const httpStatus = require('http-status');

const Model = require('../../../src/database/mongo/models');
const userServices = require('../../../src/modules/user/services');
const HandlerError = require('../../../src/utils/handleError');

describe('unit test module auth - service', () => {
    const fullname = faker.name.fullName;
    const email = faker.internet.email();
    const password = faker.internet.password(20);

    it('should add user - failed', async () => {
        jest.spyOn(Model.User, 'isEmailTaken').mockReturnValue(true);

        await expect(
            userServices.addUser({ fullname, email, password }),
        ).rejects.toThrow(
            new HandlerError(httpStatus.BAD_REQUEST, 'Email already taken'),
        );
    });

    it('should add user - success', async () => {
        jest.spyOn(Model.User, 'isEmailTaken').mockReturnValue(false);
        jest.spyOn(Model.User, 'create').mockReturnValue(false);
        await userServices.addUser({ fullname, email, password });
        const isCalled = jest.spyOn(userServices, 'addUser');
        expect(isCalled).toBeDefined();
    });

    it('should get user by id - success', async () => {
        jest.spyOn(Model.User, 'findById').mockReturnValue(true);
        await userServices.getUserById(1);
        const isCalled = jest.spyOn(userServices, 'getUserById');
        expect(isCalled).toBeDefined();
    });

    it('should get user by email - success', async () => {
        jest.spyOn(Model.User, 'findOne').mockReturnValue(true);
        await userServices.getUserByEmail(email);
        const isCalled = jest.spyOn(userServices, 'getUserByEmail');
        expect(isCalled).toBeDefined();
    });
});
