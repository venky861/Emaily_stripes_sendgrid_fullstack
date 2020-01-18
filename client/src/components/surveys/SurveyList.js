import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchSurveys } from "../../actions/auth"

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys()
  }

  renderSurveys() {
    if (!this.props.surveys.loading) {
      return this.props.surveys.user.reverse().map(survey => {
        return (
          <div key={survey._id}>
            <div>
              <span>{survey.title}</span>
              <p>{survey.body}</p>
              <p>Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p>
            </div>
            <div>
              <h4 href='#'>Yes: {survey.yes}</h4>
              <h4 href='#'>No: {survey.no}</h4>
            </div>
          </div>
        )
      })
    }
  }

  render() {
    return <div>{this.renderSurveys()}</div>
  }
}

const mapStateToProps = state => ({
  surveys: state.survey
})

export default connect(mapStateToProps, { fetchSurveys })(SurveyList)
