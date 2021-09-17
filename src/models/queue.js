const mongoose = require('mongoose')

const queueSchema = new mongoose.Schema({
    accountName: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    accountId: { type:mongoose.Types.ObjectId, required: true },
    username: { type: String, required: false },
    sendReminder: { type: Boolean, required: true },
    scheduledToSend: { type: Number, required: true },
    phone: { type: String, required: false },
    createdOn: { type: Date, default: new Date() }
});

const Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue;