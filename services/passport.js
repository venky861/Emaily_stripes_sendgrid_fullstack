const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const keys = require("../config/keys")
const mongoose = require("mongoose")
const User = mongoose.model("users")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //  console.log("accessToken", accessToken)
      //  console.log("refreshToken", refreshToken)
      // console.log("profile", profile)

      const user = await User.findOne({ googleId: profile.id })

      if (user) {
        done(null, user)
      } else {
        let user = await new User({ googleId: profile.id }).save()
        done(null, user)
      }
    }
  )
)
