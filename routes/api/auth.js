const express = require("express")
const passport = require("passport")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("hey there")
})

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get("/auth/google/callback", passport.authenticate("google"))

router.get("/api/current_user", (req, res) => {
  res.send(req.user)
})

router.get("/api/logout", (req, res) => {
  req.logOut()
  res.send(req.user)
})

module.exports = router
