"use strict"

const mongoose = require('mongoose')
require('dotenv').config()

const connect = () => {
    const DB_URI = (process.env.NODE_ENV !== 'production') ? process.env.DB_URI_DEV : process.env.DB_URI;
    
    mongoose.connect(DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
        (err) => {
            (err) ? console.log(err) : console.log("successfully connected to DB")
        });
}

const disconnect = () => {
    mongoose.disconnect();
}

module.exports = { connect, disconnect }