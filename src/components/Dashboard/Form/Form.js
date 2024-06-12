import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import './Form.scss';
import { CITIES } from '../../../api/cities'

const Form = ({ newLocation }) => {
    const [state, setState] = useState();
    const [stateOptions, setStateOptions] = useState([]);

    useEffect(() => {
        // Llamar al API para obtener la lista de estados
        fetch(`https://continentl.com/api/country-list?page=1&key=sk-10he666919e7f2496272`)
            .then(response => response.json())
            .then(data => {
                let options = new Set(); // Usar un conjunto para eliminar duplicados

            data.forEach(country => {
                options.add(country.name);
                if (country.states) {
                    country.states.forEach(state => options.add(state));
                }
                });

                const optionsArray = Array.from(options);

                setStateOptions(Array.from(options));
                // Si las opciones del API están vacías, agrega las opciones adicionales
                if (optionsArray.length === 0) {
                    setStateOptions([...CITIES]);
                } else {
                    setStateOptions(optionsArray);
                }
            })
            .catch(
                error => {
                    console.error('Error fetching data:', error);
                    setStateOptions([...CITIES]);
                }
                );
            }, []);
            
            const onSubmit = (e) => {
                e.preventDefault();
                if (state === "" || !state) return;
                newLocation(state);
                };


    return (
        <div className="container">
            <div className="mb-4">
                <p style={{ fontSize: "1.5rem", color: "#333" }}>
                    Realice una búsqueda del clima de la ciudad de su elección.
                </p>
            </div>
            <form onSubmit={onSubmit}>
                <div className="input-group mb-3 mx-auto d-flex justify-content-center">
                    <Autocomplete
                        disablePortal
                        id="state-autocomplete"
                        options={stateOptions}
                        sx={{ width: '55%' }}
                        renderInput={(params) => <TextField {...params} label="Ciudad" />}
                        value={state || ""}
                        onChange={(event, newValue) => setState(newValue)}
                        isOptionEqualToValue={(options, value) => options.valueOf === value.valueOf}
                    />
                    <button className="btn btn-outline-secondary input-group-text" >Buscar</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
