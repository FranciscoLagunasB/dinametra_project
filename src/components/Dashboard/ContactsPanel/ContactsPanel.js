import React, { useState, useEffect } from 'react';
import Table from '../../Table/Table';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import contactosService from '../../../api/contactosService';

function ContactsPanel() {

    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const data = await contactosService.getAll();
                setContactos(data);
                console.log(data)
                setLoading(true);
                setShow(true);
            } catch (error) {
                console.error('Error fetching contactos:', error);
                setLoading(false);
                setShow(false);
            }
        };

        fetchContactos();
    }, []);

  return (
    <>
        <Table 
            showData={show}
            loadingData={loading}
            DATA={contactos} />
            
        <ToastContainer 
            position="bottom-center"
            bodyClassName="toast-body"/>
    </>
  )
}

export default ContactsPanel
