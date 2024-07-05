import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactForm from '../Dashboard/Form/ContactForm';
import axios from 'axios';

import './Table.scss'

function Table({ showData, DATA, setDATA  }) {

    const [editData, setEditData] = useState(null); // Estado para almacenar datos de edición
    const [isEditing, setIsEditing] = useState(false);
    // const [showView, setShowView] = useState(true);

    const toggleShowView = () => {
        setIsEditing(!isEditing);
    };

    const columns = [
        // { field: 'contacto_PK', headerName: 'ID', flex: 1},
        { field: 'nombres', headerName: 'Nombre', flex: 1},
        { field: 'apellido_paterno', headerName: 'Apellido Paterno', flex: 1},
        { field: 'apellido_materno', headerName: 'Apellido Materno', flex: 1},
        { field: 'fecha_nacimiento', headerName: 'Fecha de nacimiento', flex: 1},
        { field: 'alias', headerName: 'Alias', flex: 1},
        { 
            field: 'acciones', 
            headerName: 'Acciones', 
            flex: 1,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleView(params.row.contacto_PK)} title="Ver">
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


    const handleView = (id) => {
        // Lógica para mostrar detalle del registro
        console.log(`Ver registro con ID ${id}`);
    };

    const handleEdit = (row) => {
        toggleShowView(); // Cambiar la vista
        setEditData(row); // Almacenar datos del registro a editar
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            // Realizar la llamada DELETE al backend para eliminar el registro
            const response = await axios.delete(`http://localhost:8000/api/contactos/${id}/`);

            // Verificar si la eliminación fue exitosa en la respuesta del backend
            if (response.status === 204) {
                // Eliminar el registro del estado local DATA
                const updatedData = DATA.filter((item) => item.id !== id);
                setDATA(updatedData);
                console.log(`Registro con ID ${id} eliminado correctamente`);
            } else {
                console.log(`Error al eliminar el registro con ID ${id}`);
            }
        } catch (error) {
            console.error('Error al intentar eliminar el registro:', error);
        }
    }

    let rows = DATA.map((row, index) => ({ id: index + 1, ...row }));

      let data= {
        rows: rows,
        columns: columns,
      };

    return (
        <>

        { showData === true ? (
            <div style={{ width: '100%' }}>
                <h2>Registro Meteorológico</h2>

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
            ):(<></>)
        }
        
        {isEditing && (
                <ContactForm
                    isEdit={true}
                    contactData={editData}
                    onClose={() => setIsEditing(false)}/>
            )}
        </>
    );
}

export default Table;