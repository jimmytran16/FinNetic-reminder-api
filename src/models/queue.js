const mongoose = require('mongoose')

const queueSchema = new mongoose.Schema({
    accountName: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required:true },
    username: { type: String, required: false },
    paymentDue: { type: Date, required: true },
    scheduledToSend: { type: Date, required: true },
    phone: { type:String, required:true },
    createdOn: { type: Date, default: new Date() }
});

const Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue;