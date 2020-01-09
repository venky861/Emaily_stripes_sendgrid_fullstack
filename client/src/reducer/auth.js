import { FETCH_USER } from "../actions/types"

const initialState = {}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_USER:
      return { ...state }

    default:
      return state
  }
}
