const { faker } = require('@faker-js/faker');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');

const Model = require('../../../src/database/mongo/models');

const authServices = require('../../../src/modules/auth/services');
const userServices = require('../../../src/modules/user/services');
const HandlerError = require('../../../src/utils/handleError');

describe('unit test module auth - service', () => {
    const email = faker.internet.email();
    const password = faker.internet.password(20);

    it('should login - failed / false email', async () => {
        jest.spyOn(userServices, 'getUserByEmail').mockReturnValue(false);

        await expect(authServices.login({ email, password })).rejects.toThrow(
            new HandlerError(
                httpStatus.UNAUTHORIZED,
                'Periksa kembali email atau password anda !',
            ),
        );
    });

    it('should login - failed / false password', async () => {
        jest.spyOn(userServices, 'getUserByEmail').mockReturnValue({
            email,
            password,
        });

        await expect(authServices.login({ email, password })).rejects.toThrow(
            new HandlerError(
                httpStatus.UNAUTHORIZED,
                'Periksa kembali email atau password anda !',
            ),
        );
    });

    it('should login - success', async () => {
        jest.spyOn(userServices, 'getUserByEmail').mockReturnValue({
            email,
            password,
        });

        await jest.spyOn(bcrypt, 'compare').mockReturnValue(true);

        const user = await authServices.login({ email, password });
        expect(user).toBeDefined();
    });

    it('should logout - failed', async () => {
        jest.spyOn(Model.Token, 'findOne').mockReturnValue(false);

        jest.spyOn(Model.Token, 'deleteOne').mockReturnValue();
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDIzOGYwZjAwYzU1MTM5Y2EwMTA1OTUiLCJpYXQiOjE2ODAxMjg1NDAsImV4cCI6MTY4MDMwMTM0MCwidHlwZSI6InJlZnJlc2gifQ.BYeqBSeUGC8V-TbXvMypES1uU-S1rg2UXwkkripv3nQ';

        await expect(authServices.logout({ token })).rejects.toThrow(
            new HandlerError(httpStatus.NOT_FOUND, 'Not found'),
        );
    });

    it('should logout - success', async () => {
        jest.spyOn(Model.Token, 'findOne').mockReturnValue({
            _id: '6424ba1c8e81d63f3c66f512',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDIzOGYwZjAwYzU1MTM5Y2EwMTA1OTUiLCJpYXQiOjE2ODAxMjg1NDAsImV4cCI6MTY4MDMwMTM0MCwidHlwZSI6InJlZnJlc2gifQ.BYeqBSeUGC8V-TbXvMypES1uU-S1rg2UXwkkripv3nQ',
            user: '64238f0f00c55139ca010595',
            type: 'refresh',
            expires: '2023-03-31T22:22:20.382Z',
            blacklisted: false,
            createdAt: '2023-03-31T22:22:20.382Z',
            updatedAt: '2023-03-31T22:22:20.382Z',
        });

        jest.spyOn(Model.Token, 'deleteOne').mockReturnValue();
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDIzOGYwZjAwYzU1MTM5Y2EwMTA1OTUiLCJpYXQiOjE2ODAxMjg1NDAsImV4cCI6MTY4MDMwMTM0MCwidHlwZSI6InJlZnJlc2gifQ.BYeqBSeUGC8V-TbXvMypES1uU-S1rg2UXwkkripv3nQ';

        await authServices.logout({ token });
        const logout = jest.spyOn(authServices, 'logout').mockReturnValue(true);
        expect(logout).toBeDefined();
    });
});
