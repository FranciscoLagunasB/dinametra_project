// IMPORT OF THIS SOFTWARE
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Tooltip from '@material-ui/core/Tooltip';
import 'react-toastify/dist/ReactToastify.css';

// IMPORT 
import './NavNotifications.scss';

function NavNotifications() {
  // TOAST MESSAGE
  const notify = (message) => toast(message);

  // USE STATE TO MANAGE STATE OF NOTIFICATION DROPDOWN
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

  return (
    <div>
      {/* TOAST */}
      <ToastContainer 
        position="bottom-center"
        bodyClassName="toast-body"/>

      {/* NOTIFICATION DROPDOWN */}
      <div className="notification-dropdown" ref={dropdownRef}>
        <Tooltip title="Notificaciones" arrow>
          <button className="notification-button" onClick={toggleDropdown}>
            <i className="bi bi-bell fs-3" ></i> {/* Ícono de notificación */}
          </button>
        </Tooltip>
        {isOpen && (
          <div className="notification-content">
            {notificationsData.map(notification => (
              <div key={notification.id} className="notification-item" role="button" 
                onClick={() => notify(notification.message)}>
                <p className="notification-message">{notification.message}</p>
                <p className="notification-time">{notification.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavNotifications;

// NOTIFICATION DATA
const notificationsData = [
  {
    id: 1,
    message: 'Juan te ha enviado una solicitud de amistad.',
    time: 'hace 5 minutos'
  },
  {
    id: 2,
    message: 'María ha comentado en tu publicación.',
    time: 'hace 1 hora'
  },
  {
    id: 3,
    message: 'Tienes 3 nuevos mensajes.',
    time: 'hace 2 horas'
  }
];
