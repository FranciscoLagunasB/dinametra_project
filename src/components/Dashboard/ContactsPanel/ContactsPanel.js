import React, { useState, useEffect } from 'react';
import Table from '../../Table/Table';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import contactosService from '../../../api/contactosService';

function ContactsPanel({ showView, addedData, functionToggleEditView, isEditing,
    toggleShowDetailsView, showDetails }) {
    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

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

    const updateContactosList = async () => {
        try {
            const data = await contactosService.getAll();
            setContactos(data);
        } catch (error) {
            console.error('Error updating contactos list:', error);
        }
    };

    useEffect(() => {
        if (addedData && addedData.status && addedData.data) {
            setContactos(prevContactos => [...prevContactos, addedData.data.data]);
        }
    }, [addedData]);

    return (
        <>
            {showView ? (
                <>
                    <Table
                        showData={show}
                        loadingData={loading}
                        DATA={contactos}
                        setDATA={setContactos}
                        updateContactosList={updateContactosList}
                        functionToggleEditView={functionToggleEditView}
                        isEditing={isEditing}
                        toggleShowDetailsView={toggleShowDetailsView}
                        showDetails={showDetails}
                    />

                    <ToastContainer position="bottom-center" bodyClassName="toast-body" />
                </>
            ) : null}
        </>
    );
}

export default ContactsPanel;