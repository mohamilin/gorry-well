const catchAsync = require('../../src/utils/catch-error');

describe('Test Promise resolve', () => {
    test('should call next with error when rejected', async () => {
        const req = {};
        const res = {};
        const next = jest.fn();

        // Mock the function to be resolved with a rejected promise

        const rejectedFn = jest.fn(() =>
            Promise.reject(new Error('Test Error')),
        );

        // Call the function being tested and await the result
        await catchAsync(rejectedFn)(req, res, next);

        // Assert that next was called with the error message
        expect(next).toHaveBeenCalledWith(new Error('Test Error'));
    });
});
