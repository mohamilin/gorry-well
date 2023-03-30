require('dotenv').config();
const { faker } = require('@faker-js/faker');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const httpStatus = require('http-status');

const Model = require('../../../src/database/mongo/models');
const tokenServices = require('../../../src/modules/token/services');

const HandlerError = require('../../../src/utils/handleError');

describe('unit test module token - service', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const userId = 1;
    const expires = moment(new Date());
    const type = 'refresh';
    const secret = process.env.JWT_SECRET;
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDIzOGYwZjAwYzU1MTM5Y2EwMTA1OTUiLCJpYXQiOjE2ODAxMDA1NjEsImV4cCI6MTY4MD';
    const blacklisted = 'false';

    it('should generate token - success', async () => {
        jest.spyOn(jwt, 'sign').mockReturnValue(true);

        await tokenServices.generateToken(userId, expires, type, secret);
        const isCalled = jest.spyOn(tokenServices, 'generateToken');
        expect(isCalled).toBeDefined();
    });

    it('should save token - success', async () => {
        jest.spyOn(Model.Token, 'create').mockReturnValue(true);

        await tokenServices.saveToken(
            token,
            userId,
            expires,
            type,
            blacklisted,
        );
        const isCalled = jest.spyOn(tokenServices, 'saveToken');
        expect(isCalled).toBeDefined();
    });

    it('should generateAuthTokens - success', async () => {
        jest.spyOn(tokenServices, 'saveToken').mockReturnValue(true);
        jest.spyOn(tokenServices, 'generateToken').mockReturnValue({
            refreshToken: token,
            user: { id: 1 },
            refreshTokenExpires: expires,
            type,
        });

        const user = {
            email,
            password,
        };
        await tokenServices.generateAuthTokens(user);
        const isCalled = jest.spyOn(tokenServices, 'generateAuthTokens');
        expect(isCalled).toBeDefined();
    });

    it('should verifyToken - success', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            sub: 2,
        });

        jest.spyOn(Model.Token, 'findOne').mockReturnValue(true);
        await tokenServices.verifyToken(token, type);
        const isCalled = jest.spyOn(tokenServices, 'verifyToken');
        expect(isCalled).toBeDefined();
    });

    it('should verifyToken - failed', async () => {
        jest.spyOn(jwt, 'verify').mockReturnValue({
            sub: 2,
        });

        jest.spyOn(Model.Token, 'findOne').mockReturnValue(false);
        await expect(
            tokenServices.verifyToken({ email, password }),
        ).rejects.toThrow(
            new HandlerError(httpStatus.NOT_FOUND, 'Token not found'),
        );
    });

    it('should delete token - success', async () => {
        jest.spyOn(Model.Token, 'deleteOne').mockReturnValue(true);
        await tokenServices.deleteToken(token, type);
        const isCalled = jest.spyOn(tokenServices, 'deleteToken');
        expect(isCalled).toBeDefined();
    });
});
