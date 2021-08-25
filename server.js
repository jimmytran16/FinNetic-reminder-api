'use strict'
require('dotenv').config();
const express = require('express');
const app = express();
const routers = require('./src/routes/index')
const cron = require('node-cron')


app.use(express.json())
app.use(express.urlencoded())
app.use(require('morgan')('dev'))

// start the cron job scheduler
cron.schedule(process.env.CRON_REMINDER_PATTERN, () => {
    // will call the endpoint to check if there are dates within the database that has due dates for tomorrow
    console.log('ran every minute')
})
app.use('/', routers.homeRouter);
app.use('/backgroundJob', routers.reminderRouter);

app.listen(4000, () => console.log(`Connection to PORT ${ 4000 }`));
