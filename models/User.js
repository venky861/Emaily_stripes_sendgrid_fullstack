const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
  googleId: { type: String },
  credits: { type: Number, default: 0 }
})

mongoose.model("users", UserSchema)
