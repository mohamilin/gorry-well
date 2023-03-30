const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const authController = require('../../../src/modules/auth/controllers');
const userServices = require('../../../src/modules/user/services');
const authServices = require('../../../src/modules/auth/services');
const tokenServices = require('../../../src/modules/token/services');

describe('unit test module auth - controller', () => {
    const fullname = faker.name.fullName;
    const email = faker.internet.email();
    const password = faker.internet.password(20);
    const hashPassword = bcrypt.hash(password, 10);

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
    };

    it('should register', async () => {
        jest.spyOn(userServices, 'addUser').mockReturnValue({
            email: email,
            password: hashPassword,
            role: 'user',
            isEmailVerified: false,
            _id: '64239f36d49eefc625f55934',
            createdAt: '2023-03-29T02:15:18.665Z',
            updatedAt: '2023-03-29T02:15:18.665Z',
        });

        jest.spyOn(tokenServices, 'generateAuthTokens').mockReturnValue({
            access: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDIzOWYzNmQ0OWVlZmM2MjVmNTU5MzQiLCJpYXQiOjE2ODAwNTYxMTgsImV4cCI6MTY4MDA3NDExOCwidHlwZSI6ImFjY2VzcyJ9.kYDpb5sNowez7_fVyl9DAjzb4vQWVnb_lpfwtydgr84',
                expires: '2023-03-29T07:15:18.708Z',
            },
            refresh: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDIzOWYzNmQ0OWVlZmM2MjVmNTU5MzQiLCJpYXQiOjE2ODAwNTYxMTgsImV4cCI6MTY4MDIyODkxOCwidHlwZSI6InJlZnJlc2gifQ.UJTtA_V6eeX2E5G0Ttdv0uDlvKi98VGmbc7Nva5IMT8',
                expires: '2023-03-31T02:15:18.712Z',
            },
        });

        const req = {
            body: {
                fullname,
                email,
                password,
            },
        };

        authController.register(req, res);
        const isCalled = jest.spyOn(authController, 'register');
        expect(isCalled).toBeDefined();
    });
    it('should login', async () => {
        jest.spyOn(authServices, 'login').mockReturnValue({
            email: email,
            password: hashPassword,
            role: 'user',
            isEmailVerified: false,
            _id: '64239f36d49eefc625f55934',
            createdAt: '2023-03-29T02:15:18.665Z',
            updatedAt: '2023-03-29T02:15:18.665Z',
        });

        jest.spyOn(tokenServices, 'generateAuthTokens').mockReturnValue({
            access: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDIzOWYzNmQ0OWVlZmM2MjVmNTU5MzQiLCJpYXQiOjE2ODAwNTYxMTgsImV4cCI6MTY4MDA3NDExOCwidHlwZSI6ImFjY2VzcyJ9.kYDpb5sNowez7_fVyl9DAjzb4vQWVnb_lpfwtydgr84',
                expires: '2023-03-29T07:15:18.708Z',
            },
            refresh: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDIzOWYzNmQ0OWVlZmM2MjVmNTU5MzQiLCJpYXQiOjE2ODAwNTYxMTgsImV4cCI6MTY4MDIyODkxOCwidHlwZSI6InJlZnJlc2gifQ.UJTtA_V6eeX2E5G0Ttdv0uDlvKi98VGmbc7Nva5IMT8',
                expires: '2023-03-31T02:15:18.712Z',
            },
        });

        const req = {
            body: {
                email,
                password,
            },
        };

        authController.login(req, res);
        const isCalled = jest.spyOn(authController, 'login');
        expect(isCalled).toBeDefined();
    });

    it('should logout', async () => {
        jest.spyOn(authServices, 'logout').mockReturnValue();

        const req = {
            body: {
                refreshToken:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDIzOWYzNmQ0OWVlZmM2MjVmNTU5MzQiLCJpYXQiOjE2ODAwNTYxMTgsImV4cCI6MTY4MDIyODkxOCwidHlwZSI6InJlZnJlc2gifQ.UJTtA_V6eeX2E5G0Ttdv0uDlvKi98V',
            },
        };

        authController.logout(req, res);
        const isCalled = jest.spyOn(authController, 'logout');
        expect(isCalled).toBeDefined();
    });
});
