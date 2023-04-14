const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(401).json({
            message: "all fields are required"
        })
    }
    const result = await User.findOne({ email }).lean()
    if (!result) {
        return res.status(401).json({
            message: "email is not registered with us"
        })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({
            message: "email or password  is wrong"
        })
    }
    const token = jwt.sign({ id: result._id }, process.env.JWT_KEY,
        { expiresIn: "1w" }
    )

    res.json({
        message: "Login Success",
        result: {
            name: result.firstName,
            email: result.email,
            token
        }
    })
})



