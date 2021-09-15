const client = require('supertest')
const app = require('../../../server')
const mongoose = require('mongoose')
const db = require('../../database/db')
// READ - https://medium.com/@tehvicke/integration-and-unit-testing-with-jest-in-nodejs-and-mongoose-bd41c61c9fbc
// execution before the test suites
beforeAll(async () => {
    db.connect()
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