import { FETCH_USER, LOGOUT } from "../actions/types"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
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
        loading: false,
        user: payload.credits
      }

    case LOGOUT:
      localStorage.removeItem("token")
      return { ...state, token: null, isAuthenticated: false, loading: false }

    default:
      return state
  }
}
