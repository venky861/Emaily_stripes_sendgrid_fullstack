import React, { Fragment, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Landing from "./components/Landing"
import Dashboard from "./components/Dashboard"
import Header from "./components/Header"
import { connect } from "react-redux"
import { fetchUser } from "./actions/auth"
import setAuthToken from "./utils/setAuthToken"
import SurveyNew from "./components/surveys/SurveyNew"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <Router>
      <Fragment>
        <Header />
        <Switch>
          <Route exact path='/' component={Landing}></Route>
          <PrivateRoute
            exact
            path='/surveys'
            component={Dashboard}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path='/surveys/new'
            component={SurveyNew}
          ></PrivateRoute>
        </Switch>
      </Fragment>
    </Router>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { fetchUser })(App)
