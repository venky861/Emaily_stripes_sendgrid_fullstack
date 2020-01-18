const mongoose = require("mongoose")
const SurveySchema = new mongoose.Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [
    {
      email: String,
      responded: { type: Boolean, default: false }
    }
  ],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  dateSent: {
    type: Date,
    default: Date.now
  },
  lastResponded: {
    type: Date,
    default: Date.now
  }
})

mongoose.model("surveys", SurveySchema)
