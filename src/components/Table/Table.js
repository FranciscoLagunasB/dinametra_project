import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import WeatherChart from '../Dashboard/Charts/Chart/WeatherChart';
import Recharts from '../Dashboard/Charts/Recharts/Recharts';

import './Table.scss'

function Table({ showData, weatherHistory }) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'dateTime', headerName: 'Fecha y tiempo', width: 200 },
        { field: 'weather', headerName: 'Clima', width: 150 },
        { field: 'temperature', headerName: 'Temperatura (°C)', width: 200 },
        { field: 'humidity', headerName: 'Humedad (%)', width: 150 },
        { field: 'windSpeed', headerName: 'Velocidad del viento (km/h)', width: 200 },
        { field: 'windDirection', headerName: 'Direccón del viento', width: 200 },
    ];

    let rows = weatherHistory.map((row, index) => ({ id: index + 1, ...row }));

    
    const [filteredRows, setFilteredRows] = useState([]);
    const handleFilterModelChange = (filterModel) => {
        const filteredItems = filterModel.items;

        // Filtrar las filas basadas en los datos filtrados
        const filteredData = rows.filter(row => {
            return filteredItems.every(item => {
                // Verificar si el valor de la columna cumple con el criterio de filtrado
                return row[item.field] && row[item.field].toString().includes(item.value);
            });
        });

        // Establecer los datos filtrados en el estado filteredRows
        setFilteredRows(filteredData);
    };


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
                        onFilterModelChange={handleFilterModelChange}
                        initialState={{
                        ...data.initialState,
                        pagination: { paginationModel: { pageSize: 5 } },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    />
                    </div>
                    
                <div className="container-recharts">
                    {/* Llama al componente WeatherChart y pasa los datos filtrados como prop */}
                    <Recharts data={filteredRows.length > 0 ? filteredRows : rows}/>
                </div>
                
                <div className="container-chart">
                    {/* Llama al componente WeatherChart y pasa los datos filtrados como prop */}
                    <WeatherChart data={filteredRows.length > 0 ? filteredRows : rows}/>
                </div>


            </div>
            
            ):(<></>)
        }
        </>
    );
}

export default Table;