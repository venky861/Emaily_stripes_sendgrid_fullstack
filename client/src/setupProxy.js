const proxy = require("http-proxy-middleware")

module.exports = app => {
  app.use(proxy("/auth/google", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/logout", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/current_user", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/stripe", { target: "http://localhost:5000/" }))
  app.use(proxy(" /api/surveys", { target: "http://localhost:5000/" }))
}
