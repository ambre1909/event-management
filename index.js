const { format } = require("date-fns")
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
require("dotenv").config({ path: "./.env" })
const mongoose = require("mongoose")
const path = require("path")



const app = express()
connectDB()


app.use(cors({
    credentials: true,
    origin: (o, cb) => {
        const allowed = [
            "http://localhost:3000",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            // "https://railway-mern-production-6b7c.up.railway.app"
        ]
        if (allowed.indexOf(o) !== -1 || !o) {
            cb(null, true)
        } else {
            cb("blocked by cors")
        }
    }
}))

app.use(express.json())
app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, "public")))


app.use("/auth", require("./routes/authRoute"))
app.use("/user", require("./routes/userRoutes"))



app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"))
})

const PORT = process.env.PORT || 5000

mongoose.connection.once("open", () => {
    app.listen(PORT, console.log(`server running http://localhost:${PORT}`))
    console.log("mongo connected");
})

mongoose.connection.on("error", err => {
    const msg = `${format(new Date(), "dd-MM-yyyy \t HH:mm:ss")}\t${err.code}\t${err.name}`
    console.log(msg)
})