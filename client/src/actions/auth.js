import { FETCH_USER, LOGOUT, FETCH_SURVEY, AUTH_ERROR, GOOGLE } from "./types"
import axios from "axios"

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/current_user")

    dispatch({
      type: FETCH_USER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const google = () => async dispatch => {
  await axios.get("/auth/google")
  dispatch({
    type: GOOGLE
  })
}

export const logout = () => async dispatch => {
  await axios.get("/api/logout")
  dispatch({
    type: LOGOUT
  })
}

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token)
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const surveyForm = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values)

  history.push("/surveys")
  dispatch({
    type: FETCH_USER,
    payload: res.data
  })
}

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys")

  dispatch({
    type: FETCH_SURVEY,
    payload: res.data
  })
}
