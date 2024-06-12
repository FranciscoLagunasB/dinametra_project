import React from 'react'
import './Nav.scss'
import NavNotifications from './Options/Notifications/NavNotifications'
import NavUser from './Options/User/NavUser'

function Nav() {
  return (
    <nav className='header-nav ms-auto'>
        <ul className='d-flex align-items-center'>
            <NavNotifications/>
            <NavUser/>
        </ul>
    </nav>
  )
}

export default Nav
