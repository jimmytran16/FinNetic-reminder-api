const express = require('express')
const router = express.Router()
const { reminderController } = require('../controllers/index')

router.post('/sendOutPaymentReminder', reminderController.sendOutReminderController);
router.post('/addAccountToQueue', reminderController.addAccountToQueueController);
router.put('/updateSendReminderOption', reminderController.updateSendReminderOptionController);

module.exports = router;