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

    // Delete the acccount from the Queue by the account id
    async deleteAccountFromQueue(accountId, cb) {
        try {
            let result = await Queue.findOneAndDelete({ accountId: mongoose.Types.ObjectId(accountId) });
            if (result) {
                return cb(null, result);
            }
            return cb('No Account found', null);

        } catch (err) {
            return cb(err.toString(), null);
        }
    }

    async updateUserPhoneNumber(userId, phone, cb) {
        try {
            let result = await Queue.updateMany({ userId: mongoose.Types.ObjectId(userId) }, { $set: { phone: phone } });
            return cb(null, result);
        } catch (err) {
            return cb(err.toString(), null);
        }
    }

    async attemptToSendReminder(cb) {
        // let queues = Queue.find({})
        const todaysDate = new Date().getDate();
        let validQueues = await Queue.find({ sendReminder: true, scheduledToSend: todaysDate, phone: { $ne: null } }).exec();
        let batch = validQueues = this._parseValidQueuesIntoBatch(validQueues)
        this.twilioService.sendReminder(batch, (result) => {
            return cb(result)
        })
    }

    // parse the validQueues into a batch and pass it to the twilio service
    _parseValidQueuesIntoBatch(validQueues) {
        let batch = new Array();
        for (var i in validQueues) {
            let obj = {
                body: `Hello this is a reminder that your ${validQueues[i].accountName} account payment is due today on the ${this._ordinalSuffixOf(validQueues[i].scheduledToSend)}. Please don't forget to pay!`,
                phone: validQueues[i].phone
            }
            batch.push(obj);
        }
        return batch;
    }

    _ordinalSuffixOf(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }
}

