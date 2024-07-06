import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactForm from '../Dashboard/Form/ContactForm';
import DetailsView from '../Dashboard/DetailsView/DetailsView'; 
import axios from 'axios';

import './Table.scss';

function Table({ showData, DATA, setDATA, updateContactosList, functionToggleEditView, isEditing,
        toggleShowDetailsView, showDetails}) {

    const [editData, setEditData] = useState(null);

    const columns = [
        { field: 'nombres', headerName: 'Nombre', flex: 1 },
        { field: 'apellido_paterno', headerName: 'Apellido Paterno', flex: 1 },
        { field: 'apellido_materno', headerName: 'Apellido Materno', flex: 1 },
        { field: 'fecha_nacimiento', headerName: 'Fecha de nacimiento', flex: 1 },
        { field: 'alias', headerName: 'Alias', flex: 1 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleView(params.row)} title="Ver">
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(params.row)} title="Editar">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.contacto_PK)} title="Eliminar">
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    const handleView = (row) => {
        toggleShowDetailsView();
        setEditData(row);
    };

    const handleEdit = (row) => {
        functionToggleEditView();
        setEditData(row);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/contactos/${id}/`);
            if (response.status === 201) {
                const updatedData = DATA.filter((item) => item.contacto_PK !== id);
                setDATA(updatedData);
            }
        } catch (error) {
            console.error('Error al intentar eliminar el registro:', error);
        }
    };

    const updateData = (res) => {
        if (res.data.updated) {
            const updatedContacto = res.data.data;
            const updatedData = DATA.map(item => {
                if (item.contacto_PK === updatedContacto.contacto_PK) {
                    return updatedContacto;
                }
                return item;
            });
            setDATA(updatedData);
        }
    }

    let rows = DATA.map((row, index) => ({ id: index + 1, ...row }));

    let data = {
        rows: rows,
        columns: columns,
    };

    return (
        <>
            {(showData && (!isEditing && !showDetails)) ? (
                <div style={{ width: '100%' }}>
                    <h2>Agenda de contactos</h2>

                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            {...data}
                            initialState={{
                                ...data.initialState,
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            pageSizeOptions={[5, 10, 25]}
                        />
                    </div>
                </div>
            ) : (
                <></>
            )}

            {isEditing && (
                <ContactForm
                    isEdit={true}
                    contactData={editData}
                    functionUpdate={updateData}
                    functionToggleEditView={functionToggleEditView}
                    onClose={() => {
                        functionToggleEditView={functionToggleEditView}
                        updateContactosList();
                    }}
                />
            )}

        {showDetails && (
            <DetailsView
                data={editData}/>
        )}
        </>
    );
}

export default Table;