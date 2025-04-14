import React from 'react'
import { Navigate, Route } from 'react-router-dom'

function PrivateRouter(props) {
    let user_data = localStorage.getItem("user_data")
  return (
    <Route path={props.path} element={(props) => {
        if (user_data) {
            <props.element />
        } else {
            <Navigate to='/auth.login' />
        }
    }}/>
  )
}

export default PrivateRouter