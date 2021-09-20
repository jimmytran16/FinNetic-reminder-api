'use strict'
require('dotenv').config();
const express = require('express');
const app = express();
const routers = require('./src/routes/index')
const cron = require('node-cron')
const db = require('./src/database/db')
const SchedulerService = require('./src/services/schedulerService')
const scheduleService = new SchedulerService()

app.use(express.json())
app.use(express.urlencoded())
app.use(require('morgan')('dev'))
app.use((req,res,next) => {
    console.log('REQBODY-',req.body);
    next();
})
db.connect();

// start the cron job scheduler
cron.schedule(process.env.CRON_REMINDER_PATTERN, () => {
    // will call the endpoint to check if there are dates within the database that has due dates for tomorrow
    // (NOT DONE YET)
    scheduleService.attemptToSendReminder((result) => {
        console.log(result)
    })
})

app.use('/', routers.homeRouter);
app.use('/api/scheduler', routers.reminderRouter);

module.exports = app;