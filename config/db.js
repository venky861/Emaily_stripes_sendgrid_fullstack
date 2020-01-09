const mongoose = require("mongoose")
const config = require("config")
const key = require("./keys")
db = key.mongoURI

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log("mongodb connected")
  } catch (err) {
    console.log(err)
    //exit
    process.exit(1)
  }
}

module.exports = connectDB
