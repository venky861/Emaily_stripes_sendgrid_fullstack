import React from "react"
import { connect } from "react-redux"
import formField from "./formField"
import { surveyForm } from "../../actions/auth"
import _ from "lodash"
import { withRouter } from "react-router-dom"

const SurveyFormReview = ({ onCancel, formValues, surveyForm, history }) => {
  const reviewField = _.map(formField, ({ label, name }) => {
    return (
      <div key={name}>
        <label>
          {label}: {formValues[name]}
        </label>
      </div>
    )
  })

  return (
    <div>
      <h3>Please confirm your entries</h3>
      {reviewField}

      <button onClick={onCancel}>Back</button>

      <button onClick={() => surveyForm(formValues, history)}>
        Send Survey
      </button>
    </div>
  )
}

const mapStateToProps = state => ({
  formValues: state.form.surveyForm.values
})

export default connect(mapStateToProps, { surveyForm })(
  withRouter(SurveyFormReview)
)
