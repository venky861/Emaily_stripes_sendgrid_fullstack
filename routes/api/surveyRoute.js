const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Survey = mongoose.model("surveys")
const requireLogin = require("../../middleware/requireLogin")
const requireCredits = require("../../middleware/requireCredits")
const Mailer = require("../../services/Mailer")
const surveyTemplate = require("../../services/EmailTemplate/surveyTemplate")
const _ = require("lodash")
const { Path } = require("path-parser")
const { URL } = require("url")

router.get("/api/surveys", requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id }).select('-recipients')
  res.send(surveys)
})

router.get("/api/surveys/:surveyId/:choice", (req, res) => {
  res.send("Thanks for your vote!!!")
})

router.post("/api/surveys/webhooks", (req, res) => {
  const p = new Path("/api/surveys/:surveyId/:choice")

  _.chain(req.body)
    .map(({ email, url }) => {
      const match = p.test(new URL(url).pathname)

      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice }
      }
    })
    .compact()
    .uniqBy("email", "surveyId")
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true }
        }
      ).exec()
    })
    .value()

  res.send("yeah")
})

router.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body

  const survey = await new Survey({
    title,
    subject,
    body,
    _user: req.user.id,
    recipients: recipients.split(",").map(email => ({ email }))
  })

  const mailer = new Mailer(survey, surveyTemplate(survey))

  try {
    await mailer.send()
    await survey.save()

    req.user.credits = req.user.credits - 1
    const user = await req.user.save()

    res.send(user)
  } catch (err) {
    res.status(422).send(err)
  }
})
module.exports = router
