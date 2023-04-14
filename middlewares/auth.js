const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

exports.Protected = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization
    console.log(token)
    if (!token) {
        return res.status(401).json({
            message: "please provide Token"
        })
    }
    const { id } = jwt.verify(token, process.env.JWT_KEY)
    if (!id) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
    next()
})


