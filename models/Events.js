const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("event", eventSchema)