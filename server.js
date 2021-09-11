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
db.connect();

// start the cron job scheduler
cron.schedule(process.env.CRON_REMINDER_PATTERN, () => {
    // will call the endpoint to check if there are dates within the database that has due dates for tomorrow
    // (NOT DONE YET)
    console.log('ran every minute')
    // scheduleService.attemptToSendReminder((result) => {
    //     console.log(result)
    // })
})

app.use('/', routers.homeRouter);
app.use('/api/scheduler', routers.reminderRouter);

app.listen(4001, () => console.log(`Connection to PORT ${ 4001 }`));
