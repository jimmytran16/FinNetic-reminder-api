const client = require('supertest')
const app = require('../../../server')
const mongoose = require('mongoose')
// READ - https://medium.com/@tehvicke/integration-and-unit-testing-with-jest-in-nodejs-and-mongoose-bd41c61c9fbc
// execution before the test suites
beforeAll(async () => {
    await mongoose.connect('mongodb+srv://trackeruser:l74Nsz7hmql4brOK@cluster0.jlrtu.mongodb.net/Reminder_Job?retryWrites=true&w=majority', { useNewUrlParser: true });
});

// execution after the test suites
afterAll(async () => {
    mongoose.disconnect();
});

describe('Testing endpoints', () => {
    test('Test main endpoint', async (done) => {
        let response = await client(app)
            .get('/')

        expect(response.text.message).toBe('Welcome to the Reminder API')
        done()
    })
})