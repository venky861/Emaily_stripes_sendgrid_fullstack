const express = require("express")
const passport = require("passport")

const router = express.Router()

router.get("/server", (req, res) => {
  res.send("hey there")
})

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/surveys")
  }
)

router.get("/api/current_user", (req, res) => {
  try {
    res.send(req.user)
  } catch (err) {
    res.send("User not logged in")
  }
})

router.get("/api/logout", (req, res) => {
  req.logOut()
  res.send(req.user)
  // res.redirect()
})

module.exports = router
