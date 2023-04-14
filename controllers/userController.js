const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Event = require("../models/Events")

exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, address, country, gender, mobile, password } = req.body
        if (!firstName || !lastName || !address || !country || !gender || !mobile || !password) {
            throw new Error("all fields required")
        }
        const found = await User.findOne({ email })
        if (found) {
            throw new Error("email already exists")
        }
        const hashpass = await bcrypt.hash(password, 10)
        const result = await User.create({ firstName, lastName, email, address, country, gender, mobile, password: hashpass })

        const token = jwt.sign({ id: result._id }, process.env.JWT_KEY)

        res.json({
            message: "User Register Successfully",
            result: {
                id: result._id,
                firstName,
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            message: "Error" + error,

        })
    }
}

exports.addEvent = async (req, res) => {
    try {
        const { date, desc, startTime, endTime } = req.body
        if (!date || !desc || !startTime || !endTime) {
            throw new Error("all fields required")
        }
        const result = await Event.create({ date, desc, startTime, endTime })
        res.json({
            message: "event added Successfully",
        })
    } catch (error) {
        res.status(400).json({
            message: "Error" + error,

        })
    }
}

exports.getEventData = async (req, res) => {
    try {
        const { date } = req.params
        const result = await Event.find({ date }).select("-__v -createdAt -updatedAt  -_id").lean()
        res.json({
            message: "event get Successfully",
            result
        })
    } catch (error) {
        res.status(400).json({
            message: "Error" + error,

        })
    }
}

exports.destroyUsers = async (req, res) => {
    try {
        await User.deleteMany()
        res.json({
            message: "all users deleted Successfully",
        })
    } catch (error) {
        res.status(400).json({
            message: "Error" + error,

        })
    }
}





