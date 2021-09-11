const TwilioService = require('../services/twilioService')
const SchedulerService = require('../services/schedulerService')

const sendOutReminderController = (req, res, next) => {
    var twilioService = new TwilioService()
    // Will call the twilio service to send out the reminders to the users
    twilioService.sendReminder((result) => {
        return res.status(200).json({
            message: result,
            success: true
        })
    })
}

const addAccountToQueueController = (req, res, next) => {
    var schedulerService = new SchedulerService()
    schedulerService.saveToQueue(req.body.payload, (err, result) => {
        return res.status(200).json({
            message: err ? err : result,
            success: err ? false : true
        })
    })
}

const updateSendReminderOptionController = (req, res, next) => {
    var schedulerService = new SchedulerService()
    schedulerService.updateSendReminderOption(req.body.userId, req.body.accountId, req.body.sendReminder, (err, result) => {
        return res.status(200).json({
            message: err ? err.toString() : result,
            success: err ? false : true
        })
    })
}

const getUserAccountsInQueueController = (req, res, next) => {
    var schedulerService = new SchedulerService()
    schedulerService.getUserAccountsInQueue(req.params.id, (err, result) => {
        return res.status(200).json({
            message: err ? err.toString() : result,
            success: err ? false : true
        })
    })
}

module.exports = {
    sendOutReminderController,
    addAccountToQueueController,
    updateSendReminderOptionController,
    getUserAccountsInQueueController
}