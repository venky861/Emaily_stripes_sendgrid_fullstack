import React from "react"

const SurveyField = ({ input, label, meta: { touched, error } }) => {
  return (
    <div className=''>
      <label>{label}</label>
      <input {...input}></input>
      {touched && error}
    </div>
  )
}

export default SurveyField
