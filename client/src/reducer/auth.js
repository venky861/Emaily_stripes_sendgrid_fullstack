import { FETCH_USER, LOGOUT, AUTH_ERROR } from "../actions/types"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  user: null
}

export default function(state = initialState, action) {
  const { type, payload } = action
  // console.log(payload)
  switch (type) {
    case FETCH_USER:
      localStorage.setItem("token", payload.googleId)
      return {
        ...state,
        isAuthenticated: true,
        loading: true,
        user: payload.credits
      }

    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem("token")
      return { ...state, token: null, isAuthenticated: false, loading: false }

    default:
      return state
  }
}
