module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(401).send("User do not have enough credits")
  }
  next()
}
