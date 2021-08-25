'use strict'
if (process.env.NODE_ENV != 'production') require('dotenv').config()
const twilio = require('twilio')

// Twilio Service 
module.exports = class TwilioService {
    
    constructor() {
        this.accountSID = process.env.TWLO_ACCT_SID;
        this.authToken = process.env.AUTH_TOKEN;
        this.senderPhoneNumber = process.env.SENDER
    }

    sendReminder(cb) {
        // create a client instance
        const client = twilio(this.accountSID, this.authToken);
        // send out message -- still need to wait for twilio acc to be verified
        client.messages
            .create({
                body: 'Test send from reminder api',
                from: `+${this.senderPhoneNumber}`,
                to: '+7812671202'
            })
            .then(message => {
                cb(message.sid)
            })
    }
}

