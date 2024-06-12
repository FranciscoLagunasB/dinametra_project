// IMPORTS
import React from 'react'
import './Header.scss'

// IMPORT COMPONENTS
import Logo from '../Logo/Logo'
import Nav from '../Navbar/Nav'


function Header() {
  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
        {/* LOGO */}
        <Logo></Logo>
        {/* NAVBAR */}
        <Nav></Nav>
    </header>
  )
}

export default Header
