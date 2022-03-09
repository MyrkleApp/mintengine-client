import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute ({ children, ...rest }) {
    const { isLoggedIn } = useSelector(state => state.auth)

    return (
      <Route {...rest} render={() => {
        return isLoggedIn
          ? children
          : <Redirect to='/' />
      }} />
    )
}

export default PrivateRoute