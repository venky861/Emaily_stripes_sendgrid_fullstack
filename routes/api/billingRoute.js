const express = require("express")
const keys = require("../../config/keys")
const stripe = require("stripe")(keys.stripeSecretKey)
const requireLogin = require("../../middleware/requireLogin")

const router = express.Router()

router.post("/api/stripe", requireLogin, async (req, res) => {
  // console.log(req.body)
  // res.send("done")
  try {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
      shipping: {
        name: "Jenny Rosen",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US"
        }
      }
    })

    // console.log(charge)
    req.user.credits += 5

    const user = await req.user.save()

    res.send(user)
  } catch (err) {
    res.status(401).send("error in billing route")
  }
})

module.exports = router
