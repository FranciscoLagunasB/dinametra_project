import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';


import './Table.scss'

function Table({ showData, DATA }) {

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
                    <IconButton onClick={() => handleView(params.contacto_PK)} title="Ver">
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(params.contacto_PK)} title="Editar">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.contacto_PK)} title="Eliminar">
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

    const handleEdit = (id) => {
        // Lógica para editar el registro
        console.log(`Editar registro con ID ${id}`);
    };

    const handleDelete = (id) => {
        // Lógica para eliminar el registro
        console.log(`Eliminar registro con ID ${id}`);
    };

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
        </>
    );
}

export default Table;