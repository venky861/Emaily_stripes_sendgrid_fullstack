const express = require("express")
const passport = require("passport")
const keys = require("./config/keys")
const connectDB = require("./config/db")
const cookieSession = require("cookie-session")
const path = require("path")

require("./models/User")
require("./models/Survey")

require("./services/passport")

//db
connectDB()

const app = express()

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize())
app.use(passport.session())

// body parser
app.use(express.json({ extended: false }))

// Server static assest
if (process.env.NODE_ENV === "production") {
  //set static folder

  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.use("/", require("./routes/api/auth"))

app.use("/", require("./routes/api/billingRoute"))

app.use("/", require("./routes/api/surveyRoute"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Port is running on ${PORT}`))
