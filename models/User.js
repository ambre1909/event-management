const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)