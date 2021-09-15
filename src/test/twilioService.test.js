'use strict'
const TwilioService = require('../services/twilioService')
const twilioService = new TwilioService();
require('dotenv').config()

it('Test Twilio Service sendReminder() - Make sure the batch that is being passed to params are all sent' , () => {
    const test_reciever_phonenumber = process.env.RECIEVER_TEST;
    const batches = [
        { body: 'Your payment for Macys is due tomorrow on the 27th of July', phone: test_reciever_phonenumber },
        { body: 'Your payment for Discover is due tomorrow on the 28th of July', phone:test_reciever_phonenumber },
        { body: 'Your payment for Student loans is due tomorrow on the 29th of July', phone:test_reciever_phonenumber },
        { body: 'Your payment for Kohls is due tomorrow on the 30th of July', phone: test_reciever_phonenumber }
    ]

    twilioService.sendReminder(batches, (result) => {
        expect(result).toBe('Sucessfully sent batches');
    })
}) 
