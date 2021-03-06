const TwilioService = require('../services/twilioService')
const SchedulerService = require('../services/schedulerService')

const sendOutReminderController = (req, res, next) => {
    return res.json({ message: 'undone', success: true })
    // var twilioService = new TwilioService()
    // scheduler serivce ---> calls ---> twilio service
    // Will call the twilio service to send out the reminders to the users
    // Call the service to get all of the valid queues 
    
    // twilioService.sendReminder((result) => {
    //     return res.status(200).json({
    //         message: result,
    //         success: true
    //     })
    // })
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

const deleteAccountInQueueController = (req, res, next) => {
    var schedulerService = new SchedulerService()
    schedulerService.deleteAccountFromQueue(req.body.accountId, (err, result) => {
        return res.status(200).json({
            message: err ? err.toString() : result,
            success: err ? false : true
        })
    })
}

const updateUserPhoneNumberController = (req, res, next) => {
    var schedulerService = new SchedulerService()
    schedulerService.updateUserPhoneNumber(req.body.userId, req.body.phone, (err, result) => {
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
    getUserAccountsInQueueController,
    deleteAccountInQueueController,
    updateUserPhoneNumberController
}