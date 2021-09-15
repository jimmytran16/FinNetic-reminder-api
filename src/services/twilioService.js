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

    // batch -  an array of objects that represents the notifications that will be sent out
    // batch model - {  }
    sendReminder(batch, cb) {
        // create a client instance
        const client = twilio(this.accountSID, this.authToken);
        // send out message -- TESTED
        // need to send payload of numbers that needs to be sent out for reminder
        // take in the batch and then iterate in order to send out messages
        console.log('batches', batch)
        for (var i in batch) {
            client.messages
                .create({
                    body: batch[i].body,
                    messagingServiceSid: this.messageServiceId,
                    to: batch[i].phone
                })
                .then(message => {
                })
        }


        return cb('Sucessfully sent batches');
    }
}

