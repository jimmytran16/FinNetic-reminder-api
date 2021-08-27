'use strict'
if (process.env.NODE_ENV != 'production') require('dotenv').config();
const Queue = require('../models/queue')
const TwilioService = require('../services/twilioService')

// Twilio Service 
module.exports = class SchedulerService {

    constructor() {
        this.twilioService = new TwilioService();
    }
    // function to save the queue
    async saveToQueue(payload, cb) {
        try {
            var queue = new Queue(payload)
            let result = await queue.save();
            return cb(null, result);
        } catch (err) {
            console.log(err)
            return cb(err, null);
        }
    }

    attemptToSendReminder(cb) {
        // let queues = Queue.find({})
        this.twilioService.sendReminder((result) => {
            return cb(result)
        })
    }
}

