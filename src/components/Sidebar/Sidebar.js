import React from 'react'
import './Sidebar.scss';

function Sidebar() {
  return (
    <aside id='sidebar' className='sidebar'>
        <ul className='sidebar-nav' id='sidebar-nav'>
            <li className='nav-item'>
                <a className='nav-link' href='/'>
                    <i className='bi bi-grid'></i>
                    <span>Dashboard</span>
                </a>
            </li>
            {/* <li className='nav-item'>
                <a
                    className='nav-link collapsed'
                    data-bs-target="#components-nav"
                    data-bs-toggle="collapse"
                    href="#a"
                    >
                        <i className='bi bi-menu-button-wide'></i>
                        <span>Extra</span>
                        <i className='bi bi-chevron-down ms-auto'></i>
                </a>
                <ul 
                className='nav-content collapse' 
                id='components-nav'
                data-bs-parent="#sidebar-nav">
                <li className='nav-item'>
                    <a href='#a'>
                        <i className='bi bi-circle'></i>
                        <span>Extra</span>
                    </a>
                </li>
                <li className='nav-item'>
                    <a href='#a'>
                        <i className='bi bi-circle'></i>
                        <span>Extra</span>
                    </a>
                </li>
                </ul>
            </li> */}
        </ul>
      
    </aside>
  )
}

export default Sidebar
