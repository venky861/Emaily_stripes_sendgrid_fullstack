if (process.env.NODE_ENV === "production") {
  // means we  are in production
  module.exports = require("./prod")
} else {
  // we are in dev

  module.exports = require("./dev")
}
