import React, { useState, useEffect, useRef  } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import './NavUser.scss'

function NavUser() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {};

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <Tooltip title="Usuario" arrow>
        <button className="user-button" onClick={toggleDropdown}>
          <i className="bi bi-person fs-2"></i>
        </button>
      </Tooltip>
      {isOpen && (
        <div className="dropdown-content">
          <button className="dropdown-item">Configuración</button>
          <button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}

export default NavUser
