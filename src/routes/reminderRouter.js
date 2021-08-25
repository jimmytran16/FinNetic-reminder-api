const express = require('express')
const router = express.Router()
const controllers = require('../controllers/index')

router.post('/sendOutPaymentReminders', controllers.reminderController)

module.exports = router;