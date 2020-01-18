import { combineReducers } from "redux"
import auth from "./auth"
import surveyReducer from "./surveyReducer"
import { reducer as reduxForm } from "redux-form"

export default combineReducers({
  auth,
  survey: surveyReducer,
  form: reduxForm
})
