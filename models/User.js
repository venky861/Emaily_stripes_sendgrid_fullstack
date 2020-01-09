const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
  googleId: { type: String }
})

mongoose.model("users", UserSchema)
