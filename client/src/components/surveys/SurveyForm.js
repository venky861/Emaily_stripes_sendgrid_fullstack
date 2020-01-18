import React, { Component } from "react"
import { reduxForm, Field } from "redux-form"
import SurveyField from "./SurveyField"
import _ from "lodash"
import { Link } from "react-router-dom"
import validateEmails from "../../utils/validateEmail"
import formField from "./formField"

class SurveyForm extends Component {
  renderFields() {
    return _.map(formField, ({ label, name }) => {
      return (
        <Field
          key={name}
          label={label}
          name={name}
          type='text'
          component={SurveyField}
        />
      )
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSuvreySubmit)}>
          {this.renderFields()}
          <Link to='/Surveys'>Cancel</Link>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}

  /* if (!values.title) {
    errors.title = "Please enter a title"
  }
  if (!values.subject) {
    errors.subject = "Please enter a subject"
  }

   if (!values.body) {
    errors.body = "Please enter a body"
  }

  */

  _.each(formField, ({ name }) => {
    if (!values[name]) {
      errors[name] = `Please enter a ${name}`
    }
  })

  if (values.recipients) {
    errors.recipients = validateEmails(values.recipients || "")
  }

  return errors
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm)
