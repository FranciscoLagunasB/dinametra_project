import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const ContactForm = ({ showView, isEdit, contactData }) => {

    console.log(contactData)

    console.log(contactData)
    console.log(isEdit)
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

    console.log(contactData)

    useEffect(() => {
        console.log(contactData)
    }, [isEdit, contactData]);


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
            const formData = new FormData();
            formData.append('nombres', contacto.nombres);
            formData.append('apellido_paterno', contacto.apellido_paterno);
            formData.append('apellido_materno', contacto.apellido_materno);
            formData.append('fecha_nacimiento', contacto.fecha_nacimiento);
            formData.append('alias', contacto.alias);
            formData.append('foto', contacto.foto);

            // Append correos
            contacto.correos.forEach((correo, index) => {
                formData.append(`correos[${index}][correo]`, correo.correo);
            });

            // Append telefonos
            contacto.telefonos.forEach((telefono, index) => {
                formData.append(`telefonos[${index}][tipo]`, telefono.tipo);
                formData.append(`telefonos[${index}][numero]`, telefono.numero);
            });

            // Append direcciones
            contacto.direcciones.forEach((direccion, index) => {
                formData.append(`direcciones[${index}][calle]`, direccion.calle);
                formData.append(`direcciones[${index}][numero_exterior]`, direccion.numero_exterior);
                formData.append(`direcciones[${index}][colonia]`, direccion.colonia);
                formData.append(`direcciones[${index}][ciudad]`, direccion.ciudad);
                formData.append(`direcciones[${index}][estado]`, direccion.estado);
                formData.append(`direcciones[${index}][pais]`, direccion.pais);
                formData.append(`direcciones[${index}][codigo_postal]`, direccion.codigo_postal);
            });

            // Logging formData to check its content
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            let apiUrl = 'http://localhost:8000/api/contactos/';
            if (isEdit) {
                apiUrl = `http://localhost:8000/api/contactos/${contacto.contacto_PK}/`;
            }

            const response = isEdit
                ? await axios.put(apiUrl, formData)
                : await axios.post(apiUrl, formData);

            console.log('Contacto guardado:', response.data);
            // Lógica adicional después de enviar los datos
        } catch (error) {
            console.error('Error al guardar el contacto:', error);
            // Manejo de errores
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
                    <label>Nombres:</label>
                    <input type="text" name="nombres" value={contacto.nombres} onChange={handleInputChange} required />

                    <label>Apellido Paterno:</label>
                    <input type="text" name="apellido_paterno" value={contacto.apellido_paterno} onChange={handleInputChange} required />

                    <label>Apellido Materno:</label>
                    <input type="text" name="apellido_materno" value={contacto.apellido_materno} onChange={handleInputChange} required />

                    <label>Fecha de Nacimiento:</label>
                    <input type="date" name="fecha_nacimiento" value={contacto.fecha_nacimiento} onChange={handleInputChange} required />

                    <label>Alias:</label>
                    <input type="text" name="alias" value={contacto.alias} onChange={handleInputChange} required />

                    <label>Foto:</label>
                    <input type="file" name="foto" onChange={e => setContacto({ ...contacto, foto: e.target.files[0] })} accept="image/png" />

                    <h3>Correos Electrónicos:</h3>
                    {contacto.correos.map((correo, index) => (
                        <div key={index}>
                            <input type="email" name="correo" value={correo.correo} onChange={e => handleCorreoChange(e, index)} required />
                            <button type="button" onClick={() => handleRemoveCorreo(index)}>Eliminar</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddCorreo}>Agregar Correo</button>

                    <h3>Teléfonos:</h3>
                    {contacto.telefonos.map((telefono, index) => (
                        <div key={index}>
                            <input type="text" name="tipo" placeholder="Tipo" value={telefono.tipo} onChange={e => handleTelefonoChange(e, index)} required />
                            <input type="text" name="numero" placeholder="Número" value={telefono.numero} onChange={e => handleTelefonoChange(e, index)} required />
                            <button type="button" onClick={() => handleRemoveTelefono(index)}>Eliminar</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddTelefono}>Agregar Teléfono</button>

                    <h3>Direcciones:</h3>
                    {contacto.direcciones.map((direccion, index) => (
                        <div key={index}>
                            <input type="text" name="calle" placeholder="Calle" value={direccion.calle} onChange={e => handleDireccionChange(e, index)} required />
                            <input type="text" name="numero_exterior" placeholder="Número Exterior" value={direccion.numero_exterior} onChange={e => handleDireccionChange(e, index)} required />
                            <input type="text" name="colonia" placeholder="Colonia" value={direccion.colonia} onChange={e => handleDireccionChange(e, index)} required />
                            <input type="text" name="ciudad" placeholder="Ciudad" value={direccion.ciudad} onChange={e => handleDireccionChange(e, index)} required />
                            <input type="text" name="estado" placeholder="Estado" value={direccion.estado} onChange={e => handleDireccionChange(e, index)} required />
                            <input type="text" name="pais" placeholder="País" value={direccion.pais} onChange={e => handleDireccionChange(e, index)} required />
                            <input type="text" name="codigo_postal" placeholder="Código Postal" value={direccion.codigo_postal} onChange={e => handleDireccionChange(e, index)} required />
                            <button type="button" onClick={() => handleRemoveDireccion(index)}>Eliminar</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddDireccion}>Agregar Dirección</button>

                    <button type="submit" disabled={!canEdit}>{isEdit ? 'Guardar Cambios' : 'Crear Contacto'}</button>
                </form>
            </div>
        ) }
        </>
    );
};

export default ContactForm;