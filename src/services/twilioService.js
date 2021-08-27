'use strict'
if (process.env.NODE_ENV != 'production') require('dotenv').config();
const twilio = require('twilio')

// Twilio Service 
module.exports = class TwilioService {
    
    constructor() {
        this.accountSID = process.env.TWLO_ACCT_SID;
        this.authToken = process.env.AUTH_TOKEN;
        this.messageServiceId = process.env.MESSAGE_SERVICE_ID;

        this.TEST_RECIEVER = process.env.RECIEVER_TEST;
    }

    sendReminder(cb) {
        // create a client instance
        const client = twilio(this.accountSID, this.authToken);
        // send out message -- TESTED
        // need to send payload of numbers that needs to be sent out for reminder
        client.messages
            .create({
                body: 'Test send from reminder api',
                messagingServiceSid: this.messageServiceId,
                to: this.TEST_RECIEVER
            })
            .then(message => {
                cb(message.sid)
            })
    }
}

