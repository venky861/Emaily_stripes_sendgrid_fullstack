import { FETCH_SURVEY } from "../actions/types"

const initialState = {
  user: null,
  loading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action
  // console.log(payload)

  switch (type) {
    case FETCH_SURVEY:
      return {
        ...state,
        user: payload,
        loading: false
      }

    default:
      return state
  }
}
