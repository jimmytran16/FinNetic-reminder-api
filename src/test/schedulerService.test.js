const Queue = require('../models/queue')
const Database = require('../database/db')
const mongoose = require('mongoose');
const SchedulerService = require('../services/schedulerService')
const schedulerService = new SchedulerService();
require('dotenv').config()

const mockUserId = '6136d8b11da3c4284ac18001'

async function setup() {
    // mock payloads to add to the queue to test
    const mockPayloads = [
        {
            accountName: 'Test Account 2',
            accountId: mongoose.Types.ObjectId('613fa1cf8c37190b09d18093'),
            userId: mockUserId,
            scheduledToSend: 5,
            sendReminder: false,
            phone: '7817817817'
        }
    ]
    // ADD mock accounts to queue
    schedulerService.saveToQueue(mockPayloads[0], (err, result) => { });
}

describe('Schedule Service test', () => {

    beforeAll(async () => {
        console.log('Before all')
        // connect to db
        Database.connect();
        setup();
    })

    afterAll(async () => {
        console.log("AFTER ALL")
        // DELETE mock accounts
        await Queue.deleteMany({ phone: '7817817817' });
        Database.disconnect();
    })

    test('Scheduler service - test for existing MOCK queues - Make sure there are 3 accounts associated with the specfic userId', async () => {
        schedulerService.getUserAccountsInQueue(mockUserId, (err, result) => {
            expect(result.length).toBe(1);
        })
    })
})
