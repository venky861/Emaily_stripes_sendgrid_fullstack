import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducer/rootReducer"

const initialState = {}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
