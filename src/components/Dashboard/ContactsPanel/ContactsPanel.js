import React, { useState, useEffect } from 'react';
import Table from '../../Table/Table';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import contactosService from '../../../api/contactosService';

function ContactsPanel({showView}) {
    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState(''); // Columna seleccionada para buscar

    useEffect(() => {
        const fetchContactos = async () => {
            try {
                setLoading(true);
                setShow(true);
                const data = await contactosService.getAll();
                setContactos(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching contactos:', error);
                setLoading(false);
                setShow(false);
            }
        };

            fetchContactos();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchColumnChange = (e) => {
        setSearchColumn(e.target.value);
    };

    return (
        <>
        { showView ?
            (<>
                <div>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <select value={searchColumn} onChange={handleSearchColumnChange}>
                        <option value="">Seleccionar columna...</option>
                        <option value="nombres">Nombre</option>
                        <option value="apellido_paterno">Apellido Paterno</option>
                        <option value="apellido_materno">Apellido Materno</option>
                        <option value="fecha_nacimiento">Fecha de Nacimiento</option>
                        <option value="alias">Alias</option>
                    </select>
                </div>

                <Table 
                showData={show}
                loadingData={loading}
                DATA={contactos}
                setDATA={setContactos}/>
                
                <ToastContainer 
                    position="bottom-center"
                    bodyClassName="toast-body"/>
        </>)
        : (null) }
        </>
    );
}

export default ContactsPanel;