import React, { Fragment } from "react"
import { connect } from "react-redux"
import { logout, fetchUser } from "../actions/auth"
import { Link } from "react-router-dom"
import Payments from "./Payments"

const Header = ({ auth, logout, fetchUser }) => {
  const { isAuthenticated, user } = auth
  console.log("user", user)
  const authLinks = (
    <div>
      <ul>
        <li>
          <Payments />
        </li>
        <li>Credits:{user}</li>
        <Link onClick={logout} to='/'>
          Logout
        </Link>
      </ul>
    </div>
  )

  const GuestLinks = (
    <div>
      <ul>
        <li>
          <a href='/auth/google' onClick={fetchUser}>
            Login with Google
          </a>
        </li>
      </ul>
    </div>
  )
  return (
    <div className='mb-0'>
      <div className='navbar navbar-dark  navbar-expand-sm mx-1 '>
        <a className='text-secondary mx-5 my-4' href='/'>
          Emaily
        </a>

        <Fragment>
          {isAuthenticated && typeof user != "undefined"
            ? authLinks
            : GuestLinks}
        </Fragment>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout, fetchUser })(Header)
