import React from "react"
import StripeCheckOut from "react-stripe-checkout"
import { connect } from "react-redux"
import { handleToken } from "../actions/auth"

const Payments = ({ handleToken }) => {
  return (
    <StripeCheckOut
      name='Emaily'
      description='$5 to get 5 credits'
      amount={500}
      token={token => handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className='btn-primary'>Add Credits</button>
    </StripeCheckOut>
  )
}

export default connect(null, { handleToken })(Payments)
