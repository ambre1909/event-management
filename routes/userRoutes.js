const { registerUser, destroyUsers, addEvent, getEventData } = require("../controllers/userController")
const { Protected } = require("../middlewares/auth")

const router = require("express").Router()
router
    .post("/register", registerUser)
    .post("/add-event", addEvent)
    .get("/get-event/:date", getEventData)
    .delete("/destroy", destroyUsers)


module.exports = router 