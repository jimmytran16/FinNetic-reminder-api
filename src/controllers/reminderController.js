const TwilioService = require('../services/twilioService')

const reminderController = (req, res, next) => {
    var twilioService = new TwilioService()
    // Will call the twilio service to send out the reminders to the users
    twilioService.sendReminder((result) => {
        return res.status(200).json({
            message: result,
            success: true
        })
    })
}

module.exports = reminderController;