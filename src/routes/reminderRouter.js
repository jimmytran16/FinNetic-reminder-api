const express = require('express')
const router = express.Router()
const { reminderController } = require('../controllers/index')

router.post('/sendOutPaymentReminder', reminderController.sendOutReminderController);
router.post('/addAccountToQueue', reminderController.addAccountToQueueController);
router.put('/updateSendReminderOption', reminderController.updateSendReminderOptionController);
router.put('/updateQueuePhoneNumbers', reminderController.updateUserPhoneNumberController);
router.get('/getUserAccounts/:id', reminderController.getUserAccountsInQueueController);
router.delete('/deleteAccountInQueue', reminderController.deleteAccountInQueueController);

module.exports = router;