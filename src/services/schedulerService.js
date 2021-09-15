'use strict'
if (process.env.NODE_ENV != 'production') require('dotenv').config();
const Queue = require('../models/queue')
const TwilioService = require('../services/twilioService')
const mongoose = require('mongoose');

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

    async getUserAccountsInQueue(userId, cb) {
        try {
            let result = await Queue.find({ userId: mongoose.Types.ObjectId(userId) }).exec();
            return cb(null, result);
        } catch (err) {
            console.log(err)
            return cb(err, null);
        }
    }

    // function to update the boolean sendReminder, if user wants to change it
    async updateSendReminderOption(userId, accountId, sendReminder, cb) {
        try {
            let result = await Queue.findOneAndUpdate({ userId: mongoose.Types.ObjectId(userId), accountId: mongoose.Types.ObjectId(accountId) }, 
                                         { $set: { sendReminder: sendReminder } });
            if (result === null) {
                return cb('Result is null therefore update is not proper', null);
            }
            return cb(null, result);
        } catch (err) {
            console.log(err)
            return cb(err, null);
        }
    }

    async attemptToSendReminder(cb) {
        // let queues = Queue.find({})
        const todaysDay = new Date().getDate();
        let validQueues = await Queue.find({ sendReminder: true, scheduledToSend: todaysDay}).exec();
        return cb(validQueues)
        // this.twilioService.sendReminder((result) => {
        //     return cb(result)
        // })
    }
}

