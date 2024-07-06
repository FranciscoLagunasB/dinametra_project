import React, { useState, useEffect, useMemo } from 'react';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import { Box } from '@mui/material';
import axios from 'axios';

const ContactForm = ({ 
    showView, isEdit, contactData, functionUpdate, functionToggleView, functionToggleEditView,
    functionAddedData }) => {

    const initialState = useMemo(() => ({
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_nacimiento: '',
        alias: '',
        foto: null,
        correos: [{ correo: '' }],
        telefonos: [{ tipo: '', numero: '' }],
        direcciones: [{ calle: '', numero_exterior: '', colonia: '', ciudad: '', estado: '', pais: '', codigo_postal: '' }]
    }), []);

    const [contacto, setContacto] = useState(initialState);
    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        if (isEdit && contactData) {
            setContacto({
                ...initialState,
                ...contactData,
                correos: contactData.correos.length > 0 ? contactData.correos : [{ correo: '' }],
                telefonos: contactData.telefonos.length > 0 ? contactData.telefonos : [{ tipo: '', numero: '' }],
                direcciones: contactData.direcciones.length > 0 ? contactData.direcciones : [{ calle: '', numero_exterior: '', colonia: '', ciudad: '', estado: '', pais: '', codigo_postal: '' }]
            });
        }
    }, [isEdit, contactData, initialState]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContacto(prevState => ({
            ...prevState,
            [name]: value
        }));
        setCanEdit(true); // Permitir editar cuando se modifican los datos
    };

    const handleCorreoChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...contacto.correos];
        list[index][name] = value;
        setContacto(prevState => ({
            ...prevState,
            correos: list
        }));
        setCanEdit(true);
    };

    const handleTelefonoChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...contacto.telefonos];
        list[index][name] = value;
        setContacto(prevState => ({
            ...prevState,
            telefonos: list
        }));
        setCanEdit(true);
    };

    const handleDireccionChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...contacto.direcciones];
        list[index][name] = value;
        setContacto(prevState => ({
            ...prevState,
            direcciones: list
        }));
        setCanEdit(true);
    };

    const handleAddCorreo = () => {
        setContacto(prevState => ({
            ...prevState,
            correos: [...prevState.correos, { correo: '' }]
        }));
        setCanEdit(true);
    };

    const handleAddTelefono = () => {
        setContacto(prevState => ({
            ...prevState,
            telefonos: [...prevState.telefonos, { tipo: '', numero: '' }]
        }));
        setCanEdit(true);
    };

    const handleAddDireccion = () => {
        setContacto(prevState => ({
            ...prevState,
            direcciones: [...prevState.direcciones, { calle: '', numero_exterior: '', colonia: '', ciudad: '', estado: '', pais: '', codigo_postal: '' }]
        }));
        setCanEdit(true);
    };

    const handleRemoveCorreo = index => {
        const list = [...contacto.correos];
        list.splice(index, 1);
        setContacto(prevState => ({
            ...prevState,
            correos: list
        }));
        setCanEdit(true);
    };

    const handleRemoveTelefono = index => {
        const list = [...contacto.telefonos];
        list.splice(index, 1);
        setContacto(prevState => ({
            ...prevState,
            telefonos: list
        }));
        setCanEdit(true);
    };

    const handleRemoveDireccion = index => {
        const list = [...contacto.direcciones];
        list.splice(index, 1);
        setContacto(prevState => ({
            ...prevState,
            direcciones: list
        }));
        setCanEdit(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let jsonContacto = {};
            jsonContacto['nombres'] = contacto.nombres;
            jsonContacto['apellido_paterno'] = contacto.apellido_paterno;
            jsonContacto['apellido_materno'] = contacto.apellido_materno;
            jsonContacto['fecha_nacimiento'] = contacto.fecha_nacimiento.toISOString().slice(0, 10);
            jsonContacto['alias'] = contacto.alias;
            jsonContacto['foto'] = contacto.fotoBase64;

            console.log(jsonContacto)

            // Agregar correos al objeto JSON
            jsonContacto['correos'] = [];
            contacto.correos.forEach((correo) => {
                if(correo.correo.length > 0){
                    jsonContacto['correos'].push({ 'correo': correo.correo });
                }
            });

            // Agregar telefonos al objeto JSON
            jsonContacto['telefonos'] = [];
            contacto.telefonos.forEach((telefono) => {
                if(telefono.tipo.length > 0 || telefono.numero.length > 0){
                    jsonContacto['telefonos'].push({ 'tipo': telefono.tipo, 'numero': telefono.numero });
                }
            });

            // Agregar direcciones al objeto JSON
            jsonContacto['direcciones'] = [];
            contacto.direcciones.forEach((direccion) => {
                if(
                    direccion.calle.length > 0  || direccion.numero_exterior.length > 0  || 
                    direccion.colonia.length > 0  || direccion.ciudad.length > 0  || direccion.estado.length > 0 
                    || direccion.pais.length > 0  || direccion.codigo_postal.length > 0 ){
                    jsonContacto['direcciones'].push({
                        'calle': direccion.calle,
                        'numero_exterior': direccion.numero_exterior,
                        'colonia': direccion.colonia,
                        'ciudad': direccion.ciudad,
                        'estado': direccion.estado,
                        'pais': direccion.pais,
                        'codigo_postal': direccion.codigo_postal
                    });
                }
            });

            console.log(jsonContacto)
            // Convertir a JSON string
            // const jsonContactoString = JSON.stringify(jsonContacto);
            // console.log(jsonContactoString)


            let apiUrl = 'http://localhost:8000/api/contactos/';
            if (isEdit) {
                apiUrl = `http://localhost:8000/api/contactos/${contacto.contacto_PK}/`;
            }

            const response = isEdit
                ? await axios.put(apiUrl, jsonContacto)
                : await axios.post(apiUrl, jsonContacto);

            if(isEdit){
                functionUpdate(response)
                functionToggleEditView()
            }else{
                functionAddedData(response)
                functionToggleView()
                setContacto(initialState);
                setCanEdit(false);
            }
        } catch (error) {
            console.error('Error al guardar el contacto:', error);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setContacto(prevState => ({
                ...prevState,
                fotoBase64: reader.result  // Almacena la imagen como base64
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            { showView ?
                (<></>) : 
                (
                    <div>
                        <h2>{isEdit ? 'Editar Contacto' : 'Crear Nuevo Contacto'}</h2>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row mb-1">
                            <div className="col">
                            <Form.Label>Nombres:</Form.Label>
                            <Form.Control type="text" name="nombres" value={contacto.nombres} onChange={handleInputChange} required/>
                            </div>

                            <div className="col">
                            <Form.Label>Apellido Paterno:</Form.Label>
                            <Form.Control type="text" name="apellido_paterno" value={contacto.apellido_paterno} onChange={handleInputChange} required/>
                            </div>

                            <div className="col">
                            <Form.Label>Apellido Materno:</Form.Label>
                            <Form.Control type="text" name="apellido_materno" value={contacto.apellido_materno} onChange={handleInputChange} required/>
                            </div>
                        </div>
                        
                        <Form.Label>Alias:</Form.Label>
                        <Form.Control type="text" name="alias" value={contacto.alias} onChange={handleInputChange} required/><br/>

                        <Form.Label>Fecha de Nacimiento:</Form.Label>
                        <DatePicker
                            selected={contacto.fecha_nacimiento}
                            onChange={(date) => handleInputChange({ target: { name: 'fecha_nacimiento', value: date } })}
                            dateFormat="yyyy-MM-dd"
                            className="form-control"
                            name="fecha_nacimiento" value={contacto.fecha_nacimiento}
                            required
                        /><br/>

                        <Form.Label>Foto:</Form.Label>
                        <Form.Control type="file" name="foto" onChange={handleImageChange} accept="image/png"/>
                            
                        <Form.Label>Correos Electrónicos:</Form.Label>
                            {contacto.correos.map((correo, index) => (
                                <div key={index}>
                                    <div className="row align-items-center">
                                    <div className="col-auto"><Form.Control type="email" placeholder="name@example.com" name="correo" value={correo.correo} onChange={e => handleCorreoChange(e, index)}/></div>
                                    <div className="col-auto"><Button variant="danger" type="button" onClick={() => handleRemoveCorreo(index)}>Eliminar</Button></div>
                                    </div>
                                </div>
                            ))}
                            <Button variant="info" type="button" className='mt-2' onClick={handleAddCorreo}>Agregar Correo</Button><br/>
                        
                        <Form.Label>Teléfonos:</Form.Label>
                            {contacto.telefonos.map((telefono, index) => (
                                <div key={index} className="row align-items-center">
                                    <div className="col-auto">
                                    <Form.Select aria-label="Default select example" name="tipo" placeholder="Tipo" value={telefono.tipo} onChange={e => handleTelefonoChange(e, index)}>
                                    <option>Seleccionar</option>
                                    <option value="Movil">Movil</option>
                                    <option value="Fijo">Fijo</option>
                                    </Form.Select></div>
                                    <div className="col-auto"><Form.Control type="text" name="numero" placeholder="Número" value={telefono.numero} onChange={e => handleTelefonoChange(e, index)}/> </div>

                                    <div className="col-auto"><Button variant="danger" type="button" onClick={() => handleRemoveTelefono(index)}>Eliminar</Button></div>
                                </div>
                            ))}
                            <Button variant="info" type="button" className='mt-2' onClick={handleAddTelefono}>Agregar Teléfono</Button><br/>

                            <Form.Label>Direcciones::</Form.Label>
                            {contacto.direcciones.map((direccion, index) => (
                                <div key={index} >
                                    <div className="row mb-1">
                                    <div className="col"><Form.Control type="text" name="calle" placeholder="Calle" value={direccion.calle} onChange={e => handleDireccionChange(e, index)} /></div>
                                    <div className="col"><Form.Control type="text" name="numero_exterior" placeholder="Número Exterior" value={direccion.numero_exterior} onChange={e => handleDireccionChange(e, index)} /></div>
                                    <div className="col"><Form.Control type="text" name="colonia" placeholder="Colonia" value={direccion.colonia} onChange={e => handleDireccionChange(e, index)} /></div>
                                    </div>
                                    <div className="row mb-1">
                                    <div className="col"><Form.Control type="text" name="codigo_postal" placeholder="Código Postal" value={direccion.codigo_postal} onChange={e => handleDireccionChange(e, index)} /></div>
                                    <div className="col"><Form.Control type="text" name="ciudad" placeholder="Ciudad" value={direccion.ciudad} onChange={e => handleDireccionChange(e, index)} /></div>
                                    <div className="col"><Form.Control type="text" name="estado" placeholder="Estado" value={direccion.estado} onChange={e => handleDireccionChange(e, index)} /></div>
                                    </div>
                                    <div className="row mb-1">
                                    <div className="col"><Form.Control type="text" name="pais" placeholder="Pais" value={direccion.pais} onChange={e => handleDireccionChange(e, index)} /></div>
                                    <div className="col"><Button variant="danger" type="button" onClick={() => handleRemoveDireccion(index)}>Eliminar</Button></div>
                                    </div>
                                </div>
                            ))}
                            <Button variant="info" type="button" className='mt-2' onClick={handleAddDireccion}>Agregar Dirección</Button><br/>

                            <Box display="flex" justifyContent="flex-end">
                                <Button variant="primary" type="submit" disabled={!canEdit}>{isEdit ? 'Guardar Cambios' : 'Crear Contacto'}</Button>
                            </Box>

                        </form>
                    </div>
                ) }
        </>
    );
};

export default ContactForm;