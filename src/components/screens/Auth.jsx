import React from 'react'
import { Outlet } from 'react-router-dom'
function Auth() {
  return (
    <div className='Auth'>
            <div className='left'>
                <div className='top'>
                    <img
                        src={require("../assets/images/logo.svg").default}
                        alt="logo"
                    />
                </div>
                <h1>Travel to the best beautiful place</h1>
            </div>
            <div className='right'>
                <Outlet />
            </div>
        </div>
  )
}

export default Auth