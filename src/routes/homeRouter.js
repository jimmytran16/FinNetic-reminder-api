const express = require('express')
const router = express.Router()
const controllers = require('../controllers/index')


const SchedulerService = require('../services/schedulerService')
const schedulerService = new SchedulerService()

router.get('/', controllers.homeController)
router.get('/gettest', (req,res,next) => {
    schedulerService.attemptToSendReminder((result) => {    
        return res.json({
            data: result
        })
    })    
})

module.exports = router;