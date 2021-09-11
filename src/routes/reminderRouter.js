const express = require('express')
const router = express.Router()
const { reminderController } = require('../controllers/index')

router.post('/sendOutPaymentReminder', reminderController.sendOutReminderController);
router.post('/addAccountToQueue', reminderController.addAccountToQueueController);
router.put('/updateSendReminderOption', reminderController.updateSendReminderOptionController);
router.get('/getUserAccounts/:id', reminderController.getUserAccountsInQueueController);

module.exports = router;