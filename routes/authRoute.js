const { loginUser } = require("../controllers/authController")

const router = require("express").Router()

router
    .post("/user/login", loginUser)





module.exports = router